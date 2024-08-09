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

const deleteFuncionario = async (email: string) => {
    try {
        const result = await FuncionarioPersistance.deleteFuncionario(email);
        return result;
    } catch (error) {
        throw error;
    }
};

const findByEmail = async (email: string) => {
    try {
        const result = await FuncionarioPersistance.findEmail(email);
        return result;
    } catch (error) {
        throw error;
    }
};
const getFuncionario = async (username: string) => {
    try {
        const user = await FuncionarioPersistance.getFuncionario(username);
        return user;
    } catch (error) {
        throw error;
    }
};
//d
const updateFuncionario = async (updates: any) => {
    try {
        const user = await FuncionarioPersistance.updateFuncionario(updates);
        return user;
    } catch (error) {
        throw error;
    }
};
export default {
    createFuncionario,
    deleteFuncionario,
    findByEmail,
    getFuncionario,
    updateFuncionario,
};
