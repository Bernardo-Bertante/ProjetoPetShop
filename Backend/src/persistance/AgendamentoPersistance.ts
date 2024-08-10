// persistance/AgendamentoPersistance.ts
import { AgendamentoModel } from "../models/AgendamentoModel";
import { AgendamentoType } from "../types/AgendamentoType";
import { ClienteModel } from "../models/ClienteModel";
import { ServicoModel } from "../models/ServicoModel";
import { HorarioModel } from "../models/HorarioModel";

const updateHorarioDisponibilidade = async (
    horarioId: number,
    disponibilidade: boolean
) => {
    try {
        await HorarioModel.update(
            { disponibilidade },
            { where: { id: horarioId } }
        );
    } catch (error: any) {
        throw new Error(
            `Erro ao atualizar disponibilidade do horário: ${error.message}`
        );
    }
};

const createAgendamento = async (agendamento: AgendamentoType) => {
    try {
        await AgendamentoModel.sync();
        const result = await AgendamentoModel.create(agendamento);
        return result;
    } catch (error) {
        throw error;
    }
};

const deleteAgendamento = async (id: number) => {
    try {
        const agendamentoForDelete = await AgendamentoModel.findByPk(id);
        if (!agendamentoForDelete) {
            throw new Error("Agendamento não encontrado.");
        }
        await agendamentoForDelete.destroy();
        return "Agendamento deletado com sucesso!";
    } catch (error) {
        throw error;
    }
};

const getAgendamentos = async () => {
    try {
        const agendamentos = await AgendamentoModel.findAll({
            include: [
                {
                    model: ClienteModel,
                    as: "cliente",
                    attributes: ["nomeDono", "nomeAnimal"], // Campos que você deseja retornar
                },
                {
                    model: ServicoModel,
                    as: "servico",
                    attributes: ["tipoServico"],
                },
                {
                    model: HorarioModel,
                    as: "horario",
                    attributes: ["horario"],
                },
            ],
        });
        return agendamentos;
    } catch (error) {
        throw error;
    }
};

const updateAgendamento = async (
    id: number,
    updates: Partial<AgendamentoType>
) => {
    try {
        const [updatedRows] = await AgendamentoModel.update(updates, {
            where: { id: id },
            returning: true, // Retorna o registro atualizado
        });
        if (updatedRows === 0) {
            return null; // Nenhum registro atualizado
        }
        // Retorna o registro atualizado
        return AgendamentoModel.findByPk(id);
    } catch (error) {
        throw error;
    }
};

const getAgendamentoById = async (id: number) => {
    try {
        const agendamento = await AgendamentoModel.findByPk(id);
        return agendamento;
    } catch (error) {
        throw error;
    }
};

export default {
    createAgendamento,
    deleteAgendamento,
    getAgendamentos,
    updateAgendamento,
    updateHorarioDisponibilidade,
    getAgendamentoById,
};
