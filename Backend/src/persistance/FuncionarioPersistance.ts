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

const deleteFuncionario = async (email: string) => {
    try {
        const userForDelete = await FuncionarioModel.findOne({
            where: { email: email },
        });
        if (!userForDelete) {
            throw new Error("User not found");
        }
        await userForDelete.destroy();
        return "User deleted successfully!";
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

const getFuncionario = async (username: string) => {
    try {
        const user = await FuncionarioModel.findOne({
            where: { username: username },
        });
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    } catch (error) {
        throw error;
    }
};

const updateFuncionario = async (updates: any) => {
    try {
        const user: any = await FuncionarioModel.findByPk(updates.id);
        if (!user) {
            throw new Error("User not found");
        }

        Object.keys(updates).forEach((key) => {
            user[key] = updates[key] !== undefined ? updates[key] : user[key];
        });

        await user.save();

        return user;
    } catch (error) {
        throw error;
    }
};
export default {
    createFuncionario,
    deleteFuncionario,
    findEmail,
    getFuncionario,
    updateFuncionario,
};
