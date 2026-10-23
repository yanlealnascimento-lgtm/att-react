import { useState } from 'react';
import './Abas.css';

function Abas({ abas }) {
  const [abaAtiva, setAbaAtiva] = useState(abas[0]?.id);

  const ativa = abas.find((aba) => aba.id === abaAtiva) ?? abas[0];

  return (
    <div className="abas">
      <div className="abas__lista" role="tablist" aria-label="Seções da vaquinha">
        {abas.map((aba) => (
          <button
            key={aba.id}
            type="button"
            role="tab"
            id={`aba-${aba.id}`}
            className={`abas__botao ${aba.id === ativa.id ? 'abas__botao--ativo' : ''}`}
            aria-selected={aba.id === ativa.id}
            aria-controls={`painel-${aba.id}`}
            onClick={() => setAbaAtiva(aba.id)}
          >
            {aba.titulo}
          </button>
        ))}
      </div>

      <div
        className="abas__painel"
        role="tabpanel"
        id={`painel-${ativa.id}`}
        aria-labelledby={`aba-${ativa.id}`}
        tabIndex={0}
      >
        {ativa.conteudo}
      </div>
    </div>
  );
}

export default Abas;
