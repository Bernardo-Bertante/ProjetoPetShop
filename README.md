# ProjetoPetShop
![Imagem](./TabelaUML.drawio.svg)

## Visão Geral do Produto

### Descrição do Sistema
O objetivo do software é gerenciar o sistema interno de serviços de um Pet Shop (Loja de serviços para Animais). Ele facilita a administração e o controle dos serviços oferecidos pelo Pet Shop, permitindo um gerenciamento eficiente dos funcionários, clientes, pets, serviços e agendamentos.

### Tecnologias Utilizadas
- **IDE: Visual Studio Code 1.92** 
- **TypeScript: 5.5**
- **JavaScript: ES2016**
- **PostgreSQL: 16.0**
- **Node.js: v20.16.0**

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
/ProjetoPetShop
├───/Backend
│   ├───config/
│   │   └───config.json
│   ├───models/
│   │   └───index.js
│   ├───src/
│   │   ├───connections/
│   │   │   ├───Connection.ts
│   │   │   └───Sequelize.ts
│   │   ├───controllers/
│   │   │   ├───AgendamentoController.ts
│   │   │   ├───ClienteController.ts
│   │   │   ├───FuncionarioController.ts
│   │   │   ├───HorarioController.ts
│   │   │   ├───LoginController.ts
│   │   │   └───ServicoController.ts
│   │   ├───middleware/
│   │   │   ├───ensureAdmin.ts
│   │   │   ├───ensureAuthenticated.ts
│   │   │   └───errorHandler.ts
│   │   ├───migrations/
│   │   │   └───20240809181655-create-users.js
│   │   ├───models/
│   │   │   ├───AgendamentoModel.ts
│   │   │   ├───clienteModel.ts
│   │   │   ├───funcionarioModel.ts
│   │   │   ├───horarioModel.ts
│   │   │   └───servicoModel.ts
│   │   ├───ModelsSequelize/
│   │   │   └───index.js
│   │   ├───persistance/
│   │   │   ├───AgendamentoPersistance.ts
│   │   │   ├───ClientePersistance.ts
│   │   │   ├───FuncionarioPersistance.ts
│   │   │   ├───HorarioPersistance.ts
│   │   │   └───ServicoPersistance.ts
│   │   ├───routes/
│   │   │   ├───AdminRouter.ts
│   │   │   ├───AgendamentoRouter.ts
│   │   │   ├───ClienteRouter.ts
│   │   │   ├───HorarioRouter.ts
│   │   │   ├───LoginRouter.ts
│   │   │   └───ServicoRouter.ts
│   │   ├───services/
│   │   │   ├───AgendamentoService.ts
│   │   │   ├───ClienteService.ts
│   │   │   ├───FuncionarioService.ts
│   │   │   ├───HorarioService.ts
│   │   │   └───ServicoService.ts
│   │   ├───types/
│   │   │   ├───AgendamentoType.ts
│   │   │   ├───clienteType.ts
│   │   │   ├───funcionarioType.ts
│   │   │   ├───horarioType.ts
│   │   │   └───servicoType.ts
│   │   ├───utils/
│   │   │   └───passport.ts
│   │   ├───app.ts
│   │   └───index.ts
│   ├───.prettierrc.json
│   ├───.sequelizerc
│   ├───jest.config.ts
│   ├───package-lock.json
│   ├───package.json
│   └───tsconfig.json
│  
├───/Padrões Adotados
│   └───Regras de Verificação e Analise de Requisitos.md
│
├───/projetopetshop
│   ├───public/
│   │   └───img/
│   │       ├───eye-blocked.png
│   │       ├───eye-open.png
│   │       ├───papel_parede_patas.jpg
│   │       ├───seta.svg
│   │       └───triangulo-atencao.svg
│   ├───src/
│   │   ├───assets/
│   │   │   └───react.svg
│   │   ├───components/
│   │   │   ├───CaixaAviso_Cliente.jsx
│   │   │   ├───CaixaAviso.css
│   │   │   └───CaixaAviso.jsx
│   │   ├───contexts/
│   │   │   └───UserContext.jsx
│   │   ├───pages/
│   │   │   ├───FormularioAgendamento.css
│   │   │   ├───FormularioAgendamento.jsx
│   │   │   ├───FormularioCliente.jsx
│   │   │   ├───Pagina_Agendamento.css
│   │   │   ├───Pagina_Agendamento.jsx
│   │   │   ├───Pagina_Atualizar_Cliente.jsx
│   │   │   ├───Pagina_Atualizar.jsx
│   │   │   ├───Pagina_Cliente.jsx
│   │   │   ├───Pagina_Login.css
│   │   │   ├───Pagina_Login.jsx
│   │   │   ├───Pagina_Cliente.jsx
│   │   │   ├───Pagina_Principal.css
│   │   │   └───Pagina_Principal.jsx
│   │   ├───App.css
│   │   ├───App.jsx
│   │   ├───index.css
│   │   └───main.jsx
│   ├───.gitignore
│   ├───axiosConfig.jsx
│   ├───eslint.config.js
│   ├───index.html
│   ├───package-lock.json
│   ├───package.json
│   ├───README.md
│   └───vite.config.js
|
├───/Requisitos
│   ├───Diagrama de Sequência/
│   │   ├───Atualizar Agendamento.png
│   │   ├───Atualizar Cliente.png
│   │   ├───Atualizar Funcionário.png
│   │   ├───Atualizar Serviço.png
│   │   ├───Cadastrar Agendamento.png
│   │   ├───Cadastrar Cliente.png
│   │   ├───Cadastrar Funcionário.png
│   │   ├───Cadastrar Serviço.png
│   │   ├───Consultar Agendamento.png
│   │   ├───Consultar Cliente.png
│   │   ├───Consultar Funcionário.png
│   │   ├───Consultar Serviço.png
│   │   ├───Excluir Agendamento.png
│   │   ├───Excluir Agendamento.png
│   │   ├───Excluir Cliente.png
│   │   ├───Excluir Funcionário.png
│   │   └───Excluir Serviço.png
│   ├───Diagrama de Classes.drawio.png
│   ├───Diagrama de Pacotes.drawio.png
│   ├───Diagrama de Sequência.drawio
│   └───DocumentoRequisitos.docx
|
│   .gitignore
│   package-lock.json
│   README.md
│   TabelaUML.drawio
|   TabelaUML.drawio.svg
|   TabelaUML.png

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
O sistema deve ser responsivo e acessível em dispositivos desktop, garantindo uma boa experiência de uso em telas Full HD.

