// services/AgendamentoService.ts
import AgendamentoPersistance from "../persistance/AgendamentoPersistance";
import { AgendamentoType } from "../types/AgendamentoType";
import { sequelize } from "../connections/Sequelize";

const createAgendamento = async (agendamento: AgendamentoType) => {
    try {
        // Verifica se o horário está disponível
        const horario = await AgendamentoPersistance.getHorarioById(
            agendamento.horarioId
        );
        if (!horario || !horario.disponibilidade) {
            throw new Error("Horário indisponível para agendamento.");
        }

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
    const transaction = await sequelize.transaction();

    try {
        // Obtenha o agendamento atual
        const currentAgendamento = await AgendamentoPersistance.getAgendamentoById(id);
        if (!currentAgendamento) {
            throw new Error("Agendamento não encontrado.");
        }

        // Se o horário foi alterado, atualize a disponibilidade dos horários
        if (updates.horarioId && updates.horarioId !== currentAgendamento.horarioId) {
            // Atualiza a disponibilidade do horário antigo
            await AgendamentoPersistance.updateHorarioDisponibilidade(
                currentAgendamento.horarioId,
                true,
                transaction
            );

            // Atualiza a disponibilidade do novo horário
            await AgendamentoPersistance.updateHorarioDisponibilidade(
                updates.horarioId,
                false,
                transaction
            );
        }

        // Atualiza o agendamento
        const updatedAgendamento = await AgendamentoPersistance.updateAgendamento(id, updates, transaction);

        await transaction.commit();
        return updatedAgendamento;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};


export default {
    createAgendamento,
    deleteAgendamento,
    getAgendamentos,
    updateAgendamento,
};
