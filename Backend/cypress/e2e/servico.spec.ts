// cypress/e2e/servico.spec.js

describe('Serviço', () => {
    beforeEach(() => {
      // Limpar e criar um novo serviço para cada teste
      cy.request('POST', 'http://localhost:5000/servico/create', {
        tipoServico: 'Serviço Teste',
        preco: 100.00,
        duracaoServico: '2',
      });
    });
  
    it('Deve criar um novo serviço', () => {
      cy.visit('/formulario-servico');
  
      cy.get('input[name="tipoServico"]').type('Novo Serviço');
      cy.get('input[name="preco"]').type('150.00');
      cy.get('select[name="duracaoServico"]').select('3');
      cy.get('button').contains('Cadastrar').click();
  
      cy.url().should('include', '/pagina-servico');
      cy.contains('Novo Serviço').should('be.visible');
    });
  
    it('Deve atualizar um serviço existente', () => {
      cy.visit('/pagina-servico');
  
      cy.get('button').contains('Atualizar').first().click();
      cy.get('input[name="tipoServico"]').clear().type('Serviço Atualizado');
      cy.get('input[name="preco"]').clear().type('200.00');
      cy.get('button').contains('Cadastrar').click();
  
      cy.url().should('include', '/pagina-servico');
      cy.contains('Serviço Atualizado').should('be.visible');
    });
  
    it('Deve deletar um serviço', () => {
      cy.visit('/pagina-servico');
  
      cy.get('button').contains('Excluir').first().click();
      cy.get('.caixa-aviso').should('be.visible');
      cy.get('button').contains('Confirmar').click();
  
      cy.contains('Serviço Teste').should('not.exist');
    });
  });
  