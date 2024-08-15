import "./Pagina_Agendamento.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CaixaAviso from "../components/CaixaAviso";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function Pagina_Agendamento() {
  const navigate = useNavigate();
  const [dados, setDados] = useState([]);
  const [caixaAviso, setCaixaAviso] = useState(false);

  const getDados = async () => {
    try {
      const resposta = await axios.get("http://localhost:5000/agendamento/all");
      setDados(resposta.data.agendamento);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDados();
  }, []);

  return (
    <div className="pagina-agendamento">
      <nav className="navbar">
        <div
          className="btn-voltar"
          onClick={() => {
            navigate("/pagina-principal");
          }}
        >
          <img src="/img/seta.svg" alt="" />
        </div>
        <button className="btn-agendar">Agendar</button>
      </nav>

      <section className="cards">
        {dados.map((dado) => (
          <div className="card" key={dado.id}>
            <ul>
              <li>{dado.cliente.nomeDono}</li>
              <li>{dado.cliente.nomeAnimal}</li>
              {/* <li>{dado.cliente.especie}</li> */}
              <li>{dado.servico.tipoServico}</li>
              <li>{dado.horario.horario}</li>
            </ul>

            <div className="buttons">
              <button
                className="btn-excluir"
                onClick={() => {
                  setCaixaAviso(true);
                }}
              >
                Excluir
              </button>
              <button className="btn-atualizar">Atualizar</button>
            </div>
          </div>
        ))}
      </section>

      {dados.length <= 0 && (
        <span className="texto-aviso">NÃO HÁ AGENDAMENTOS NO MOMENTO</span>
      )}

      <CaixaAviso
        exibirCaixaAviso={caixaAviso}
        ocultarCaixaAviso={() => {
          setCaixaAviso(false);
        }}
      />
    </div>
  );
}

export default Pagina_Agendamento;
