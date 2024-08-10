// services/AgendamentoService.ts
import AgendamentoPersistance from "../persistance/AgendamentoPersistance";
import { AgendamentoType } from "../types/AgendamentoType";
import { sequelize } from "../connections/Sequelize";

const createAgendamento = async (agendamento: AgendamentoType) => {
    try {
        // Criação do agendamento
        const result = await AgendamentoPersistance.createAgendamento(
            agendamento
        );

        // Atualização da disponibilidade do horário
        await AgendamentoPersistance.updateHorarioDisponibilidade(
            agendamento.horarioId,
            false
        );

        return result;
    } catch (error) {
        throw error;
    }
};

const deleteAgendamento = async (id: number) => {
    const transaction = await sequelize.transaction();

    try {
        const agendamento = await AgendamentoPersistance.getAgendamentoById(id);
        if (!agendamento) {
            throw new Error("Agendamento não encontrado.");
        }

        await AgendamentoPersistance.updateHorarioDisponibilidade(
            agendamento.horarioId,
            true,
            transaction // Passa a transação aqui
        );

        const result = await AgendamentoPersistance.deleteAgendamento(id, {
            transaction,
        });

        await transaction.commit();
        return result;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

const getAgendamentos = async () => {
    try {
        const agendamentos = await AgendamentoPersistance.getAgendamentos();
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
        const agendamento = await AgendamentoPersistance.updateAgendamento(
            id,
            updates
        );
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
};
