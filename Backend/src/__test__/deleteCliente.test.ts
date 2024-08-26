import ClienteService from '../services/ClienteService';
import ClientePersistance from '../persistance/ClientePersistance';

jest.mock('../persistance/ClientePersistance'); // Mock do ClientePersistance

describe('ClienteService', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Limpa todas as chamadas e instâncias de mocks antes de cada teste
    });

    describe('deleteCliente', () => {
        it('deve deletar um cliente com sucesso', async () => {
            const mockId = 'valid-id';
            const mockSuccessMessage = 'Cliente deletado com sucesso!';

            // Configura o mock para retornar a mensagem de sucesso
            (ClientePersistance.deleteCliente as jest.Mock).mockResolvedValue(mockSuccessMessage);

            const result = await ClienteService.deleteCliente(mockId);

            expect(result).toBe(mockSuccessMessage);
            expect(ClientePersistance.deleteCliente).toHaveBeenCalledTimes(1);
            expect(ClientePersistance.deleteCliente).toHaveBeenCalledWith(mockId);
        });

        it('deve lançar um erro se o cliente não for encontrado ao deletar', async () => {
            const mockId = 'non-existent-id';
            const mockError = new Error('Cliente não encontrado');

            // Configura o mock para lançar um erro
            (ClientePersistance.deleteCliente as jest.Mock).mockRejectedValue(mockError);

            await expect(ClienteService.deleteCliente(mockId)).rejects.toThrow('Cliente não encontrado');
            expect(ClientePersistance.deleteCliente).toHaveBeenCalledTimes(1);
            expect(ClientePersistance.deleteCliente).toHaveBeenCalledWith(mockId);
        });
    });
});
