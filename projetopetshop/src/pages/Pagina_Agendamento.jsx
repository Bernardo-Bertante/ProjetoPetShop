import "./Pagina_Agendamento.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Pagina_Agendamento() {

    const navigate = useNavigate();
    const [dados, setDados] = useState([]);

    const getDados = async () => {
        try {
            const resposta = await axios.get("http://localhost:5000/agendamento");
            setDados(resposta.data.agendamento);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDados();
    }, []);

    return (
        <div className="pagina-agendamento">
            <nav className="navbar">
                <div className="btn-voltar" onClick={() => {navigate("/pagina-principal")}}>
                    <img src="/img/seta.svg" alt="" />
                </div>
                <button className="btn-agendar">Agendar</button>
            </nav>


        <section className="cards">
            {dados.map( (dado) => (

                <div className="card" key={dado.id}>
                    <ul>
                        <li>{dado.cliente.nomeDono}</li>
                        <li>{dado.cliente.nomeAnimal}</li>
                        {/* <li>{dado.cliente.especieee}</li> */}
                        <li>{dado.servico.tipoServico}</li>
                        <li>{dado.horario.horario}</li>
                    </ul>

                    <div className="buttons">
                        <button className="btn-excluir">Excluir</button>
                        <button className="btn-atualizar">Atualizar</button>
                    </div>
                </div>
            ))}
        </section>
        </div>
    )
}

export default Pagina_Agendamento;