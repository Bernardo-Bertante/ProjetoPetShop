import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Formulario.css";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function Pagina_Atualizar_Servico() {
  const navigate = useNavigate();
  const location = useLocation();
  const { servico } = location.state || {}; // Acessa o serviço passado pelo location.state

  const [selectedTipoServico, setSelectedTipoServico] = useState(
    servico?.tipoServico || ""
  );
  const [selectedPreco, setSelectedPreco] = useState(servico?.preco || "");
  const [selectedDuracaoServico, setSelectedDuracaoServico] = useState(
    servico?.duracaoServico || ""
  );
  const [erro, setErro] = useState({
    tipoServico: false,
    preco: false,
    duracaoServico: false,
  });
  const [mensagemErro, setMensagemErro] = useState(""); // Estado para mensagem de erro

  useEffect(() => {
    // Carrega os dados do serviço ao montar o componente
    if (servico) {
      setSelectedTipoServico(servico.tipoServico);
      setSelectedPreco(servico.preco);
      setSelectedDuracaoServico(servico.duracaoServico);
    }
  }, [servico]);

  const isValidDecimal = (value) => {
    return /^(\d+(\.\d{1,2})?)?$/.test(value);
  };

  const handleAtualizar = async () => {
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
      const response = await axios.put(`/servico/update/${servico.id}`, {
        tipoServico: selectedTipoServico,
        preco: parseFloat(selectedPreco), // Converte para número decimal
        duracaoServico: selectedDuracaoServico,
      });

      console.log("Serviço atualizado com sucesso:", response.data);
      navigate("/pagina-servico");
    } catch (error) {
      // Atualiza a mensagem de erro com base na resposta do servidor
      if (error.response && error.response.data) {
        setMensagemErro(error.response.data.message || "Erro desconhecido.");
      } else {
        setMensagemErro("Erro ao atualizar serviço.");
      }
      console.error(
        "Erro ao atualizar serviço:",
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
        {mensagemErro && (
          <div className="erro-mensagem">{mensagemErro}</div>
        )}{" "}
        {/* Exibe a mensagem de erro */}
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
              O preço deve ser um número decimal válido (ex: 10.00).
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
            onChange={(e) => setSelectedDuracaoServico(e.target.value)}
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
        <button className="button" type="button" onClick={handleAtualizar}>
          Editar
        </button>
      </form>
    </div>
  );
}

export default Pagina_Atualizar_Servico;
