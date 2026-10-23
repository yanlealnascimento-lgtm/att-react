import { useState } from 'react';
import Paginacao from './Paginacao.jsx';
import { upgrades } from '../data/upgrades.js';
import { useCampanha } from '../context/CampanhaContext.jsx';

const ITENS_POR_PAGINA = 5;
const formatar = (numero) => `R$ ${Math.floor(numero).toLocaleString('pt-BR')}`;

function PainelComite() {
  const { votos, idsComprados, comprar } = useCampanha();
  const [pagina, setPagina] = useState(1);

  const totalPaginas = Math.ceil(upgrades.length / ITENS_POR_PAGINA);
  const inicio = (pagina - 1) * ITENS_POR_PAGINA;
  const visiveis = upgrades.slice(inicio, inicio + ITENS_POR_PAGINA);

  return (
    <section>
      <p className="comite__saldo">
        Saldo disponível: <strong>{formatar(votos)}</strong>
      </p>

      <ul className="comite__lista">
        {visiveis.map((item) => {
          const comprado = idsComprados.includes(item.id);
          const acessivel = votos >= item.custo;

          return (
            <li key={item.id} className={`comite__item ${comprado ? 'comite__item--ok' : ''}`}>
              <div className="comite__info">
                <h3 className="comite__nome">{item.nome}</h3>
                <p className="comite__descricao">{item.descricao}</p>
                <p className="comite__efeito">
                  {item.tipo === 'clique'
                    ? `+${formatar(item.valor)} por clique`
                    : `+${formatar(item.valor)} por segundo`}
                </p>
              </div>

              <button
                type="button"
                className="comite__comprar"
                onClick={() => comprar(item)}
                disabled={comprado}
                aria-label={
                  comprado
                    ? `${item.nome} já foi comprado`
                    : `Comprar ${item.nome} por ${formatar(item.custo)}`
                }
              >
                {comprado ? 'Comprado' : formatar(item.custo)}
              </button>

              {!comprado && !acessivel && (
                <span className="comite__aviso">Saldo insuficiente</span>
              )}
            </li>
          );
        })}
      </ul>

      <Paginacao paginaAtual={pagina} totalPaginas={totalPaginas} aoMudarPagina={setPagina} />
    </section>
  );
}

export default PainelComite;
