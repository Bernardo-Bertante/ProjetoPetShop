import { ServicoModel } from "../models/ServicoModel";
import { ServicoType } from "../types/ServicoType";

const createServico = async (cliente: ServicoType) => {
    try {
        await ServicoModel.sync();
        const result = await ServicoModel.create(cliente);
        return result;
    } catch (error) {
        throw error;
    }
};

const deleteServico = async (email: string) => {
    try {
        const clienteForDelete = await ServicoModel.findOne({
            where: { email: email },
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

const getServicos = async () => {
    try {
        const servicos = await ServicoModel.findAll(); // Busca todos os clientes
        return servicos;
    } catch (error) {
        throw error;
    }
};

const updateServico = async (id: string, updates: any) => {
    try {
        const [updatedRows] = await ServicoModel.update(updates, {
            where: { id: id },
            returning: true, // Retorna o registro atualizado
        });
        if (updatedRows === 0) {
            return null; // Nenhum registro atualizado
        }
        // Retorna o registro atualizado
        return ServicoModel.findOne({ where: { id } });
    } catch (error) {
        throw error;
    }
};

export default {
    createServico,
    deleteServico,
    getServicos,
    updateServico,
};