### [RNF002] Tolerância a Falhas
O sistema deve ser capaz de detectar e recuperar-se automaticamente de falhas de software e falhas de rede temporárias, sem intervenção do usuário, garantindo que o tempo de inatividade não exceda 1 minuto por mês.

### [RNF003] Capacidade de Acesso Simultâneo
O sistema deve ser capaz de suportar até 1000 acessos simultâneos de usuários sem degradação de 30% de desempenho.

### [RNF004] Criptografia de Comunicações
Todas as comunicações entre o cliente e o servidor devem ser criptografadas utilizando HTTPS.

# Regras de Clean Code

- **Funções Pequenas e Coesas**: Cada função deve fazer apenas uma coisa.

- **Evite Código Duplicado**: Reutilize funções para evitar duplicação.

- **Separe a Lógica de Negócio da Infraestrutura**: Mantenha a lógica de negócio separada da infraestrutura. Utilize interfaces e injeção de dependências para facilitar a manutenção e os testes.

- **Nomes Claros e Descritivos**: Use nomes que expliquem a intenção.

- **Use Objetos para Agrupar Parâmetros Relacionados**: Torne as funções mais fáceis de chamar e entender.

- **Controle o Fluxo de Forma Clara e Linear**: Evite condicionais aninhadas complexas. Mantenha funções curtas e com responsabilidades únicas.

# Mensagens de Commit

- Mensagens curtas e descritivas.

- Utilizar um prefixo que indique o tipo de mudança:

## Regras de Commit

- **feat**: Implementação de uma nova funcionalidade.
- **fix**: Correção de um problema ou erro.
- **docs**: Alterações na documentação.
- **style**: Ajustes de formatação que não afetam a lógica do código (espaços, formatação, pontuação, etc).
- **refactor**: Modificações no código que não envolvem correções de bugs ou novas funcionalidades.
- **test**: Inclusão ou atualização de testes.
- **chore**: Alterações na configuração do projeto ou tarefas de manutenção e suporte.


