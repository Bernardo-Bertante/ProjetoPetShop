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

  const getClientes = async () => {
    try {
      const resposta = await axios.get("/cliente/all");
      setClientes(resposta.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const getServicos = async () => {
    try {
      const resposta = await axios.get("/servico/all");
      setServicos(resposta.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const getHorarios = async () => {
    try {
      const resposta = await axios.get("/horario/all");
      setHorarios(resposta.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAgendar = async () => {
    try {
      await axios.post("/agendamento/create", {
        clienteId: selectedCliente,
        servicoId: selectedServico,
        horarioId: selectedHorario,
      });
      // Redirecionar para a página de agendamento após o novo agendamento
      navigate("/pagina-agendamento");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClientes();
    getServicos();
    getHorarios();
  }, []);

  return (
    <div className="formulario-agendamento">
      <h2>Agendar Novo</h2>
      <form>
        <div>
          <label htmlFor="cliente">Cliente:</label>
          <select
            id="cliente"
            value={selectedCliente}
            onChange={(e) => setSelectedCliente(e.target.value)}
          >
            <option value="">Selecione um cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nomeDono} - {cliente.nomeAnimal}
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
