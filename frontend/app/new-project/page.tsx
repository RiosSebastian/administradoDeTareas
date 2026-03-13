'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { projectService } from '@/app/services/projectService';

export default function NewProjectPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Obtener el usuario real logueado desde localStorage
      const userStr = localStorage.getItem('user');
      if (!userStr) return alert("Sesión expirada");
      const user = JSON.parse(userStr);

      await projectService.createProject({ 
        name, 
        description, 
        creatorId: Number(localStorage.getItem("userId"))
      });

      
      router.push('/dashboard'); 
    } catch (error) {
      console.error("Error:", error);
      alert("Error al crear el proyecto");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg border p-8">
        <button onClick={() => router.back()} className="text-blue-600 hover:underline mb-4 inline-block">← Cancelar y Volver</button>
        <h1 className="text-2xl font-bold mb-6 text-black">Nuevo Proyecto</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black">Nombre del Proyecto</label>
            <input 
              type="text" required value={name} onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-md text-black" placeholder="Ej: Backend Java" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">Descripción</label>
            <textarea 
              value={description} onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded-md text-black" rows={3}
            ></textarea>
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-md font-bold hover:bg-indigo-700 transition">
            Crear Proyecto
          </button>
        </form>
      </div>
    </div>
  );
}