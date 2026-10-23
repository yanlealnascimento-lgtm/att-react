import './BarraProgresso.css';

function BarraProgresso({ valor, rotulo, mostrarPercentual = true }) {
  const seguro = Math.min(100, Math.max(0, valor));

  return (
    <div className="barra">
      {rotulo && (
        <div className="barra__topo">
          <span className="barra__rotulo">{rotulo}</span>
          {mostrarPercentual && <span className="barra__percentual">{seguro}%</span>}
        </div>
      )}
      <div
        className="barra__trilho"
        role="progressbar"
        aria-valuenow={seguro}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={rotulo || 'Progresso'}
      >
        <div className="barra__preenchimento" style={{ width: `${seguro}%` }} />
      </div>
    </div>
  );
}

export default BarraProgresso;
