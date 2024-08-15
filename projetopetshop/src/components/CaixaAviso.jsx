import "./CaixaAviso.css";

function CaixaAviso({ exibirCaixaAviso, ocultarCaixaAviso }) {

    if (!exibirCaixaAviso) return null;

    return (
        <div className="caixa-aviso">

            <div className="conteudo-caixa">
                <img src="/img/triangulo-atencao.svg" alt="" />

                <p>Tem certeza que deseja excluir este Agendamento?</p>

                <div className="buttons-caixa-aviso">
                    <button className="btn-sim">Sim</button>
                    <button className="btn-nao" onClick={ () => {ocultarCaixaAviso()} }>Não</button>
                </div>
            </div>
        </div>
    )
}

export default CaixaAviso;