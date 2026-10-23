import './Paginacao.css';

function Paginacao({ paginaAtual, totalPaginas, aoMudarPagina }) {
  const paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);

  const naPrimeira = paginaAtual === 1;
  const naUltima = paginaAtual === totalPaginas;

  return (
    <nav className="paginacao" aria-label="Paginação dos itens da loja">
      <button
        type="button"
        className="paginacao__botao"
        onClick={() => aoMudarPagina(paginaAtual - 1)}
        disabled={naPrimeira}
        aria-label="Página anterior"
      >
        ‹
      </button>

      <ul className="paginacao__lista">
        {paginas.map((pagina) => (
          <li key={pagina}>
            <button
              type="button"
              className={`paginacao__botao ${
                pagina === paginaAtual ? 'paginacao__botao--ativo' : ''
              }`}
              onClick={() => aoMudarPagina(pagina)}
              aria-current={pagina === paginaAtual ? 'page' : undefined}
              aria-label={`Página ${pagina}`}
            >
              {pagina}
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="paginacao__botao"
        onClick={() => aoMudarPagina(paginaAtual + 1)}
        disabled={naUltima}
        aria-label="Próxima página"
      >
        ›
      </button>
    </nav>
  );
}

export default Paginacao;
