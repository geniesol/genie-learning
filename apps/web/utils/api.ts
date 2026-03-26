export const getApiUrl = () => {
  if (typeof window !== "undefined") {
    // Client-side: Use the public proxy URL
    return process.env.NEXT_PUBLIC_API_URL || "http://72.60.204.70/api";
  }
  // Server-side (SSR): Use the host gateway IP and the mapped port (4001)
  // This bypasses Podman internal DNS issues (EAI_AGAIN)
  return "http://10.89.0.1:4001";
};

export const getAiServiceUrl = () => {
  if (typeof window !== "undefined") {
    // Client-side: Use the public proxy URL
    return "http://72.60.204.70/ai";
  }
  // Server-side (SSR): Use the host gateway IP and mapped port (4002)
  return "http://10.89.0.1:4002";
};

export const API_BASE_URL = getApiUrl();
export const AI_SERVICE_URL = getAiServiceUrl();
