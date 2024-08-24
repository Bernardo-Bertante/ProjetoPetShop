import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Formulario.css";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function FormularioServico() {
  const navigate = useNavigate();
  const [selectedTipoServico, setSelectedTipoServico] = useState("");
  const [selectedPreco, setSelectedPreco] = useState("");
  const [selectedDuracaoServico, setSelectedDuracaoServico] = useState("");
  const [erro, setErro] = useState({
    tipoServico: false,
    preco: false,
    duracaoServico: false,
  });
  const [mensagemErro, setMensagemErro] = useState("");

  const isValidDecimal = (value) => {
    return /^(\d+(\.\d{1,2})?)?$/.test(value);
  };

  const handleCadastrar = async () => {
    let temErro = false;

    const novoErro = {
      tipoServico: !selectedTipoServico,
      preco: !selectedPreco || !isValidDecimal(selectedPreco),
      duracaoServico: !selectedDuracaoServico,
    };

    setErro(novoErro);

    if (Object.values(novoErro).includes(true)) {
      temErro = true;
    }

    if (temErro) return;

    try {
      const response = await axios.post("/servico/create", {
        tipoServico: selectedTipoServico,
        preco: parseFloat(selectedPreco), // Converte para número decimal
        duracaoServico: selectedDuracaoServico,
      });

      console.log("Serviço cadastrado com sucesso:", response.data);
      navigate("/pagina-servico");
    } catch (error) {
      // Verifica a existência de erro específico e ajusta a mensagem
      if (error.response && error.response.data) {
        const mensagem = error.response.data.message;
        if (mensagem.includes("número válido")) {
          setMensagemErro(
            "O preço deve ser um número decimal válido (ex: 10.00)."
          );
        } else {
          setMensagemErro(mensagem || "Erro desconhecido.");
        }
      } else {
        setMensagemErro("Erro ao cadastrar serviço.");
      }
      console.error(
        "Erro ao cadastrar serviço:",
        error.response?.data?.message || error.message
      );
    }
  };

  const handleFocus = (e) => {
    const { name } = e.target;

    setErro((prev) => ({
      ...prev,
      [name]: false,
    }));
  };

  return (
    <div className="pagina-agendar">
      <form className="formulario-agendamento">
        <img
          src="/img/seta.svg"
          alt="Voltar"
          onClick={() => navigate("/pagina-servico")}
        />
        <h2>FORMULÁRIO</h2>
        {mensagemErro && <div className="erro-mensagem">{mensagemErro}</div>}
        <div
          className={`formulario-campo ${erro.tipoServico ? "erroCampo" : ""}`}
        >
          <label htmlFor="tipoServico">Tipo de serviço</label>
          <input
            id="tipoServico"
            name="tipoServico"
            type="text"
            value={selectedTipoServico}
            onChange={(e) => setSelectedTipoServico(e.target.value)}
            onFocus={handleFocus}
          />
          {erro.tipoServico && (
            <div className="erro-mensagem">Nome do serviço é obrigatório.</div>
          )}
        </div>
        <div className={`formulario-campo ${erro.preco ? "erroCampo" : ""}`}>
          <label htmlFor="preco">Preço</label>
          <input
            id="preco"
            name="preco"
            type="text"
            value={selectedPreco}
            onChange={(e) => setSelectedPreco(e.target.value)}
            onFocus={handleFocus}
          />
          {erro.preco && (
            <div className="erro-mensagem">
              {selectedPreco === ""
                ? "Preço é obrigatório."
                : "Preço deve ser um número decimal válido (ex: 10.00)."}
            </div>
          )}
        </div>
        <div
          className={`formulario-campo ${
            erro.duracaoServico ? "erroCampo" : ""
          }`}
        >
          <label htmlFor="duracaoServico">Duração do serviço (em horas)</label>
          <select
            id="duracaoServico"
            name="duracaoServico"
            value={selectedDuracaoServico}
            onChange={(e) => {
              setSelectedDuracaoServico(e.target.value);
              setErro((prev) => ({ ...prev, duracaoServico: false }));
            }}
            onFocus={handleFocus}
          >
            <option value="">Selecione a duração</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          {erro.duracaoServico && (
            <div className="erro-mensagem">Duração é obrigatória.</div>
          )}
        </div>
        <button className="button" type="button" onClick={handleCadastrar}>
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default FormularioServico;
