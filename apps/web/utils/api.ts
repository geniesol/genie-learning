export const getApiUrl = () => {
  if (typeof window !== "undefined") {
    // Client-side: Use the public proxy URL
    return process.env.NEXT_PUBLIC_API_URL || "http://72.60.204.70/api";
  }
  // Server-side (SSR): Use the internal Podman service DNS
  return "http://api-core:3001";
};

export const getAiServiceUrl = () => {
  if (typeof window !== "undefined") {
    // Client-side: Use the public proxy URL
    return "http://72.60.204.70/ai";
  }
  // Server-side (SSR): Use the internal service DNS
  return "http://ai-service:3000";
};

export const API_BASE_URL = getApiUrl();
export const AI_SERVICE_URL = getAiServiceUrl();
