function authHeaders() {
  const token = localStorage.getItem("travelbharat_admin_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

async function apiFetch(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok || !payload?.success) {
    const error = new Error(payload?.error?.message || "Request failed");
    error.status = response.status;
    error.code = payload?.error?.code;
    throw error;
  }

  return payload.data;
}

export const api = {
  getStates: () => apiFetch("/states"),
  getState: (slug) => apiFetch(`/states/${encodeURIComponent(slug)}`),
  getDestinations: (params = {}) => {
    const search = new URLSearchParams();
    Object.entries(params).forEach(
      ([key, value]) => value && search.set(key, value),
    );
    return apiFetch(`/destinations${search.toString() ? `?${search}` : ""}`);
  },
  getDestination: (slug) =>
    apiFetch(`/destinations/${encodeURIComponent(slug)}`),
  health: () => apiFetch("/health"),
  login: (credentials) =>
    apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),
  me: () => apiFetch("/auth/me", { headers: authHeaders() }),
  createDestination: (payload) =>
    apiFetch("/destinations", {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(payload),
    }),
  updateDestination: (slug, payload) =>
    apiFetch(`/destinations/${encodeURIComponent(slug)}`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(payload),
    }),
  deleteDestination: (slug) =>
    apiFetch(`/destinations/${encodeURIComponent(slug)}`, {
      method: "DELETE",
      headers: authHeaders(),
    }),
};