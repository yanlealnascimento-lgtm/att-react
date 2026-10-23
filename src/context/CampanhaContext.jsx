import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { cargos } from '../data/cargos.js';
import { upgrades } from '../data/upgrades.js';
import { useToast } from './ToastContext.jsx';

const CampanhaContext = createContext(null);

export function useCampanha() {
  const contexto = useContext(CampanhaContext);
  if (!contexto) {
    throw new Error('useCampanha precisa estar dentro de <CampanhaProvider>');
  }
  return contexto;
}

export function CampanhaProvider({ children }) {
  const { mostrarToast } = useToast();

  const [votos, setVotos] = useState(0);
  const [votosTotais, setVotosTotais] = useState(0);
  const [idsComprados, setIdsComprados] = useState([]);
  const [chinelo, setChinelo] = useState(null);

  const comprados = useMemo(
    () => upgrades.filter((item) => idsComprados.includes(item.id)),
    [idsComprados]
  );

  const votosPorClique = useMemo(
    () =>
      comprados
        .filter((item) => item.tipo === 'clique')
        .reduce((total, item) => total + item.valor, 1),
    [comprados]
  );

  const votosPorSegundo = useMemo(
    () =>
      comprados
        .filter((item) => item.tipo === 'auto')
        .reduce((total, item) => total + item.valor, 0),
    [comprados]
  );

  const adicionarVotos = useCallback((quantidade) => {
    setVotos((anterior) => anterior + quantidade);
    setVotosTotais((anterior) => anterior + quantidade);
  }, []);

  const votar = useCallback(() => {
    adicionarVotos(votosPorClique);
  }, [adicionarVotos, votosPorClique]);

  useEffect(() => {
    if (votosPorSegundo === 0) return undefined;

    const intervalo = setInterval(() => {
      adicionarVotos(votosPorSegundo);
    }, 1000);

    return () => clearInterval(intervalo);
  }, [votosPorSegundo, adicionarVotos]);

  const indiceCargo = useMemo(() => {
    let indice = 0;
    cargos.forEach((cargo, i) => {
      if (votosTotais >= cargo.meta) indice = i;
    });
    return indice;
  }, [votosTotais]);

  const cargoAtual = cargos[indiceCargo];
  const proximoCargo = cargos[indiceCargo + 1] ?? null;

  const progresso = useMemo(() => {
    if (!proximoCargo) return 100;
    const faixa = proximoCargo.meta - cargoAtual.meta;
    const andado = votosTotais - cargoAtual.meta;
    return Math.min(100, Math.round((andado / faixa) * 100));
  }, [votosTotais, cargoAtual, proximoCargo]);

  const cargoAnterior = useRef(0);
  useEffect(() => {
    if (indiceCargo > cargoAnterior.current) {
      mostrarToast(`Vaquinha chegou em: ${cargos[indiceCargo].nome}!`, 'sucesso');
      cargoAnterior.current = indiceCargo;
    }
  }, [indiceCargo, mostrarToast]);

  const comprar = useCallback(
    (item) => {
      if (idsComprados.includes(item.id)) return;

      if (votos < item.custo) {
        mostrarToast('Saldo insuficiente para esse item.', 'erro');
        return;
      }

      setVotos((anterior) => anterior - item.custo);
      setIdsComprados((anteriores) => [...anteriores, item.id]);
      mostrarToast(`${item.nome} entrou no setup!`, 'sucesso');
    },
    [idsComprados, votos, mostrarToast]
  );

  const trocarChinelo = useCallback(
    (novoChinelo, rotulo) => {
      setChinelo(novoChinelo);
      mostrarToast(`Comprando com ${rotulo}.`, 'info');
    },
    [mostrarToast]
  );

  const valor = {
    votos,
    votosTotais,
    votosPorClique,
    votosPorSegundo,
    idsComprados,
    chinelo,
    cargoAtual,
    proximoCargo,
    progresso,
    votar,
    comprar,
    trocarChinelo,
  };

  return <CampanhaContext.Provider value={valor}>{children}</CampanhaContext.Provider>;
}
