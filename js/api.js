const DNYF_API_BASE = "https://api.dnyftech.workers.dev";

const api = {
  base: DNYF_API_BASE,

  async request(path, options = {}) {
    const response = await fetch(`${DNYF_API_BASE}${path}`, {
      ...options,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    const contentType = response.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      const message =
        typeof data === "object" && data?.error
          ? data.error
          : `API request failed: ${response.status}`;

      throw new Error(message);
    }

    return data;
  },

  health() {
    return this.request("/api/health");
  },

  status() {
    return this.request("/api/status");
  },

  users(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/api/users${query ? `?${query}` : ""}`);
  },

  products(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/api/products${query ? `?${query}` : ""}`);
  },

  posts(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/api/posts${query ? `?${query}` : ""}`);
  },

  search(query) {
    return this.request(`/api/search?q=${encodeURIComponent(query)}`);
  },

  echo(data) {
    return this.request("/api/echo", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};

window.DNYF_API = api;
