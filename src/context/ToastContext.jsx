import { createContext, useCallback, useContext, useState } from 'react';
import ContainerToasts from '../components/Toast.jsx';

const ToastContext = createContext(null);

export function useToast() {
  const contexto = useContext(ToastContext);
  if (!contexto) {
    throw new Error('useToast precisa estar dentro de <ToastProvider>');
  }
  return contexto;
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const mostrarToast = useCallback((mensagem, tipo = 'info') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((anteriores) => [...anteriores, { id, mensagem, tipo }]);
  }, []);

  const fecharToast = useCallback((id) => {
    setToasts((anteriores) => anteriores.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ mostrarToast }}>
      {children}
      <ContainerToasts toasts={toasts} aoFechar={fecharToast} />
    </ToastContext.Provider>
  );
}
