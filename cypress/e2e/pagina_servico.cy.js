describe('Página de Serviços', () => {
  beforeEach(() => {
    // Visita a página de login e realiza o login
    cy.visit('/');
    cy.get('input[name="email"]', { timeout: 10000 }).should('be.visible').type('admin@example.com');
    cy.get('input[name="password"]').should('be.visible').type('Senha@123');
    cy.get('button[type="submit"]').should('be.visible').click();

    // Aguarda redirecionamento e confirma se o login foi bem-sucedido
    cy.wait(1000); // Ajuste o tempo conforme necessário
    cy.url({ timeout: 15000 }).should('include', '/pagina-principal');

    // Navega até a página de serviços
    cy.get('.buttons-principal').contains('Serviços').click();
    cy.url().should('include', '/pagina-servico');
  });

  it('Deve exibir a lista de serviços', () => {
    cy.get('.cards', { timeout: 10000 }).should('exist');
    cy.get('.card').should('have.length.greaterThan', 0);
  });

  it('Deve permitir a navegação para o formulário de serviço e cadastrar um serviço', () => {
    // Navega para o formulário de serviço
    cy.get('.btn-agendar').click();
    cy.url().should('include', '/formulario-servico');
    
    // Preenche o formulário
    cy.get('#tipoServico').type('Serviço Teste');
    cy.get('#preco').type('100.00');
    cy.get('#duracaoServico').select('2');
    
    // Submete o formulário
    cy.get('.button').click();

    // Verifica a navegação de volta para a página de serviços
    cy.url().should('include', '/pagina-servico');
    
    // Verifica se o serviço cadastrado aparece na lista
    cy.get('.cards').should('contain', 'Serviço Teste');
  });

  it('Deve permitir a exclusão de um serviço', () => {
    // Exclui um serviço
    cy.get('.btn-excluir').first().click();
    cy.get('.caixa-aviso').should('exist');
    cy.get('.caixa-aviso button').contains('Sim').click();

    // Verifica se o serviço foi excluído
    cy.get('.cards').should('not.contain', 'Serviço excluído com sucesso');
  });
});
