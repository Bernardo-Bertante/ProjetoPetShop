import { ClienteModel } from "../models/ClienteModel";
import { ClienteType } from "../types/ClienteType";

const createCliente = async (cliente: ClienteType) => {
    try {
        await ClienteModel.sync();
        const result = await ClienteModel.create(cliente);
        return result;
    } catch (error) {
        throw error;
    }
};

const deleteCliente = async (id: string) => {
    try {
        const clienteForDelete = await ClienteModel.findOne({
            where: { id: id },
        });
        if (!clienteForDelete) {
            throw new Error("Cliente não encontrado.");
        }
        await clienteForDelete.destroy();
        return "Cliente deletado com sucesso!";
    } catch (error) {
        throw error;
    }
};

const getClientes = async () => {
    try {
        const clientes = await ClienteModel.findAll(); // Busca todos os clientes
        return clientes;
    } catch (error) {
        throw error;
    }
};

const updateCliente = async (id: string, updates: any) => {
    try {
        const [updatedRows] = await ClienteModel.update(updates, {
            where: { id: id },
            returning: true, // Retorna o registro atualizado
        });
        if (updatedRows === 0) {
            return null; // Nenhum registro atualizado
        }
        // Retorna o registro atualizado
        return ClienteModel.findOne({ where: { id } });
    } catch (error) {
        throw error;
    }
};

export default {
    createCliente,
    deleteCliente,
    getClientes,
    updateCliente,
};
