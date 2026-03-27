export const getApiUrl = () => {
  if (typeof window !== "undefined") {
    // Client-side: Use relative path so it works with any domain/IP
    return window.location.origin + "/api";
  }
  // Server-side (SSR): Use runtime env var, fallback to Podman service name
  return process.env.INTERNAL_API_URL || "http://api-core:3001";
};

export const getAiServiceUrl = () => {
  if (typeof window !== "undefined") {
    // Client-side: Use relative path so it works with any domain/IP
    return window.location.origin + "/ai";
  }
  // Server-side (SSR): Use runtime env var, fallback to Podman service name
  return process.env.INTERNAL_AI_URL || "http://ai-service:3000";
};

export const API_BASE_URL = getApiUrl();
export const AI_SERVICE_URL = getAiServiceUrl();
