import { FuncionarioModel } from "../models/FuncionarioModel";
import { FuncionarioType } from "../types/FuncionarioType";

const createFuncionario = async (user: FuncionarioType) => {
    try {
        await FuncionarioModel.sync();
        await FuncionarioModel.create(user);

        return user;
    } catch (error) {
        throw error;
    }
};

const deleteFuncionario = async (id: string) => {
    try {
        const userForDelete = await FuncionarioModel.findOne({
            where: { id: id },
        });
        if (!userForDelete) {
            throw new Error("Funcionário não encontrado.");
        }
        await userForDelete.destroy();
        return "Funcionário deletado com sucesso!";
    } catch (error) {
        throw error;
    }
};
//d
const findEmail = async (email: string) => {
    try {
        const operationResult = await FuncionarioModel.findOne({
            where: { email: email },
        });
        if (!operationResult) {
            throw new Error("User not found");
        }
        operationResult.save();
        return operationResult;
    } catch (error) {
        throw error;
    }
};

const getFuncionarios = async () => {
    try {
        const users = await FuncionarioModel.findAll(); // Busca todos os funcionários
        return users;
    } catch (error) {
        throw error;
    }
};

const updateFuncionario = async (id: string, updates: any) => {
    try {
        const [updatedRows] = await FuncionarioModel.update(updates, {
            where: { id: id },
            returning: true, // Retorna o registro atualizado
        });
        if (updatedRows === 0) {
            return null; // Nenhum registro atualizado
        }
        // Retorna o registro atualizado
        return FuncionarioModel.findOne({ where: { id } });
    } catch (error) {
        throw error;
    }
};

export default {
    createFuncionario,
    deleteFuncionario,
    findEmail,
    getFuncionarios,
    updateFuncionario,
};
