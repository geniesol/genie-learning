export const getApiUrl = () => {
  if (typeof window !== "undefined") {
    // Client-side: Use the public proxy URL
    return "http://72.60.204.70/api";
  }
  // Server-side (SSR): Use the DIRECT Container IP to bypass Podman DNS issues
  // Verified IP for genie-learning_api-core_1: 10.89.0.76
  return "http://10.89.0.76:3001";
};

export const getAiServiceUrl = () => {
  if (typeof window !== "undefined") {
    // Client-side: Use the public proxy URL
    return "http://72.60.204.70/ai";
  }
  // Server-side (SSR): Use the DIRECT Container IP
  // Verified IP for genie-learning_ai-service_1: 10.89.0.77
  return "http://10.89.0.77:3000";
};

export const API_BASE_URL = getApiUrl();
export const AI_SERVICE_URL = getAiServiceUrl();
