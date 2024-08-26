describe('Serviço', () => {
  before(() => {
    // Realizar login e garantir que a sessão está sendo criada corretamente
    cy.request({
      method: 'POST',
      url: 'http://localhost:5000/login',
      body: {
        email: 'admin@example.com',
        password: 'Senha@123',
      },
      failOnStatusCode: false,
      form: true,
    }).then((response) => {
      cy.getCookie('connect.sid')
        .should('exist')
        .then((cookie) => {
          Cypress.env('SESSION_COOKIE', cookie.value); // Salvar cookie de sessão para uso nos testes
        });
    });
  });

  it('deve criar um serviço com sucesso', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:5000/servico/create',
      body: {
        tipoServico: 'Serviço Teste',
        preco: 100,
        duracaoServico: '2',
      },
      failOnStatusCode: false,
      headers: {
        'Cookie': `connect.sid=${Cypress.env('SESSION_COOKIE')}` // Usar o cookie de sessão salvo
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      Cypress.env('SERVICE_ID', response.body.servico.id); // Salvar ID do serviço criado para testes subsequentes
    });
  });

  it('deve atualizar um serviço com sucesso', () => {
    const serviceId = Cypress.env('SERVICE_ID'); // Obter o ID salvo

    cy.request({
      method: 'PUT',
      url: `http://localhost:5000/servico/update/${serviceId}`, // Usar o ID correto
      body: {
        tipoServico: 'Serviço Atualizado',
        preco: 150,
        duracaoServico: '3',
      },
      failOnStatusCode: false,
      headers: {
        'Cookie': `connect.sid=${Cypress.env('SESSION_COOKIE')}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('deve deletar um serviço com sucesso', () => {
    const serviceId = Cypress.env('SERVICE_ID'); // Obter o ID salvo

    cy.request({
      method: 'DELETE',
      url: `http://localhost:5000/servico/delete/${serviceId}`, // Usar o ID correto
      failOnStatusCode: false,
      headers: {
        'Cookie': `connect.sid=${Cypress.env('SESSION_COOKIE')}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
