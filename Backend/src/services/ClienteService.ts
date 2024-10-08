import { ClienteType } from "../types/ClienteType";
import ClientePersistance from "../persistance/ClientePersistance";

const createCliente = async (cliente: ClienteType) => {
    try {
        const result = await ClientePersistance.createCliente(cliente);
        return result;
    } catch (error) {
        throw error;
    }
};

const deleteCliente = async (id: string) => {
    try {
        const result = await ClientePersistance.deleteCliente(id);
        return result;
    } catch (error) {
        throw error;
    }
};


const getClientes = async () => {
    try {
        const clientes = await ClientePersistance.getClientes();
        return clientes;
    } catch (error) {
        throw error;
    }
};

const updateCliente = async (id: string, updates: any) => {
    try {
        const cliente = await ClientePersistance.updateCliente(id, updates);
        return cliente;
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
