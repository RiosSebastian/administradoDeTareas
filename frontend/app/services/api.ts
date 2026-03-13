// src/services/api.ts
const BASE_URL = "http://localhost:8080/api"; 

export const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
    ...options.headers,
  };

  
  const response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: en la petición`);
  }

  return response.json();
};