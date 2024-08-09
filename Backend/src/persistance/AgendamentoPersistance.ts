// persistance/AgendamentoPersistance.ts
import { AgendamentoModel } from "../models/AgendamentoModel";
import { AgendamentoType } from "../types/AgendamentoType";

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
        const agendamentos = await AgendamentoModel.findAll();
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

export default {
    createAgendamento,
    deleteAgendamento,
    getAgendamentos,
    updateAgendamento,
};
