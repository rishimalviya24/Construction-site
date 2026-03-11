import { useState } from 'react';
import MainDesign from './components/MainDesign';
import AdminPanel from './admin/AdminPanel';

export default function App() {
  const [isAdmin] = useState(() => window.location.pathname.startsWith('/admin'));
  if (isAdmin) return <AdminPanel />;
  return <MainDesign />;
}
