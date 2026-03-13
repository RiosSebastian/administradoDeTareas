import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirigimos automáticamente a login al entrar a la web
  redirect('/login');
}