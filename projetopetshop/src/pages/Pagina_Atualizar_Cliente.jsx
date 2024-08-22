import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function Pagina_Atualizar_Cliente() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cliente } = location.state || {}; // Obtendo os dados do cliente do state passado

  const [dados, setDados] = useState(cliente || {}); // Inicializa com os dados recebidos ou um objeto vazio
  const [erro, setErro] = useState({
    nomeDono: false,
    sobrenomeDono: false,
    nomeAnimal: false,
    especie: false,
    raca: false,
    email: false,
    telefone: false
  });

  useEffect(() => {
    if (!cliente) {
      console.error("Dados do cliente não fornecidos.");
      navigate("/pagina-principal"); // Redireciona se não houver dados do cliente
    }
  }, [cliente, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDados((prevDados) => ({
      ...prevDados,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/cliente/update/${dados.id}`, dados);
      console.log("Cliente atualizado com sucesso:", response.data);
      navigate("/pagina-cliente"); // Redireciona após a atualização
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
    }
  };

  return (
    <div className="pagina-atualizar-cliente">
      <nav className="navbar">
        <div
          className="btn-voltar"
          onClick={() => {
            navigate("/pagina-cliente");
          }}
        >
          <img src="/img/seta.svg" alt="Voltar" />
        </div>
        <h1>Atualizar Cliente</h1>
      </nav>

      <form onSubmit={handleSubmit} className="formulario-atualizar">
        <label>
          Nome do Dono:
          <input
            type="text"
            name="nomeDono"
            value={dados.nomeDono || ""}
            onChange={handleChange}
          />
          {erro.nomeDono && <span className="erro">Nome do dono é obrigatório</span>}
        </label>
        <label>
          Sobrenome do Dono:
          <input
            type="text"
            name="sobrenomeDono"
            value={dados.sobrenomeDono || ""}
            onChange={handleChange}
          />
          {erro.sobrenomeDono && <span className="erro">Sobrenome do dono é obrigatório</span>}
        </label>
        <label>
          Nome do Animal:
          <input
            type="text"
            name="nomeAnimal"
            value={dados.nomeAnimal || ""}
            onChange={handleChange}
          />
          {erro.nomeAnimal && <span className="erro">Nome do animal é obrigatório</span>}
        </label>
        <label>
          Espécie:
          <input
            type="text"
            name="especieAnimal"
            value={dados.especieAnimal || ""}
            onChange={handleChange}
          />
          {erro.especie && <span className="erro">Espécie é obrigatória</span>}
        </label>
        <label>
          Raça:
          <input
            type="text"
            name="racaAnimal"
            value={dados.racaAnimal || ""}
            onChange={handleChange}
          />
          {erro.raca && <span className="erro">Raça é obrigatória</span>}
        </label>
        <label>
          Telefone:
          <input
            type="text"
            name="telefone"
            value={dados.telefone || ""}
            onChange={handleChange}
          />
          {erro.telefone && <span className="erro">Telefone é obrigatório</span>}
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={dados.email || ""}
            onChange={handleChange}
          />
          {erro.email && <span className="erro">Email é obrigatório</span>}
        </label>
        <button type="submit">Atualizar</button>
      </form>
    </div>
  );
}

export default Pagina_Atualizar_Cliente;
