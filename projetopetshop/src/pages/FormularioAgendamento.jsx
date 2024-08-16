import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

  return (
    <div className="formulario-agendamento">
      <h2>Agendar Novo</h2>
      <form>
        <div>
          <label htmlFor="cliente">Nome do Dono:</label>
          <select
            id="cliente"
            value={selectedCliente}
            onChange={(e) => setSelectedCliente(e.target.value)}
          >
            <option value="">Selecione um dono</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nomeDono}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="animal">Nome do Animal:</label>
          <select
            id="animal"
            disabled={!selectedCliente}
            value={animalOptions[0] || ""}
            onChange={(e) => setAnimalOptions([e.target.value])}
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
        </div>
        <div>
          <label htmlFor="especie">Espécie do Animal:</label>
          <select
            id="especie"
            disabled={!selectedCliente}
            value={especieOptions[0] || ""}
            onChange={(e) => setEspecieOptions([e.target.value])}
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
        </div>
        <div>
          <label htmlFor="servico">Serviço:</label>
          <select
            id="servico"
            value={selectedServico}
            onChange={(e) => setSelectedServico(e.target.value)}
          >
            <option value="">Selecione um serviço</option>
            {servicos.map((servico) => (
              <option key={servico.id} value={servico.id}>
                {servico.tipoServico}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="horario">Horário:</label>
          <select
            id="horario"
            value={selectedHorario}
            onChange={(e) => setSelectedHorario(e.target.value)}
          >
            <option value="">Selecione um horário</option>
            {horarios.map((horario) => (
              <option key={horario.id} value={horario.id}>
                {horario.horario}
              </option>
            ))}
          </select>
        </div>
        <button type="button" onClick={handleAgendar}>
          Confirmar Agendamento
        </button>
        <button type="button" onClick={() => navigate("/pagina-agendamento")}>
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default FormularioAgendamento;
