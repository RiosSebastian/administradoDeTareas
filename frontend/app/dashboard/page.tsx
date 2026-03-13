'use client';
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { projectService } from "@/app/services/projectService";
import { taskService } from "@/app/services/taskService";
import { CommentModal } from '@/app/components/CommentModal';
import AddTaskModal from '@/app/components/AddTaskModal';

interface Project { id: number; name: string; }
interface Task { id: number; title: string; description: string; status: string; }

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTaskId, setActiveTaskId] = useState<number | null>(null);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [activeTaskTitle, setActiveTaskTitle] = useState("");
  
  //Estado para el Sidebar en móviles
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = '/login';
  };

  const handleSelectProject = useCallback(async (project: Project) => {
    setSelectedProject(project);
    setIsSidebarOpen(false); // Cerrar sidebar al seleccionar en móvil
    try {
      const tasksData = await taskService.getTasksByProject(project.id);
      setTasks(tasksData);
    } catch (err) {
      console.error("Error al obtener tareas:", err);
      setTasks([]);
    }
  }, []);

  const loadInitialData = useCallback(async () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      try {
        const data = await projectService.getProjectsByUser(Number(userId));
        setProjects(data);
        if (data.length > 0) handleSelectProject(data[0]);
      } catch (err) {
        console.error("Error al cargar proyectos:", err);
      }
    }
  }, [handleSelectProject]);

  const handleStatusChange = async (taskId: number, status: string) => {
    try {
      await taskService.updateTaskStatus(taskId, status);
      setTasks(prevTasks =>
        prevTasks.map(t => t.id === taskId ? { ...t, status } : t)
      );
    } catch (err) {
      alert("No se pudo cambiar el estado");
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    if (window.confirm("¿Estás seguro de eliminar esta tarea?")) {
      try {
        await taskService.deleteTask(taskId);
        setTasks(prev => prev.filter(t => t.id !== taskId));
      } catch (err) {
        alert("Error al eliminar la tarea");
      }
    }
  };

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden relative">
      
      {/* OVERLAY PARA MÓVIL (Cierra el sidebar al tocar fuera) */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r shadow-xl transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 md:shadow-sm
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 border-b flex justify-between items-center">
          <h1 className="text-xl font-bold text-indigo-600">Gestor</h1>
          <div className="flex items-center gap-2">
            <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition-colors p-1" title="Cerrar Sesión">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
            {/* Botón cerrar para móvil */}
            <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Mis Proyectos</h2>
            <Link href="/new-project" className="text-indigo-600 hover:bg-indigo-50 p-1 rounded-full transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          {projects.map((proj) => (
            <button
              key={proj.id}
              onClick={() => handleSelectProject(proj)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition ${selectedProject?.id === proj.id ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              {proj.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white border-b p-4 flex items-center gap-4">
          {/* BOTÓN HAMBURGUESA */}
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-black truncate">
              {selectedProject ? selectedProject.name : 'Selecciona un proyecto'}
            </h2>
            {selectedProject && (
              <button 
                onClick={() => setIsTaskModalOpen(true)} 
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition text-sm font-medium w-full sm:w-auto"
              >
                + Nueva Tarea
              </button>
            )}
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-4 md:p-8">
          {/* GRID RESPONSIVO */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {tasks.map((task) => (
              <div key={task.id} className="bg-white p-5 md:p-6 rounded-xl border shadow-sm hover:shadow-md transition relative group">
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="absolute top-4 right-4 text-gray-300 hover:text-red-500 md:opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>

                <div className="flex justify-between items-start">
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                    className={`text-xs font-semibold px-2 py-1 rounded-full border ${
                      task.status === 'COMPLETADA' ? 'bg-green-100 text-green-700 border-green-200' :
                      task.status === 'EN_PROCESO' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                      'bg-blue-100 text-blue-700 border-blue-200'
                    }`}
                  >
                    <option value="PENDIENTE">PENDIENTE</option>
                    <option value="EN_PROCESO">EN PROCESO</option>
                    <option value="COMPLETADA">COMPLETADA</option>
                  </select>
                </div>

                <h3 className="mt-4 text-lg font-bold text-gray-800 break-words">{task.title}</h3>
                <p className="text-gray-500 text-sm mt-2 line-clamp-3">{task.description}</p>

                <div className="mt-6">
                  <button
                    onClick={() => {
                      setActiveTaskTitle(task.title);
                      setActiveTaskId(task.id);
                      setIsCommentModalOpen(true);
                    }}
                    className="text-indigo-600 text-sm font-medium hover:underline"
                  >
                    Ver Comentarios
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {tasks.length === 0 && selectedProject && (
            <div className="text-center py-20 text-gray-400">
              No hay tareas en este proyecto. ¡Crea la primera!
            </div>
          )}
        </section>
      </main>

      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        taskTitle={activeTaskTitle}
        taskId={activeTaskId || 0}
      />

      {selectedProject && (
        <AddTaskModal
          isOpen={isTaskModalOpen}
          onClose={() => setIsTaskModalOpen(false)}
          projectId={selectedProject.id}
          onTaskCreated={() => handleSelectProject(selectedProject)}
        />
      )}
    </div>
  );
}