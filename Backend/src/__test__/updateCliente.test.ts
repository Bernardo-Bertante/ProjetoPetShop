import ClienteService from '../services/ClienteService';
import ClientePersistance from '../persistance/ClientePersistance';

jest.mock('../persistance/ClientePersistance'); // Mock do ClientePersistance

describe('ClienteService', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Limpa todas as chamadas e instâncias de mocks antes de cada teste
    });

    describe('updateCliente', () => {
        it('deve atualizar os dados do cliente com sucesso', async () => {
            const mockId = 'valid-id';
            const mockUpdates = { nomeDono: 'Jane' };
            const mockUpdatedCliente = { id: mockId, ...mockUpdates };

            // Configura o mock para retornar o cliente atualizado
            (ClientePersistance.updateCliente as jest.Mock).mockResolvedValue(mockUpdatedCliente);

            const result = await ClienteService.updateCliente(mockId, mockUpdates);

            expect(result).toEqual(mockUpdatedCliente);
            expect(ClientePersistance.updateCliente).toHaveBeenCalledTimes(1);
            expect(ClientePersistance.updateCliente).toHaveBeenCalledWith(mockId, mockUpdates);
        });

        it('deve lançar um erro se o cliente não for encontrado ao atualizar', async () => {
            const mockId = 'non-existent-id';
            const mockUpdates = { nomeDono: 'Jane' };
            const mockError = new Error('Cliente não encontrado');

            // Configura o mock para lançar um erro
            (ClientePersistance.updateCliente as jest.Mock).mockRejectedValue(mockError);

            // Ajusta a mensagem esperada de acordo com a mensagem de erro lançada pelo mock
            await expect(ClienteService.updateCliente(mockId, mockUpdates)).rejects.toThrow('Cliente não encontrado');
            expect(ClientePersistance.updateCliente).toHaveBeenCalledTimes(1);
            expect(ClientePersistance.updateCliente).toHaveBeenCalledWith(mockId, mockUpdates);
        });
    });
});
