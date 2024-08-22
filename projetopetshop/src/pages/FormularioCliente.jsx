import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./FormularioAgendamento.css";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function FormularioCliente() {
  const navigate = useNavigate();
  const [selectedNomeDono, setSelectedNomeDono] = useState("");
  const [selectedNomeAnimal, setSelectedNomeAnimal] = useState("");
  const [selectedEspecie, setSelectedEspecie] = useState("");
  const [selectedRaca, setSelectedRaca] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [selectedTelefone, setSelectedTelefone] = useState("");
  const [erro, setErro] = useState({
    nomeDono: false,
    nomeAnimal: false,
    especie: false,
    raca: false,
    email: false,
    telefone: false
  });

  const handleCadastrar = async () => {
    let temErro = false;

    const novoErro = {
      nomeDono: !selectedNomeDono,
      nomeAnimal: !selectedNomeAnimal,
      especie: !selectedEspecie,
      raca: !selectedRaca,
      email: !selectedEmail,
      telefone: !selectedTelefone
    };

    setErro(novoErro);

    if (Object.values(novoErro).includes(true)) {
      temErro = true;
    }

    if (temErro) return;

    try {
      await axios.post("/cliente/create", {
        clienteId: selectedNomeDono,
        servicoId: selectedNomeAnimal,
        horarioId: selectedEspecie,
      });
      navigate("/pagina-cliente");
    } catch (error) {
      console.log("Erro ao agendar:", error.response.data.error);
    }
  };

  const handleFocus = (e) => {
    const { name } = e.target;

    setErro({
      ...erro,
      [name]: false,
    });
  };

  return (
    <div className="pagina-agendar">
      <form className="formulario-agendamento">
        <img
          src="/img/seta.svg"
          alt=""
          onClick={() => {
            navigate("/pagina-cliente");
          }}
        />

        <h2>FORMULÁRIO</h2>

        <div className={`formulario-campo ${erro.nomeDono ? "erroCampo" : ""}`}>
          <label htmlFor="nomeDono">Nome do dono</label>
          <input
            id="nomeDono"
            name="nomeDono"
            type="text"
            value={selectedNomeDono}
            onChange={(e) => {
              setSelectedNomeDono(e.target.value);
              setErro((prev) => ({ ...prev, nomeDono: false }));
            }}
            onFocus={handleFocus}
          />
          {erro.nomeDono && <div className="erro-mensagem">Erro</div>}
        </div>

        <div className={`formulario-campo ${erro.nomeAnimal ? "erroCampo" : ""}`}>
          <label htmlFor="nomeAnimal">Nome do animal</label>
          <input
            id="nomeAnimal"
            name="nomeAnimal"
            type="text"
            value={selectedNomeAnimal}
            onChange={(e) => {
              setSelectedNomeAnimal(e.target.value);
              setErro((prev) => ({ ...prev, nomeDono: false }));
            }}
            onFocus={handleFocus}
          />
          {erro.nomeAnimal && <div className="erro-mensagem">Erro</div>}
        </div>

        <div className={`formulario-campo ${erro.especie ? "erroCampo" : ""}`}>
          <label htmlFor="nomeEspecie">Espécie do animal</label>
          <input
            id="nomeEspecie"
            name="nomeEspecie"
            type="text"
            value={selectedEspecie}
            onChange={(e) => {
              setSelectedEspecie(e.target.value);
              setErro((prev) => ({ ...prev, especie: false }));
            }}
            onFocus={handleFocus}
          />
          {erro.especie && <div className="erro-mensagem">Erro</div>}
        </div>


        <div className={`formulario-campo ${erro.raca ? "erroCampo" : ""}`}>
          <label htmlFor="nomeEspecie">Raça do animal</label>
          <input
            id="nomeRaca"
            name="nomeRaca"
            type="text"
            value={selectedRaca}
            onChange={(e) => {
              setSelectedRaca(e.target.value);
              setErro((prev) => ({ ...prev, raca: false }));
            }}
            onFocus={handleFocus}
          />
          {erro.raca && <div className="erro-mensagem">Erro</div>}
        </div>

        <div className={`formulario-campo ${erro.email ? "erroCampo" : ""}`}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="text"
            value={selectedRaca}
            onChange={(e) => {
              setSelectedEmail(e.target.value);
              setErro((prev) => ({ ...prev, email: false }));
            }}
            onFocus={handleFocus}
          />
          {erro.email && <div className="erro-mensagem">Erro</div>}
        </div>

        <div className={`formulario-campo ${erro.telefone ? "erroCampo" : ""}`}>
          <label htmlFor="telefone">Telefone</label>
          <input
            id="telefone"
            name="telefone"
            type="text"
            value={selectedTelefone}
            onChange={(e) => {
              setSelectedTelefone(e.target.value);
              setErro((prev) => ({ ...prev, telefone: false }));
            }}
            onFocus={handleFocus}
          />
          {erro.telefone && <div className="erro-mensagem">Erro</div>}
        </div>
       

        <button className="button" type="button" onClick={handleCadastrar}>
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default FormularioCliente;
