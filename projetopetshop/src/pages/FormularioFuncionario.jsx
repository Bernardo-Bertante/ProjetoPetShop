import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Formulario.css";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function FormularioCliente() {
  const navigate = useNavigate();
  const [selectedNome, setSelectedNome] = useState("");
  const [selectedSobrenome, setSelectedSobrenome] = useState("");
  const [selectedCpf, setSelectedCpf] = useState("");
  const [selectedDataNascimento, setSelectedDataNascimento] = useState("");
  const [selectedPassword, setSelectedPassword] = useState("");
  const [selectedTelefone, setSelectedTelefone] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [erro, setErro] = useState({
    nome: false,
    sobrenome: false,
    cpf: false,
    dataNascimento: false,
    password: false,
    telefone: false,
    email: false
  });
  const [mensagemErro, setMensagemErro] = useState(""); // Estado para mensagem de erro

  const handleCadastrar = async () => {
    let temErro = false;

    const novoErro = {
      nome: !selectedNome,
      sobrenome: !selectedSobrenome,
      cpf: !selectedCpf,
      dataNascimento: !selectedDataNascimento,
      password: !selectedPassword,
      telefone: !selectedTelefone,
      email: !selectedEmail,
    };

    setErro(novoErro);

    if (Object.values(novoErro).includes(true)) {
      temErro = true;
    }

    if (temErro) return;

    try {
      const response = await axios.post("/funcionario/create", {
        nome: selectedNome,
        sobrenome: selectedSobrenome,
        cpf: selectedCpf,
        dataNascimento: selectedDataNascimento,
        password: selectedPassword,
        telefone: selectedTelefone,
        email: selectedEmail
      });

      console.log("Funcionário cadastrado com sucesso:", response.data);
      navigate("/pagina-funcionario");
    } catch (error) {
      // Atualiza a mensagem de erro com base na resposta do servidor
      if (error.response && error.response.data) {
        setMensagemErro(error.response.data.message || "Erro desconhecido.");
      } else {
        setMensagemErro("Erro ao cadastrar funcionário.");
      }
      console.error("Erro ao cadastrar funcionário:", error.response?.data?.message || error.message);
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
          onClick={() => navigate("/pagina-funcionario")}
        />

        <h2>FORMULÁRIO</h2>

        {mensagemErro && <div className="erro-mensagem">{mensagemErro}</div>} {/* Exibe a mensagem de erro */}

        <div className={`formulario-campo ${erro.nome ? "erroCampo" : ""}`}>
          <label htmlFor="nome">Nome</label>
          <input
            id="nome"
            name="nome"
            type="text"
            value={selectedNome}
            onChange={(e) => setSelectedNome(e.target.value)}
            onFocus={handleFocus}
          />
          {erro.nome && <div className="erro-mensagem">Nome é obrigatório.</div>}
        </div>

        <div className={`formulario-campo ${erro.sobrenome ? "erroCampo" : ""}`}>
          <label htmlFor="sobrenome">Sobrenome</label>
          <input
            id="sobrenome"
            name="sobrenome"
            type="text"
            value={selectedSobrenome}
            onChange={(e) => setSelectedSobrenome(e.target.value)}
            onFocus={handleFocus}
          />
          {erro.sobrenome && <div className="erro-mensagem">Sobrenome é obrigatório.</div>}
        </div>

        <div className={`formulario-campo ${erro.cpf ? "erroCampo" : ""}`}>
          <label htmlFor="nomeAnimal">CPF</label>
          <input
            id="cpf"
            name="cpf"
            type="text"
            value={selectedCpf}
            onChange={(e) => setSelectedCpf(e.target.value)}
            onFocus={handleFocus}
          />
          {erro.cpf && <div className="erro-mensagem">CPF é obrigatório.</div>}
        </div>

        <div className={`formulario-campo ${erro.dataNascimento ? "erroCampo" : ""}`}>
          <label htmlFor="dataNascimento">Data de nascimento</label>
          <input
            id="dataNascimento"
            name="dataNascimento"
            type="text"
            value={selectedDataNascimento}
            onChange={(e) => setSelectedDataNascimento(e.target.value)}
            onFocus={handleFocus}
          />
          {erro.dataNascimento && <div className="erro-mensagem">Data de nascimento é obrigatória.</div>}
        </div>

        <div className={`formulario-campo ${erro.password ? "erroCampo" : ""}`}>
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            name="password"
            type="text"
            value={selectedPassword}
            onChange={(e) => setSelectedPassword(e.target.value)}
            onFocus={handleFocus}
          />
          {erro.password && <div className="erro-mensagem">Senha é obrigatória.</div>}
        </div>

        <div className={`formulario-campo ${erro.telefone ? "erroCampo" : ""}`}>
          <label htmlFor="telefone">Telefone</label>
          <input
            id="telefone"
            name="telefone"
            type="text"
            value={selectedTelefone}
            onChange={(e) => setSelectedTelefone(e.target.value)}
            onFocus={handleFocus}
          />
          {erro.telefone && <div className="erro-mensagem">Telefone é obrigatório.</div>}
        </div>



        <div className={`formulario-campo ${erro.email ? "erroCampo" : ""}`}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="text"
            value={selectedEmail}
            onChange={(e) => setSelectedEmail(e.target.value)}
            onFocus={handleFocus}
          />
          {erro.email && <div className="erro-mensagem">Email é obrigatório.</div>}
        </div>

        <button className="button" type="button" onClick={handleCadastrar}>
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default FormularioCliente;
