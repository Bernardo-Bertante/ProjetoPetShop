import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Formulario.css";
import InputMask from "react-input-mask";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function Pagina_Atualizar_Funcionario() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = location.state || {};
  const [mensagemErro, setMensagemErro] = useState(""); // Novo estado para mensagem de erro

  const [dados, setDados] = useState(user || {});
  const [erro, setErro] = useState({
    nome: false,
    sobrenome: false,
    cpf: false,
    dataNascimento: false,
    password: false,
    email: false,
    telefone: false,
  });

  useEffect(() => {
    if (!user) {
      console.error("Dados do funcionário não fornecidos.");
      navigate("/pagina-principal");
    }
  }, [user, navigate]);

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
      nome: !dados.nome,
      sobrenome: !dados.sobrenome,
      cpf: !dados.cpf,
      dataNascimento: !dados.dataNascimento,
      password: !dados.password,
      telefone: !dados.telefone,
      email: !dados.email,
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
        `/funcionario/update/${dados.id}`,
        dadosAtualizados
      );
      console.log("Funcionário atualizado com sucesso:", response.data);
      navigate("/pagina-funcionario");
    } catch (error) {
      console.error("Erro ao atualizar funcionário:", error);
      // Atualiza o estado com a mensagem de erro recebida
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setMensagemErro(error.response.data.message);
      } else {
        setMensagemErro("Ocorreu um erro inesperado.");
      }
    }
  };

  return (
    <div className="pagina-agendar">
      <form onSubmit={handleSubmit} className="formulario-agendamento">
        <img
          src="/img/seta.svg"
          alt="Voltar"
          onClick={() => navigate("/pagina-funcionario")}
        />

        <h2>FORMULÁRIO</h2>

        {mensagemErro && <div>{mensagemErro}</div>}

        <div className={`formulario-campo ${erro.nome ? "erroCampo" : ""}`}>
          <label htmlFor="nome">Nome</label>
          <input
            id="nome"
            type="text"
            name="nome"
            value={dados.nome || ""}
            onChange={handleChange}
            onFocus={() => setErro((prev) => ({ ...prev, nome: false }))}
          />
          {erro.nome && <div className="erro-mensagem">Nome é obrigatório</div>}
        </div>

        <div
          className={`formulario-campo ${erro.sobrenome ? "erroCampo" : ""}`}
        >
          <label htmlFor="sobrenome">Sobrenome</label>
          <input
            id="sobrenome"
            type="text"
            name="sobrenome"
            value={dados.sobrenome || ""}
            onChange={handleChange}
            onFocus={() => setErro((prev) => ({ ...prev, sobrenome: false }))}
          />
          {erro.sobrenome && (
            <div className="erro-mensagem">Sobrenome é obrigatório</div>
          )}
        </div>

        <div className={`formulario-campo ${erro.cpf ? "erroCampo" : ""}`}>
          <label htmlFor="cpf">CPF</label>
          <InputMask
            id="cpf"
            type="text"
            name="cpf"
            value={dados.cpf || ""}
            onChange={handleChange}
            onFocus={() => setErro((prev) => ({ ...prev, cpf: false }))}
            mask={"999.999.999-99"}
          />
          {erro.cpf && <div className="erro-mensagem">CPF é obrigatório</div>}
        </div>

        <div
          className={`formulario-campo ${
            erro.dataNascimento ? "erroCampo" : ""
          }`}
        >
          <label htmlFor="dataNascimento">Data de nascimento</label>
          <InputMask
            id="dataNascimento"
            type="text"
            name="dataNascimento"
            value={dados.dataNascimento || ""}
            onChange={handleChange}
            onFocus={() =>
              setErro((prev) => ({ ...prev, dataNascimento: false }))
            }
            mask={"99/99/9999"}
          />
          {erro.dataNascimento && (
            <div className="erro-mensagem">
              Data de nascimento é obrigatória
            </div>
          )}
        </div>

        <div className={`formulario-campo ${erro.password ? "erroCampo" : ""}`}>
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="text"
            name="password"
            value={dados.password || ""}
            onChange={handleChange}
            onFocus={() => setErro((prev) => ({ ...prev, password: false }))}
          />
          {erro.password && (
            <div className="erro-mensagem">Senha é obrigatória</div>
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
            mask={"(99) 99999-9999"}
            placeHolder="(xx) 9xxxx-xxxx"
          />
          {erro.telefone && (
            <div className="erro-mensagem">Telefone é obrigatório</div>
          )}
        </div>

        <div className={`formulario-campo ${erro.email ? "erroCampo" : ""}`}>
          <label htmlFor="telefone">Email</label>
          <input
            id="email"
            type="text"
            name="email"
            value={dados.email || ""}
            onChange={handleChange}
            onFocus={() => setErro((prev) => ({ ...prev, email: false }))}
          />
          {erro.email && (
            <div className="erro-mensagem">Email é obrigatório</div>
          )}
        </div>

        <button type="submit" className="button">
          Editar
        </button>
      </form>
    </div>
  );
}

export default Pagina_Atualizar_Funcionario;
