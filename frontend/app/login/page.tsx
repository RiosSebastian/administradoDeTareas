'use client';
import { useState } from 'react';
import { authService } from '@/app/services/authService';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authService.login({ email, password });
      router.push('/dashboard'); 
    } catch (error) {
      alert("Error al iniciar sesión. Revisa tus datos.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Iniciar Sesión</h2>
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full p-2 mb-4 border rounded text-gray-700"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input 
          type="password" 
          placeholder="Contraseña" 
          className="w-full p-2 mb-6 border rounded text-gray-700"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-bold">
          Entrar
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">¿No tienes cuenta? <a href="/register" className="text-blue-600 hover:underline">Regístrate</a></p>
      </form>
    </div>
  );
}