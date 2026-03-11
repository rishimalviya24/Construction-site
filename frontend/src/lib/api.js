const trimTrailingSlash = (value) => value.replace(/\/+$/, "");

const envBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

export const API_BASE_URL = envBaseUrl
  ? trimTrailingSlash(envBaseUrl)
  : import.meta.env.DEV
    ? "http://localhost:5000"
    : window.location.origin;

export const PROJECTS_API_URL = `${API_BASE_URL}/api/projects`;
export const AUTH_API_URL = `${API_BASE_URL}/api/auth`;

export const withApiBase = (path = "") => {
  if (!path) return API_BASE_URL;
  return path.startsWith("http://") || path.startsWith("https://")
    ? path
    : `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};
