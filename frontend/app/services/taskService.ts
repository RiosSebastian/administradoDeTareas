import { fetchWithAuth } from "./api";

export const taskService = {
  
  createTask: async (taskData: { 
    title: string; 
    description: string; 
    status: string; 
    projectId: number; 
    assignedUserId: number 
  }) => {
    return fetchWithAuth("/tasks", {
      method: "POST",
      body: JSON.stringify(taskData),
    });
  },

  
  getTasksByProject: async (projectId: number) => {
    return fetchWithAuth(`/tasks/project/${projectId}`);
  },

// Obtener comentarios de una tarea
  getCommentsByTask: async (taskId: number) => {
    return fetchWithAuth(`/comments/task/${taskId}`);
  },

  // Crear un nuevo comentario
  addComment: async (commentData: { content: string; taskId: number; userId: number }) => {
    return fetchWithAuth("/comments", {
      method: "POST",
      body: JSON.stringify(commentData),
    });
  },


  // Función para actualizar el estado o cualquier dato de la tarea
  updateTaskStatus: async (taskId: number, newStatus: string) => {
    return fetchWithAuth(`/tasks/${taskId}/status`, {
      method: "PUT", 
      body: JSON.stringify({ status: newStatus }),
    });
  },

  deleteTask: async (taskId: number) => {
    return fetchWithAuth(`/tasks/${taskId}`, { method: "DELETE" });
   },
};