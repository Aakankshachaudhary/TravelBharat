const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api").replace(/\/$/, "");

async function apiFetch(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
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
    Object.entries(params).forEach(([key, value]) => value && search.set(key, value));
    return apiFetch(`/destinations${search.toString() ? `?${search}` : ""}`);
  },
  getDestination: (slug) => apiFetch(`/destinations/${encodeURIComponent(slug)}`),
  health: () => apiFetch("/health"),
};
