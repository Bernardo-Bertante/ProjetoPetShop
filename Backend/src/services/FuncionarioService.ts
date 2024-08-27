import { FuncionarioType } from "../types/FuncionarioType";
import FuncionarioPersistance from "../persistance/FuncionarioPersistance";

const createFuncionario = async (user: FuncionarioType) => {
    try {
        const result = await FuncionarioPersistance.createFuncionario(user);
        return result;
    } catch (error) {
        throw error;
    }
};

const deleteFuncionario = async (id: string) => {
    try {
        const result = await FuncionarioPersistance.deleteFuncionario(id);
        return result;
    } catch (error) {
        throw error;
    }
};

const getFuncionarios = async () => {
    try {
        const users = await FuncionarioPersistance.getFuncionarios();
        return users;
    } catch (error) {
        throw error;
    }
};

const updateFuncionario = async (id: string, updates: any) => {
    try {
        const user = await FuncionarioPersistance.updateFuncionario(
            id,
            updates
        );
        return user;
    } catch (error) {
        throw error;
    }
};

export default {
    createFuncionario,
    deleteFuncionario,
    getFuncionarios,
    updateFuncionario,
};
