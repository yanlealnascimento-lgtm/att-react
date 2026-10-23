import { useCampanha } from '../context/CampanhaContext.jsx';
import { vendedores } from '../data/vendedores.js';

const formatar = (numero) => `R$ ${Math.floor(numero).toLocaleString('pt-BR')}`;

function PainelCampanha() {
  const { votos, votosTotais, votosPorClique, votosPorSegundo, chinelo, votar } = useCampanha();

  const fotoVendedor = vendedores.find((vendedor) => vendedor.valor === chinelo)?.imagem;

  return (
    <section className="campanha">
      <p className="campanha__contador">
        <strong>{formatar(votos)}</strong> arrecadados
      </p>
      <p className="campanha__taxa">
        {formatar(votosPorClique)} por clique · {formatar(votosPorSegundo)} por segundo
      </p>

      <button
        type="button"
        className="campanha__botao"
        onClick={votar}
        aria-label="Clique para pedir um Pix para a placa do Helicóptero"
      >
        {fotoVendedor ? <img src={fotoVendedor} alt="" /> : <span aria-hidden="true">🪙</span>}
      </button>

      <p className="campanha__dica">Clique para pedir um Pix</p>

      <dl className="campanha__stats">
        <div>
          <dt>Total arrecadado</dt>
          <dd>{formatar(votosTotais)}</dd>
        </div>
        <div>
          <dt>Por clique</dt>
          <dd>{formatar(votosPorClique)}</dd>
        </div>
        <div>
          <dt>Por segundo</dt>
          <dd>{formatar(votosPorSegundo)}</dd>
        </div>
      </dl>
    </section>
  );
}

export default PainelCampanha;
