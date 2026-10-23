import { useEffect } from 'react';
import './Toast.css';

const ICONES = {
  sucesso: '✓',
  erro: '!',
  info: 'i',
};

function Toast({ toast, aoFechar }) {
  useEffect(() => {
    const tempo = setTimeout(() => aoFechar(toast.id), 3000);
    return () => clearTimeout(tempo);
  }, [toast.id, aoFechar]);

  return (
    <div className={`toast toast--${toast.tipo}`} role="status">
      <span className="toast__icone" aria-hidden="true">
        {ICONES[toast.tipo] ?? ICONES.info}
      </span>
      <p className="toast__mensagem">{toast.mensagem}</p>
      <button
        type="button"
        className="toast__fechar"
        onClick={() => aoFechar(toast.id)}
        aria-label="Fechar notificação"
      >
        ×
      </button>
    </div>
  );
}

function ContainerToasts({ toasts, aoFechar }) {
  return (
    <div className="toast__container" aria-live="polite" aria-atomic="false">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} aoFechar={aoFechar} />
      ))}
    </div>
  );
}

export default ContainerToasts;
