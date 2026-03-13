'use client';
import { useState, useEffect } from 'react';
import { taskService } from '@/app/services/taskService';

interface Comment {
  id: number;
  content: string;
  userName: string; 
  createdAt: string;
}

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskTitle: string;
  taskId: number; 
}

export function CommentModal({ isOpen, onClose, taskTitle, taskId }: CommentModalProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  // --- Función para cargar comentarios ---
  const loadComments = async () => {
    if (!taskId) return;
    try {
      const data = await taskService.getCommentsByTask(taskId);
      setComments(data);
    } catch (err) {
      console.error("Error al cargar comentarios", err);
    }
  };

  // Cargar cada vez que el modal se abre o cambia la tarea
  useEffect(() => {
    if (isOpen) loadComments();
  }, [isOpen, taskId]);

  // --- Función para enviar comentario ---
  const handleSend = async () => {
    if (!newComment.trim()) return;
    
    const userStr = localStorage.getItem('user');
    if (!userStr) return;
    const user = JSON.parse(userStr);

    try {
      setLoading(true);
      await taskService.addComment({
        content: newComment,
        taskId: taskId,
        userId: user.id
      });
      setNewComment('');
      loadComments(); // Recargar la lista para ver el nuevo comentario
    } catch (err) {
      alert("No se pudo enviar el comentario");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-black">✕</button>
        
        <h2 className="text-xl font-bold mb-4 text-indigo-700 border-b pb-2">Comentarios: {taskTitle}</h2>
        
        {/* LISTADO DE COMENTARIOS */}
        <div className="space-y-4 max-h-80 overflow-y-auto mb-4 p-2 bg-gray-50 rounded">
          {comments.length === 0 ? (
            <p className="text-center text-gray-500 text-sm py-4">No hay comentarios aún. ¡Sé el primero!</p>
          ) : (
            comments.map((c) => (
              <div key={c.id} className="bg-white p-3 rounded shadow-sm border-l-4 border-indigo-500">
                <p className="text-xs font-bold text-indigo-600">{c.userName || 'Usuario'}</p>
                <p className="text-sm text-gray-800">{c.content}</p>
              </div>
            ))
          )}
        </div>

        {/* INPUT PARA NUEVO COMENTARIO */}
        <div className="flex gap-2">
          <input 
            type="text" 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Escribe un comentario..." 
            className="flex-1 border p-2 rounded text-sm text-black focus:ring-2 focus:ring-indigo-500 outline-none"
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            disabled={loading}
            className="bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? '...' : 'Enviar'}
          </button>
        </div>
      </div>
    </div>
  );
}