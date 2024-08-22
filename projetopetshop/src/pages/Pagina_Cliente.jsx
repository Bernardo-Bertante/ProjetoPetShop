import "./Pagina_Agendamento.css";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CaixaAviso_CLiente from "../components/CaixaAviso_Cliente";
import { UserContext } from "../contexts/UserContext"; // ajuste o caminho conforme necessário

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function Pagina_Cliente() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // acessar o estado do usuário
  const [dados, setDados] = useState([]);
  const [caixaAviso, setCaixaAviso] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null); // para armazenar o ID do agendamento a ser excluído

  const getDados = async () => {
    try {
      const resposta = await axios.get("/cliente/all");
      setDados(resposta.data || []);
      console.log(resposta.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAgendamento = async (id) => {
    try {
      await axios.delete(`/cliente/delete/${id}`);
      // Atualize o estado removendo o item excluído
      setDados(dados.filter((dado) => dado.id !== id));
      setCaixaAviso(false); // Fechar a caixa de aviso após a exclusão
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      // Redirecionar para a página inicial se não houver um usuário autenticado
      navigate("/");
    } else {
      getDados();
    }
  }, [user, navigate]);
  

  return (
    <div className="pagina-agendamento">
      <nav className="navbar">
        <div
          className="btn-voltar"
          onClick={() => {
            navigate("/pagina-principal");
          }}
        >
          <img src="/img/seta.svg" alt="Voltar" />
        </div>
        <button
          className="btn-agendar"
          onClick={() => navigate("/formulario-cliente")}
        >
          Cadastrar
        </button>
      </nav>

      <section className="cards">
        {dados.length > 0 ? (
          dados.map((dado) => (
            <div className="card" key={dado.id}>
              <ul>
                <li>{dado.nomeDono}</li>
                <li>{dado.nomeAnimal}</li>
                <li>{dado.racaAnimal}</li>
                <li>{dado.especieAnimal}</li>
                <li>{dado.telefone}</li>
                <li>{dado.email}</li>
              </ul>

              <div className="buttons">
                <button
                  className="btn-excluir"
                  onClick={() => {
                    setIdToDelete(dado.id); // Armazenar o ID do agendamento a ser excluído
                    setCaixaAviso(true);
                  }}
                >
                  Excluir
                </button>
                <button
                    className="btn-atualizar"
                    onClick={() => {
                      navigate("/atualizar-cliente", {
                        state: { agendamento: dado } // Passando o dado do agendamento para a próxima página
                      });
                    }}
                  >
                    Atualizar
              </button>
              </div>
            </div>
          ))
        ) : (
          <span className="texto-aviso">NÃO HÁ CLIENTES CADASTRADOS</span>
        )}
      </section>

      <CaixaAviso_CLiente
        exibirCaixaAviso={caixaAviso}
        ocultarCaixaAviso={() => {
          setCaixaAviso(false);
        }}
        confirmarExclusao={() => {
          if (idToDelete) {
            deleteAgendamento(idToDelete); // Confirmar exclusão do agendamento
          }
        }}
      />
    </div>
  );
}

export default Pagina_Cliente;
