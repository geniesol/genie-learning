export const getApiUrl = () => {
  if (typeof window !== "undefined") {
    return "http://localhost:3001";
  }
  // Internal Podman network name
  return "http://api-core:3001";
};

export const getAiServiceUrl = () => {
  if (typeof window !== "undefined") {
    return "http://localhost:3002";
  }
  // Internal Podman network name (mapping port 3000 in container to 3002 on host)
  return "http://ai-service:3000";
};

export const API_BASE_URL = getApiUrl();
export const AI_SERVICE_URL = getAiServiceUrl();
