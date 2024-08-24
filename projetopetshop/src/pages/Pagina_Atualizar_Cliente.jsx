import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import InputMask from "react-input-mask";
import "./Formulario.css";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function Pagina_Atualizar_Cliente() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cliente } = location.state || {};

  const [dados, setDados] = useState(cliente || {});
  const [erro, setErro] = useState({
    nomeDono: false,
    sobrenomeDono: false,
    nomeAnimal: false,
    especieAnimal: false,
    racaAnimal: false,
    email: false,
    telefone: false,
  });

  useEffect(() => {
    if (!cliente) {
      console.error("Dados do cliente não fornecidos.");
      navigate("/pagina-principal");
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

    // Resetar erros
    let hasError = false;
    const newErro = {
      nomeDono: !dados.nomeDono,
      sobrenomeDono: !dados.sobrenomeDono,
      nomeAnimal: !dados.nomeAnimal,
      especieAnimal: !dados.especieAnimal,
      racaAnimal: !dados.racaAnimal,
      email: false,
      telefone: !dados.telefone,
    };

    setErro(newErro);

    // Verifica se há algum erro
    for (let key in newErro) {
      if (newErro[key]) {
        hasError = true;
      }
    }

    if (hasError) {
      return; // Não envia se houver erros
    }

    const dadosAtualizados = {
      ...dados,
      email: dados.email === "" ? null : dados.email,
    };

    try {
      const response = await axios.put(
        `/cliente/update/${dados.id}`,
        dadosAtualizados
      );
      console.log("Cliente atualizado com sucesso:", response.data);
      navigate("/pagina-cliente");
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
    }
  };

  return (
    <div className="pagina-agendar">
      <form onSubmit={handleSubmit} className="formulario-agendamento">
        <img
          src="/img/seta.svg"
          alt="Voltar"
          onClick={() => navigate("/pagina-cliente")}
        />

        <h2>FORMULÁRIO</h2>

        <div className={`formulario-campo ${erro.nomeDono ? "erroCampo" : ""}`}>
          <label htmlFor="nomeDono">Nome do Dono</label>
          <input
            id="nomeDono"
            type="text"
            name="nomeDono"
            value={dados.nomeDono || ""}
            onChange={handleChange}
            onFocus={() => setErro((prev) => ({ ...prev, nomeDono: false }))}
          />
          {erro.nomeDono && (
            <div className="erro-mensagem">Nome do dono é obrigatório</div>
          )}
        </div>

        <div
          className={`formulario-campo ${
            erro.sobrenomeDono ? "erroCampo" : ""
          }`}
        >
          <label htmlFor="sobrenomeDono">Sobrenome do Dono</label>
          <input
            id="sobrenomeDono"
            type="text"
            name="sobrenomeDono"
            value={dados.sobrenomeDono || ""}
            onChange={handleChange}
            onFocus={() =>
              setErro((prev) => ({ ...prev, sobrenomeDono: false }))
            }
          />
          {erro.sobrenomeDono && (
            <div className="erro-mensagem">Sobrenome do dono é obrigatório</div>
          )}
        </div>

        <div
          className={`formulario-campo ${erro.nomeAnimal ? "erroCampo" : ""}`}
        >
          <label htmlFor="nomeAnimal">Nome do Animal</label>
          <input
            id="nomeAnimal"
            type="text"
            name="nomeAnimal"
            value={dados.nomeAnimal || ""}
            onChange={handleChange}
            onFocus={() => setErro((prev) => ({ ...prev, nomeAnimal: false }))}
          />
          {erro.nomeAnimal && (
            <div className="erro-mensagem">Nome do animal é obrigatório</div>
          )}
        </div>

        <div
          className={`formulario-campo ${
            erro.especieAnimal ? "erroCampo" : ""
          }`}
        >
          <label htmlFor="especieAnimal">Espécie</label>
          <input
            id="especieAnimal"
            type="text"
            name="especieAnimal"
            value={dados.especieAnimal || ""}
            onChange={handleChange}
            onFocus={() =>
              setErro((prev) => ({ ...prev, especieAnimal: false }))
            }
          />
          {erro.especieAnimal && (
            <div className="erro-mensagem">Espécie é obrigatória</div>
          )}
        </div>

        <div
          className={`formulario-campo ${erro.racaAnimal ? "erroCampo" : ""}`}
        >
          <label htmlFor="racaAnimal">Raça</label>
          <input
            id="racaAnimal"
            type="text"
            name="racaAnimal"
            value={dados.racaAnimal || ""}
            onChange={handleChange}
            onFocus={() => setErro((prev) => ({ ...prev, racaAnimal: false }))}
          />
          {erro.racaAnimal && (
            <div className="erro-mensagem">Raça é obrigatória</div>
          )}
        </div>

        <div className={`formulario-campo ${erro.telefone ? "erroCampo" : ""}`}>
          <label htmlFor="telefone">Telefone</label>
          <InputMask
            id="telefone"
            type="text"
            name="telefone"
            value={dados.telefone || ""}
            onChange={handleChange}
            onFocus={() => setErro((prev) => ({ ...prev, telefone: false }))}
            mask="(99) 99999-9999"
            placeHolder="(xx) 9xxxx-xxxx"
          />
          {erro.telefone && (
            <div className="erro-mensagem">Telefone é obrigatório</div>
          )}
        </div>

        <div className="formulario-campo">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={dados.email || ""}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="button">
          Editar
        </button>
      </form>
    </div>
  );
}

export default Pagina_Atualizar_Cliente;
