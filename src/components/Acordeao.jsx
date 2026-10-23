import { useState } from 'react';
import './Acordeao.css';

function Acordeao({ itens }) {
  const [abertoIndice, setAbertoIndice] = useState(null);

  function alternar(indice) {
    setAbertoIndice((atual) => (atual === indice ? null : indice));
  }

  return (
    <div className="acordeao">
      {itens.map((item, indice) => {
        const aberto = abertoIndice === indice;
        return (
          <div className="acordeao__item" key={item.titulo}>
            <h3 className="acordeao__cabecalho">
              <button
                type="button"
                className="acordeao__botao"
                onClick={() => alternar(indice)}
                aria-expanded={aberto}
                aria-controls={`painel-acordeao-${indice}`}
                id={`botao-acordeao-${indice}`}
              >
                <span>{item.titulo}</span>
                <span className="acordeao__seta" aria-hidden="true">
                  {aberto ? '−' : '+'}
                </span>
              </button>
            </h3>
            <div
              className={`acordeao__painel ${aberto ? 'acordeao__painel--aberto' : ''}`}
              id={`painel-acordeao-${indice}`}
              role="region"
              aria-labelledby={`botao-acordeao-${indice}`}
              aria-hidden={!aberto}
            >
              <p>{item.conteudo}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Acordeao;
