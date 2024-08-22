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
  const [dados, setDados] = useState([
    { id: 1, nomeDono: "João", sobrenomeDono: "Silva", nomeAnimal: "Rex", especieAnimal: "Cachorro", racaAnimal: "Labrador", email: "joao.silva@example.com", telefone: "(11) 99999-1111" },
    { id: 2, nomeDono: "Maria", sobrenomeDono: "Oliveira", nomeAnimal: "Miau", especieAnimal: "Gato", racaAnimal: "Siamês", email: "maria.oliveira@example.com", telefone: "(11) 99999-2222" },
    { id: 3, nomeDono: "Carlos", sobrenomeDono: "Pereira", nomeAnimal: "Fido", especieAnimal: "Cachorro", racaAnimal: "Beagle", email: "carlos.pereira@example.com", telefone: "(11) 99999-3333" },
    { id: 4, nomeDono: "Ana", sobrenomeDono: "Costa", nomeAnimal: "Rex", especieAnimal: "Cachorro", racaAnimal: "Bulldog", email: "ana.costa@example.com", telefone: "(11) 99999-4444" },
    { id: 5, nomeDono: "Pedro", sobrenomeDono: "Santos", nomeAnimal: "Luna", especieAnimal: "Gato", racaAnimal: "Persa", email: "pedro.santos@example.com", telefone: "(11) 99999-5555" },
    { id: 6, nomeDono: "Lucia", sobrenomeDono: "Ferreira", nomeAnimal: "Max", especieAnimal: "Cachorro", racaAnimal: "Golden Retriever", email: "lucia.ferreira@example.com", telefone: "(11) 99999-6666" },
    { id: 7, nomeDono: "Roberto", sobrenomeDono: "Souza", nomeAnimal: "Nina", especieAnimal: "Gato", racaAnimal: "Angorá", email: "roberto.souza@example.com", telefone: "(11) 99999-7777" },
    { id: 8, nomeDono: "Mariana", sobrenomeDono: "Barros", nomeAnimal: "Bolt", especieAnimal: "Cachorro", racaAnimal: "Dachshund", email: "mariana.barros@example.com", telefone: "(11) 99999-8888" },
    { id: 9, nomeDono: "Felipe", sobrenomeDono: "Alves", nomeAnimal: "Simba", especieAnimal: "Gato", racaAnimal: "Maine Coon", email: "felipe.alves@example.com", telefone: "(11) 99999-9999" },
    { id: 10, nomeDono: "Juliana", sobrenomeDono: "Moura", nomeAnimal: "Buddy", especieAnimal: "Cachorro", racaAnimal: "Boxer", email: "juliana.moura@example.com", telefone: "(11) 99999-0000" }
  ]);
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
                <li>{dado.nomeDono} {dado.sobrenomeDono}</li>
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
                        state: { cliente: dado } // Passando o dado do agendamento para a próxima página
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
