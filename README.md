# ProjetoPetShop
![Imagem](./TabelaUML.drawio.svg)

## Visão Geral do Produto

### Descrição do Sistema
O objetivo do software é gerenciar o sistema interno de serviços de um Pet Shop (Loja de serviços para Animais). Ele facilita a administração e o controle dos serviços oferecidos pelo Pet Shop, permitindo um gerenciamento eficiente dos funcionários, clientes, pets, serviços e agendamentos.

### Principais Funcionalidades
1. **Administração de Funcionários**: 
   - Cadastrar, excluir, alterar e consultar os dados dos funcionários.
2. **Gerenciamento de Clientes e Pets**:
   - Cadastrar, excluir, alterar e consultar os clientes e seus respectivos pets.
3. **Gestão de Serviços**:
   - Cadastrar, excluir, alterar e consultar diferentes serviços ofertados pelo Pet Shop.
4. **Agendamentos**:
   - Gerenciar o agendamento de serviços contratados pelos clientes.

### Sistemas Relacionados
O sistema é independente e totalmente auto-contido, não necessitando interagir com outros sistemas.

### Tipos de Usuários
1. **Admin**: 
   - Responsável pela administração completa do sistema, incluindo gerenciamento de clientes, funcionários, agendamentos e serviços.
2. **Funcionário**: 
   - Gerencia clientes, serviços e agendamentos relacionados aos pets dos clientes.

### Estrutura de Diretório do Projeto
Uma possível estrutura do projeto, visto que ainda não temos tudo definido:

```
/project-root
│   README.md
│   package.json
│
├───/src
│   ├───/controllers
│   ├───/models
│   ├───/routes
│   ├───/services
│   ├───/repositories
│   └───/config
│
├───/public
│   ├───/images
│
└───/test
    ├───/unit
    └───/integration
```
