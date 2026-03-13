'use client';
import { useState, useEffect } from 'react';
import { authService } from '@/app/services/authService';
import { taskService } from '@/app/services/taskService';

interface User {
  id: number;
  name: string;
  email?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  projectId: number;
  onTaskCreated: () => void;
}

export default function AddTaskModal({ isOpen, onClose, projectId, onTaskCreated }: Props) {
  const [users, setUsers] = useState<User[]>([]); 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState(''); 
  const [assignedUserId, setAssignedUserId] = useState('');

  useEffect(() => {
    if (isOpen) {
      authService.getAllUsers()
        .then((data: User[]) => setUsers(data)) 
        .catch(err => console.error("Error al cargar usuarios:", err));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignedUserId) return alert("Por favor, selecciona un usuario");

    try {
      await taskService.createTask({
        title,
        description: description || "Sin descripción",
        status: "PENDIENTE",
        projectId,
        assignedUserId: Number(assignedUserId)
      });
      onTaskCreated();
      onClose();
      // Limpiar formulario
      setTitle('');
      setDescription('');
      setAssignedUserId('');
    } catch (error) {
      console.error("Error al crear la tarea:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-black">Añadir Nueva Tarea</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            placeholder="Título de la tarea" 
            required
            className="w-full p-2 border rounded text-black focus:ring-2 focus:ring-blue-500 outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea 
            placeholder="Descripción (opcional)"
            className="w-full p-2 border rounded text-black focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          
          <select 
            required 
            className="w-full p-2 border rounded text-black focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setAssignedUserId(e.target.value)}
            value={assignedUserId}
          >
            <option value="">Asignar a...</option>
            {users.map((u: User) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>

          <div className="flex justify-end space-x-2 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:text-gray-800 transition">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition shadow-md">
              Guardar Tarea
            </button>
          </div>
        </form>
      </div>
    </div>
  ); 
}