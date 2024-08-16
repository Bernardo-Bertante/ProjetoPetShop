import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./FormularioAgendamento.css";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function FormularioAgendamento() {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState("");
  const [selectedServico, setSelectedServico] = useState("");
  const [selectedHorario, setSelectedHorario] = useState("");
  const [animalOptions, setAnimalOptions] = useState([]);
  const [especieOptions, setEspecieOptions] = useState([]);
  const [erro, setErro] = useState({
    cliente: false,
    animal: false,
    especie: false,
    servico: false,
    horario: false,
  });
  

  useEffect(() => {
    getClientes();
    getServicos();
    getHorarios();
  }, []);

  useEffect(() => {
    console.log("Clientes carregados:", clientes);
    if (selectedCliente) {
      const clienteId = Number(selectedCliente); // Certifique-se de que o ID é um número
      const cliente = clientes.find((c) => c.id === clienteId);
      console.log("Cliente selecionado:", cliente);
      if (cliente) {
        setAnimalOptions([cliente.nomeAnimal]);
        setEspecieOptions([cliente.especieAnimal]);
        console.log("Opções de animais atualizadas:", [cliente.nomeAnimal]);
        console.log("Opções de espécies atualizadas:", [cliente.especieAnimal]);
      } else {
        setAnimalOptions([]);
        setEspecieOptions([]);
      }
    } else {
      setAnimalOptions([]);
      setEspecieOptions([]);
    }
  }, [selectedCliente, clientes]);

  const getClientes = async () => {
    try {
      const resposta = await axios.get("/cliente/all");
      setClientes(resposta.data || []);
    } catch (error) {
      console.log("Erro ao carregar clientes:", error);
    }
  };

  const getServicos = async () => {
    try {
      const resposta = await axios.get("/servico/all");
      setServicos(resposta.data || []);
    } catch (error) {
      console.log("Erro ao carregar serviços:", error);
    }
  };

  const getHorarios = async () => {
    try {
      const resposta = await axios.get("/horario/all");
      setHorarios(resposta.data || []);
    } catch (error) {
      console.log("Erro ao carregar horários:", error);
    }
  };

  const handleAgendar = async () => {
    let temErro = false;
  
    const novoErro = {
      cliente: !selectedCliente,
      animal: !animalOptions[0],
      especie: !especieOptions[0],
      servico: !selectedServico,
      horario: !selectedHorario,
    };
  
    setErro(novoErro);
  
    if (Object.values(novoErro).includes(true)) {
      temErro = true;
    }
  
    if (temErro) return;

    try {
      await axios.post("/agendamento/create", {
        clienteId: selectedCliente,
        servicoId: selectedServico,
        horarioId: selectedHorario,
      });
      navigate("/pagina-agendamento");
    } catch (error) {
      console.log("Erro ao agendar:", error);
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
        <img src="/img/seta.svg" alt="" onClick={() => {navigate("/pagina-agendamento")}}/>

        <h2>FORMULÁRIO</h2>

        <div className={`formulario-campo ${erro.cliente ? "erroCampo" : ""}`}>
          <label htmlFor="cliente">Nome do Dono</label>
          <select
            id="cliente"
            name="cliente"
            value={selectedCliente}
            onChange={(e) => {
              setSelectedCliente(e.target.value);
              setErro(prev => ({ ...prev, cliente: false }));
            }}
            onFocus={handleFocus}
          >
            <option value="">Selecione um dono</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nomeDono}
              </option>
            ))}
          </select>
          {erro.cliente && <div className="erro-mensagem">Erro</div>}
        </div>

        <div className={`formulario-campo ${erro.animal ? "erroCampo" : ""}`}>
          <label htmlFor="animal">Nome do Animal</label>
          <select
            id="animal"
            name="animal"
            disabled={!selectedCliente}
            value={animalOptions[0] || ""}
            onChange={(e) => {
              setAnimalOptions([e.target.value]);
              setErro(prev => ({ ...prev, animal: false }));
            }}
            onFocus={handleFocus}
          >
            <option value="">Selecione um animal</option>
            {clientes
              .filter((cliente) => cliente.id === Number(selectedCliente))
              .map((cliente) => (
                <option key={cliente.nomeAnimal} value={cliente.nomeAnimal}>
                  {cliente.nomeAnimal}
                </option>
              ))}
          </select>
          {erro.animal && <div className="erro-mensagem">Erro</div>}
        </div>

        <div className={`formulario-campo ${erro.especie ? "erroCampo" : ""}`}>
          <label htmlFor="especie">Espécie do Animal</label>
          <select
            id="especie"
            name="especie"
            disabled={!selectedCliente}
            value={especieOptions[0] || ""}
            onChange={(e) => {
              setEspecieOptions([e.target.value]);
              setErro(prev => ({ ...prev, especie: false }));
            }}
            onFocus={handleFocus}
          >
            <option value="">Selecione uma espécie</option>
            {clientes
              .filter((cliente) => cliente.id === Number(selectedCliente))
              .map((cliente) => (
                <option
                  key={cliente.especieAnimal}
                  value={cliente.especieAnimal}
                >
                  {cliente.especieAnimal}
                </option>
              ))}
          </select>
          {erro.especie && <div className="erro-mensagem">Erro</div>}
        </div>

        <div className={`formulario-campo ${erro.servico ? "erroCampo" : ""}`}>
          <label htmlFor="servico">Serviço</label>
          <select
            id="servico"
            name="servico"
            value={selectedServico}
            onChange={(e) => {
              setSelectedServico(e.target.value);
              setErro(prev => ({ ...prev, servico: false }));
            }}
            onFocus={handleFocus}
          >
            <option value="">Selecione um serviço</option>
            {servicos.map((servico) => (
              <option key={servico.id} value={servico.id}>
                {servico.tipoServico}
              </option>
            ))}
          </select>
          {erro.servico && <div className="erro-mensagem">Erro</div>}
        </div>

        <div className={`formulario-campo ${erro.horario ? "erroCampo" : ""}`}>
          <label htmlFor="horario">Horário</label>
          <select
            id="horario"
            name="horario"
            value={selectedHorario}
            onChange={(e) => {
              setSelectedHorario(e.target.value);
              setErro(prev => ({ ...prev, horario: false }));
            }}
            onFocus={handleFocus}
          >
            <option value="">Selecione um horário</option>
            {horarios.map((horario) => (
              <option key={horario.id} value={horario.id}>
                {horario.horario}
              </option>
            ))}
          </select>
          {erro.horario && <div className="erro-mensagem">Erro</div>}
        </div>

        <button className="button" type="button" onClick={handleAgendar}>
          Agendar
        </button>

      </form>
    </div>
  );
}

export default FormularioAgendamento;
