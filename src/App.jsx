import Abas from './components/Abas.jsx';
import Acordeao from './components/Acordeao.jsx';
import BarraProgresso from './components/BarraProgresso.jsx';
import MenuSuspenso from './components/MenuSuspenso.jsx';
import PainelCampanha from './components/PainelCampanha.jsx';
import PainelComite from './components/PainelComite.jsx';
import { CampanhaProvider, useCampanha } from './context/CampanhaContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import { regras } from './data/regras.js';
import { vendedores } from './data/vendedores.js';
import './App.css';

const formatar = (numero) => `R$ ${Math.floor(numero).toLocaleString('pt-BR')}`;

function Cabecalho() {
  const { cargoAtual, proximoCargo, progresso, votosTotais, chinelo, trocarChinelo } =
    useCampanha();

  const fotoVendedor = vendedores.find((vendedor) => vendedor.valor === chinelo)?.imagem;

  return (
    <header className="cabecalho">
      <div className="cabecalho__topo">
        <div>
          <h1 className="cabecalho__titulo">
            {fotoVendedor && <img className="cabecalho__foto" src={fotoVendedor} alt="" />}
            Vaquinha do Helicóptero
          </h1>
          <p className="cabecalho__cargo">{cargoAtual.nome}</p>
        </div>

        <MenuSuspenso
          rotulo="Skin do botão"
          opcoes={vendedores}
          valorSelecionado={chinelo}
          aoSelecionar={(opcao) => trocarChinelo(opcao.valor, opcao.label)}
        />
      </div>

      <BarraProgresso
        valor={progresso}
        rotulo={
          proximoCargo
            ? `Rumo a ${proximoCargo.nome} — ${formatar(votosTotais)} de ${formatar(
                proximoCargo.meta
              )}`
            : 'Vaquinha concluída: todas as metas atingidas'
        }
      />
    </header>
  );
}

function Conteudo() {
  const abas = [
    { id: 'campanha', titulo: 'Vaquinha', conteudo: <PainelCampanha /> },
    { id: 'comite', titulo: 'Loja', conteudo: <PainelComite /> },
    { id: 'regras', titulo: 'Regras', conteudo: <Acordeao itens={regras} /> },
  ];

  return (
    <div className="app">
      <Cabecalho />
      <main className="app__conteudo">
        <Abas abas={abas} />
      </main>
    </div>
  );
}

function App() {
  return (
    <ToastProvider>
      <CampanhaProvider>
        <Conteudo />
      </CampanhaProvider>
    </ToastProvider>
  );
}

export default App;
