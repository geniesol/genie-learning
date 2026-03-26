export const getApiUrl = () => {
  if (typeof window !== "undefined") {
    // Client-side: Use the public proxy URL
    return "http://72.60.204.70/api";
  }
  // Server-side (SSR): Use the STATIC Container IP to bypass Podman DNS issues
  // Assigned STATIC IP for genie-learning_api-core_1: 10.89.0.100
  return "http://10.89.0.100:3001";
};

export const getAiServiceUrl = () => {
  if (typeof window !== "undefined") {
    // Client-side: Use the public proxy URL
    return "http://72.60.204.70/ai";
  }
  // Server-side (SSR): Use the STATIC Container IP
  // Assigned STATIC IP for genie-learning_ai-service_1: 10.89.0.101
  return "http://10.89.0.101:3000";
};

export const API_BASE_URL = getApiUrl();
export const AI_SERVICE_URL = getAiServiceUrl();
