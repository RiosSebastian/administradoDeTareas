import { fetchWithAuth } from "./api";
import Cookies from 'js-cookie';


interface UserCredentials {
  email: string;
  password?: string;
  name?: string;
}

const API_URL = "http://localhost:8080/auth";

export const authService = {
  // Registro de usuario
  register: async (userData: UserCredentials) => {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error("Error en el registro");
    return response.json();
  },

  // Login de usuario
  login: async (credentials: UserCredentials) => {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) throw new Error("Login failed");

    const data = await response.json();
    
    
    // Guardar el token
    localStorage.setItem("token", data.token);
    
    //  Acceder a data.user.id 
    if (data.user && data.user.id) {
      localStorage.setItem("userId", data.user.id.toString());
     
      localStorage.setItem("user", JSON.stringify(data.user));
    }
    
    // 3. Guardar en cookies 
    Cookies.set('token', data.token); 
    
    return data;
  },

  logout: () => {
    // Limpieza total
    localStorage.removeItem("token");
    localStorage.removeItem("userId"); // Limpiar el ID
    localStorage.removeItem("user");   // Limpiar el objeto user
    Cookies.remove('token');
    window.location.href = "/login";
  },

  getAllUsers: async () => {
    return fetchWithAuth("/users"); 
  }
};