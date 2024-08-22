import "./CaixaAviso.css";

function CaixaAviso_Cliente({
  exibirCaixaAviso,
  ocultarCaixaAviso,
  confirmarExclusao,
}) {
  if (!exibirCaixaAviso) return null;

  return (
    <div className="caixa-aviso">
      <div className="conteudo-caixa">
        <img src="/img/triangulo-atencao.svg" alt="" />
        <p>Tem certeza que deseja excluir este Cliente?</p>
        <div className="buttons-caixa-aviso">
          <button
            className="btn-sim"
            onClick={() => {
              confirmarExclusao(); // Chama a função de confirmação de exclusão
              ocultarCaixaAviso(); // Fecha a caixa de aviso
            }}
          >
            Sim
          </button>
          <button
            className="btn-nao"
            onClick={ocultarCaixaAviso} // Fecha a caixa de aviso sem excluir
          >
            Não
          </button>
        </div>
      </div>
    </div>
  );
}

export default CaixaAviso_Cliente;
