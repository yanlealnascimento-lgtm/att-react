import { useEffect, useRef, useState } from 'react';
import './MenuSuspenso.css';

function MenuSuspenso({ rotulo, opcoes, valorSelecionado, aoSelecionar }) {
  const [aberto, setAberto] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!aberto) return undefined;

    function aoClicarFora(evento) {
      if (containerRef.current && !containerRef.current.contains(evento.target)) {
        setAberto(false);
      }
    }

    function aoPressionarTecla(evento) {
      if (evento.key === 'Escape') setAberto(false);
    }

    document.addEventListener('mousedown', aoClicarFora);
    document.addEventListener('keydown', aoPressionarTecla);

    return () => {
      document.removeEventListener('mousedown', aoClicarFora);
      document.removeEventListener('keydown', aoPressionarTecla);
    };
  }, [aberto]);

  const selecionada = opcoes.find((opcao) => opcao.valor === valorSelecionado);

  function selecionar(opcao) {
    aoSelecionar(opcao);
    setAberto(false);
  }

  return (
    <div className="menu" ref={containerRef}>
      <button
        type="button"
        className="menu__gatilho"
        onClick={() => setAberto((atual) => !atual)}
        aria-haspopup="menu"
        aria-expanded={aberto}
      >
        <span className="menu__rotulo">{rotulo}:</span>
        {selecionada?.imagem && <img className="menu__imagem" src={selecionada.imagem} alt="" />}
        <span>{selecionada ? selecionada.label : 'Selecionar'}</span>
        <span className="menu__seta" aria-hidden="true">
          ▾
        </span>
      </button>

      {aberto && (
        <ul className="menu__lista" role="menu">
          {opcoes.map((opcao) => (
            <li key={opcao.valor} role="none">
              <button
                type="button"
                role="menuitem"
                className={`menu__opcao ${
                  opcao.valor === valorSelecionado ? 'menu__opcao--ativa' : ''
                }`}
                onClick={() => selecionar(opcao)}
              >
                {opcao.imagem && <img className="menu__imagem" src={opcao.imagem} alt="" />}
                <span>{opcao.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MenuSuspenso;
