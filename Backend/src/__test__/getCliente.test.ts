import ClienteService from '../services/ClienteService';
import ClientePersistance from '../persistance/ClientePersistance';

jest.mock('../persistance/ClientePersistance'); // Mock do ClientePersistance

describe('ClienteService', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Limpa todas as chamadas e instâncias de mocks antes de cada teste
    });

    describe('getClientes', () => {
        it('deve retornar uma lista de clientes', async () => {
            const mockClientes = [
                { id: '1', nomeDono: 'John', sobrenomeDono: 'Doe', email: 'john@example.com' },
                { id: '2', nomeDono: 'Jane', sobrenomeDono: 'Doe', email: 'jane@example.com' }
            ];

            // Configura o mock para retornar os clientes mockados
            (ClientePersistance.getClientes as jest.Mock).mockResolvedValue(mockClientes);

            const result = await ClienteService.getClientes();

            expect(result).toEqual(mockClientes);
            expect(ClientePersistance.getClientes).toHaveBeenCalledTimes(1);
        });

        it('deve lançar um erro se ocorrer um problema ao buscar os clientes', async () => {
            const mockError = new Error('Erro ao buscar clientes');

            // Configura o mock para lançar um erro
            (ClientePersistance.getClientes as jest.Mock).mockRejectedValue(mockError);

            // Verifica se a chamada do método lança o erro esperado
            await expect(ClienteService.getClientes()).rejects.toThrow('Erro ao buscar clientes');
            expect(ClientePersistance.getClientes).toHaveBeenCalledTimes(1);
        });
    });
});
