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
    duracaoServico: false
  });
  const [mensagemErro, setMensagemErro] = useState(""); // Estado para mensagem de erro

  const handleCadastrar = async () => {
    let temErro = false;

    const novoErro = {
      tipoServico: !selectedTipoServico,
      preco: !selectedPreco,
      duracaoServico: !selectedDuracaoServico
    };

    setErro(novoErro);

    if (Object.values(novoErro).includes(true)) {
      temErro = true;
    }

    if (temErro) return;

    try {
      const response = await axios.post("/cliente/create", {
        tipoServico: selectedTipoServico,
        preco: selectedPreco,
        duracaoServico: selectedDuracaoServico
      });

      console.log("Serviç cadastrado com sucesso:", response.data);
      navigate("/pagina-servico");
    } catch (error) {
      // Atualiza a mensagem de erro com base na resposta do servidor
      if (error.response && error.response.data) {
        setMensagemErro(error.response.data.message || "Erro desconhecido.");
      } else {
        setMensagemErro("Erro ao cadastrar serviço.");
      }
      console.error("Erro ao cadastrar serviço:", error.response?.data?.message || error.message);
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

        {mensagemErro && <div className="erro-mensagem">{mensagemErro}</div>} {/* Exibe a mensagem de erro */}

        <div className={`formulario-campo ${erro.tipoServico ? "erroCampo" : ""}`}>
          <label htmlFor="tipoServico">Tipo de serviço</label>
          <input
            id="tipoServico"
            name="tipoServico"
            type="text"
            value={selectedTipoServico}
            onChange={(e) => setSelectedTipoServico(e.target.value)}
            onFocus={handleFocus}
          />
          {erro.tipoServico && <div className="erro-mensagem">Nome do serviço é obrigatório.</div>}
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
          {erro.preco && <div className="erro-mensagem">Preço é obrigatório.</div>}
        </div>

      <div className={`formulario-campo ${erro.duracaoServico ? "erroCampo" : ""}`}>
        <label htmlFor="duracaoServico">Duração do serviço (em horas)</label>
        <select
          id="duracaoServico"
          name="duracaoServico"
          value={selectedDuracaoServico}
          onChange={(e) => {
            setSelectedDuracaoServico([e.target.value]);
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
        {erro.duracaoServico && <div className="erro-mensagem">Duração</div>}
      </div>
        <button className="button" type="button" onClick={handleCadastrar}>
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default FormularioServico;
