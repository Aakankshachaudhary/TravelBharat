function authHeaders() {
  const token = localStorage.getItem("travelbharat_admin_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api`;

const GET_CACHE_TTL = 30_000;
const getCache = new Map();

function getCached(path) {
  const entry = getCache.get(path);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > GET_CACHE_TTL) {
    getCache.delete(path);
    return null;
  }
  return entry.data;
}

function cacheGet(path, data) {
  getCache.set(path, { data, timestamp: Date.now() });
  return data;
}

function invalidateCatalogueCache() {
  for (const key of getCache.keys()) {
    if (key.startsWith("/destinations") || key.startsWith("/states")) {
      getCache.delete(key);
    }
  }
}

async function apiFetch(path, options = {}) {
  const method = (options.method || "GET").toUpperCase();
  const isGet = method === "GET";

  if (isGet && !options.signal) {
    const cached = getCached(path);
    if (cached) return cached;
  }

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });
  } catch (error) {
    if (error.name === "AbortError") throw error;
    const networkError = new Error(
      "Unable to reach the TravelBharat API. Please check that the backend is running and try again.",
    );
    networkError.code = "NETWORK_ERROR";
    networkError.cause = error;
    throw networkError;
  }

  const payload = await response.json().catch(() => null);

  if (!response.ok || !payload?.success) {
    const error = new Error(payload?.error?.message || "Request failed");
    error.status = response.status;
    error.code = payload?.error?.code;
    throw error;
  }

  return isGet && !options.signal ? cacheGet(path, payload.data) : payload.data;
}

function withCacheInvalidation(request) {
  return request.finally(() => invalidateCatalogueCache());
}

export const api = {
  clearCache: () => getCache.clear(),

  getStates: (options = {}) => apiFetch("/states", options),

  getState: (slug, options = {}) =>
    apiFetch(`/states/${encodeURIComponent(slug)}`, options),

  getDestinations: (params = {}, options = {}) => {
    const search = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) search.set(key, value);
    });
    return apiFetch(
      `/destinations${search.toString() ? `?${search}` : ""}`,
      options,
    );
  },

  getDestination: (slug, options = {}) =>
    apiFetch(`/destinations/${encodeURIComponent(slug)}`, options),

  health: (options = {}) => apiFetch("/health", options),

  login: (credentials) =>
    apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),

  me: () => apiFetch("/auth/me", { headers: authHeaders() }),

  createDestination: (payload) =>
    withCacheInvalidation(
      apiFetch("/destinations", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(payload),
      }),
    ),

  updateDestination: (slug, payload) =>
    withCacheInvalidation(
      apiFetch(`/destinations/${encodeURIComponent(slug)}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(payload),
      }),
    ),

  deleteDestination: (slug) =>
    withCacheInvalidation(
      apiFetch(`/destinations/${encodeURIComponent(slug)}`, {
        method: "DELETE",
        headers: authHeaders(),
      }),
    ),
};
