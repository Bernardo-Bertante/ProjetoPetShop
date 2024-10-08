// persistance/AgendamentoPersistance.ts
import { AgendamentoModel } from "../models/AgendamentoModel";
import { AgendamentoType } from "../types/AgendamentoType";
import { ClienteModel } from "../models/ClienteModel";
import { ServicoModel } from "../models/ServicoModel";
import { HorarioModel } from "../models/HorarioModel";
import { Transaction } from "sequelize";

// Adiciona a função updateHorarioDisponibilidade
const updateHorarioDisponibilidade = async (
    horarioId: number,
    disponibilidade: boolean,
    transaction?: Transaction // Adiciona a transação como argumento opcional
) => {
    try {
        await HorarioModel.update(
            { disponibilidade },
            { where: { id: horarioId }, transaction } // Passa a transação para o update
        );
    } catch (error: any) {
        throw new Error(
            `Erro ao atualizar disponibilidade do horário: ${error.message}`
        );
    }
};

// Adiciona a função createAgendamento
const createAgendamento = async (agendamento: AgendamentoType) => {
    try {
        await AgendamentoModel.sync();
        const result = await AgendamentoModel.create(agendamento);
        return result;
    } catch (error) {
        throw error;
    }
};

// Adiciona a função deleteAgendamento
const deleteAgendamento = async (
    id: number,
    options?: { transaction?: Transaction }
) => {
    try {
        const agendamento = await AgendamentoModel.findByPk(id);
        if (!agendamento) {
            throw new Error("Agendamento não encontrado.");
        }
        await agendamento.destroy(options); // Passa as opções para o método destroy
        return "Agendamento deletado com sucesso!";
    } catch (error) {
        throw error;
    }
};

// Adiciona a função getAgendamentos
const getAgendamentos = async () => {
    try {
        const agendamentos = await AgendamentoModel.findAll({
            include: [
                {
                    model: ClienteModel,
                    as: "cliente",
                    attributes: ["nomeDono", "nomeAnimal", "especieAnimal"], // Campos que você deseja retornar
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

// Adiciona a função updateAgendamento
const updateAgendamento = async (
    id: number,
    updates: Partial<AgendamentoType>,
    transaction?: Transaction
) => {
    try {
        const [updatedRows] = await AgendamentoModel.update(updates, {
            where: { id: id },
            returning: true, // Retorna o registro atualizado
            transaction // Passa a transação opcional
        });
        if (updatedRows === 0) {
            return null; // Nenhum registro atualizado
        }
        // Retorna o registro atualizado
        return AgendamentoModel.findByPk(id, { transaction });
    } catch (error) {
        throw error;
    }
};

// Adiciona a função getAgendamentoById
const getAgendamentoById = async (id: number) => {
    try {
        const agendamento = await AgendamentoModel.findByPk(id);
        return agendamento;
    } catch (error) {
        throw error;
    }
};

// Adiciona a função getHorarioById
const getHorarioById = async (horarioId: number) => {
    try {
        const horario = await HorarioModel.findByPk(horarioId, {
            attributes: ["id", "disponibilidade"], // Apenas os atributos necessários
        });
        return horario;
    } catch (error: any) {
        throw new Error(`Erro ao buscar horário: ${error.message}`);
    }
};

export default {
    createAgendamento,
    deleteAgendamento,
    getAgendamentos,
    updateAgendamento,
    updateHorarioDisponibilidade,
    getAgendamentoById,
    getHorarioById,
};
