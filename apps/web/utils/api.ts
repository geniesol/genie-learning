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

export const apiRequest = async (path: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${path}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "An error occurred" }));
    throw new Error(error.message || "Request failed");
  }

  return response.json();
};

export async function getCourses() {
  try {
    return await apiRequest("/courses");
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return null;
  }
}

export async function getCourse(slug: string) {
  try {
    return await apiRequest(`/courses/${slug}`);
  } catch (error) {
    console.error("Failed to fetch course:", error);
    return null;
  }
}
