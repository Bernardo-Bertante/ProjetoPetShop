# ProjetoPetShop
![Imagem](./TabelaUML.drawio.svg)

## Visão Geral do Produto

### Descrição do Sistema
O objetivo do software é gerenciar o sistema interno de serviços de um Pet Shop (Loja de serviços para Animais). Ele facilita a administração e o controle dos serviços oferecidos pelo Pet Shop, permitindo um gerenciamento eficiente dos funcionários, clientes, pets, serviços e agendamentos.

### Tecnologias Utilizadas
- **IDE: Visual Studio Code**
- **TypeScript: 5.5**
- **JavaScript: ES2016**
- **PostgreSQL: 16.0**
- **Node.js: v20.15.0**

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
│  
├───/Padrões Adotados
│   └───Regras de Verificação e Analise de Requisitos.md
│
├───/Requisitos
│   ├───Diagrama de Classes.drawio.png
│   ├───Diagrama de Pacotes.drawio.png
│   ├───Diagrama de Sequência.drawio
│   └───DocumentoRequisitos.docx
│
│   README.md
│   TabelaUML.drawio
|   TabelaUML.drawio.svg
```

## Requisitos Funcionais (Casos de Uso)


### [RF001] Cadastrar Agendamento
Permite aos funcionários registrar novos agendamentos no sistema, especificando detalhes como data, hora, cliente, e serviço a ser realizado.

### [RF002] Consultar Agendamento
Permite aos funcionários visualizar os agendamentos registrados no sistema.

### [RF003] Atualizar Agendamento
Permite aos funcionários modificar os detalhes de agendamentos já cadastrados, como data, hora, cliente, e serviço.

### [RF004] Excluir Agendamento
Permite aos funcionários remover agendamentos do sistema, caso seja necessário cancelar ou apagar um agendamento.

### [RF005] Cadastrar Serviço
Permite aos funcionários adicionar novos serviços oferecidos pela empresa ao sistema, especificando detalhes como nome, descrição, e preço.

### [RF006] Consultar Serviço
Permite aos funcionários visualizar os serviços cadastrados no sistema.

### [RF007] Atualizar Serviço
Permite aos funcionários alterar os detalhes dos serviços já cadastrados, como nome, descrição, e preço.

### [RF008] Excluir Serviço
Permite aos funcionários remover serviços do sistema, caso não sejam mais oferecidos ou precisem ser apagados.

### [RF009] Cadastrar Cliente
Permite aos funcionários registrar novos clientes no sistema, inserindo informações como nome, contato, e histórico de atendimentos.

### [RF010] Consultar Cliente
Permite aos funcionários visualizar os clientes cadastrados no sistema.

### [RF011] Atualizar Cliente
Permite aos funcionários modificar os dados dos clientes já cadastrados, como nome, contato, e outras informações pessoais.

### [RF012] Excluir Cliente
Permite aos funcionários remover clientes do sistema, caso seja necessário apagar os dados ou desativar um cliente.

### [RF013] Cadastrar Funcionário
Permite aos administradores registrar novos funcionários no sistema, inserindo informações como nome, cargo, e contato.

### [RF014] Consultar Funcionário
Permite aos administradores visualizar os funcionários cadastrados no sistema.

### [RF015] Atualizar Funcionário
Permite aos administradores alterar os dados dos funcionários já cadastrados, como nome, cargo, e informações de contato.

### [RF016] Excluir Funcionário
Permite aos administradores remover funcionários do sistema, caso seja necessário desligar ou apagar os dados de um funcionário.


## Requisitos Não Funcionais 


### [RNF001] Responsividade e Acessibilidade
O sistema deve ser responsivo e acessível em dispositivos móveis, tablets e desktops, garantindo uma boa experiência de uso em diferentes tamanhos de tela.

### [RNF002] Tolerância a Falhas
O sistema deve ser capaz de detectar e recuperar-se automaticamente de falhas sem intervenção do usuário, garantindo que o tempo de inatividade não exceda 1 minuto por mês.

### [RNF003] Capacidade de Acesso Simultâneo
O sistema deve ser capaz de suportar até 1000 acessos simultâneos de usuários sem degradação perceptível de desempenho.

### [RNF004] Criptografia de Comunicações
Todas as comunicações entre o cliente e o servidor devem ser criptografadas utilizando HTTPS.

