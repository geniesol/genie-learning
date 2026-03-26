export const getApiUrl = () => {
  if (typeof window !== "undefined") {
    // Client-side: Use the public proxy URL
    return process.env.NEXT_PUBLIC_API_URL || "http://localhost:4001";
  }
  // Server-side (SSR): Use the internal gateway to bypass DNS resolution issues in Podman
  return "http://10.89.0.1:4001";
};

export const getAiServiceUrl = () => {
  if (typeof window !== "undefined") {
    // Client-side: Use the public proxy URL (mapped via /ai prefix in Traefik)
    return (process.env.NEXT_PUBLIC_API_URL?.replace('/api', '/ai')) || "http://localhost:4002";
  }
  // Server-side (SSR): Use the internal gateway
  return "http://10.89.0.1:4002";
};

export const API_BASE_URL = getApiUrl();
export const AI_SERVICE_URL = getAiServiceUrl();
