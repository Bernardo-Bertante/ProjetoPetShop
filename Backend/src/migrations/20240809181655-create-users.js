"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Criação das tabelas
        await queryInterface.createTable("Funcionarios", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            nome: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            sobrenome: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            dataNascimento: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            cpf: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            telefone: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            isAdmin: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });

        await queryInterface.createTable("Clientes", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            nomeDono: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            sobrenomeDono: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            nomeAnimal: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            racaAnimal: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            especieAnimal: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            telefone: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: true,
                unique: true,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });

        await queryInterface.createTable("Servicos", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            tipoServico: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            preco: {
                type: Sequelize.DOUBLE,
                allowNull: false,
            },
            duracaoServico: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });

        await queryInterface.createTable("Horarios", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            horario: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            disponibilidade: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });

        await queryInterface.createTable("Agendamentos", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            clienteId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Clientes",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            servicoId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Servicos",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            horarioId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Horarios",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });

        // Inserir dados na tabela Horarios
        await queryInterface.bulkInsert(
            "Horarios",
            [
                {
                    horario: new Date("2024-08-09T15:30:00"),
                    disponibilidade: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    horario: new Date("2024-08-09T16:00:00"),
                    disponibilidade: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    horario: new Date("2024-08-09T16:30:00"),
                    disponibilidade: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    horario: new Date("2024-08-09T17:00:00"),
                    disponibilidade: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );

        // Inserir dados na tabela Funcionarios
        await queryInterface.bulkInsert(
            "Funcionarios",
            [
                {
                    nome: "Admin",
                    sobrenome: "Test",
                    dataNascimento: "1985-08-15",
                    cpf: "123.456.789-01",
                    password: "Senha@123",
                    telefone: "(11) 98765-4321",
                    email: "admin@example.com",
                    isAdmin: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    nome: "João",
                    sobrenome: "Silva",
                    dataNascimento: "1990-01-10",
                    cpf: "234.567.890-12",
                    password: "Senha@123",
                    telefone: "(11) 98765-4322",
                    email: "joao@example.com",
                    isAdmin: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    nome: "Maria",
                    sobrenome: "Oliveira",
                    dataNascimento: "1988-03-22",
                    cpf: "345.678.901-23",
                    password: "Senha@123",
                    telefone: "(11) 98765-4323",
                    email: "maria@example.com",
                    isAdmin: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );

        // Inserir dados na tabela Clientes
        await queryInterface.bulkInsert(
            "Clientes",
            [
                {
                    id: 1,
                    nomeDono: "Carlos",
                    sobrenomeDono: "Souza",
                    nomeAnimal: "Rex",
                    racaAnimal: "Labrador",
                    especieAnimal: "Cachorro",
                    telefone: "(11) 91234-5678",
                    email: "carlos@example.com",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: 2,
                    nomeDono: "Fernanda",
                    sobrenomeDono: "Lima",
                    nomeAnimal: "Mia",
                    racaAnimal: "Persa",
                    especieAnimal: "Gato",
                    telefone: "(11) 91234-5679",
                    email: "fernanda@example.com",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: 3,
                    nomeDono: "Rafael",
                    sobrenomeDono: "Almeida",
                    nomeAnimal: "Nina",
                    racaAnimal: "Poodle",
                    especieAnimal: "Cachorro",
                    telefone: "(11) 91234-5680",
                    email: "rafael@example.com",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );

        // Inserir dados na tabela Servicos
        await queryInterface.bulkInsert(
            "Servicos",
            [
                {
                    id: 1,
                    tipoServico: "Banho",
                    preco: 50.0,
                    duracaoServico: 60, // duração em minutos
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: 2,
                    tipoServico: "Tosa",
                    preco: 70.0,
                    duracaoServico: 90, // duração em minutos
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: 3,
                    tipoServico: "Consulta Veterinária",
                    preco: 150.0,
                    duracaoServico: 45, // duração em minutos
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );

        await queryInterface.sequelize.transaction(async (t) => {
            const [funcionarioMaxId] = await queryInterface.sequelize.query(
                'SELECT MAX(id) FROM "Funcionarios";',
                { transaction: t }
            );
            await queryInterface.sequelize.query(
                `ALTER SEQUENCE "Funcionarios_id_seq" RESTART WITH ${
                    funcionarioMaxId[0].max + 1
                };`,
                { transaction: t }
            );

            const [clienteMaxId] = await queryInterface.sequelize.query(
                'SELECT MAX(id) FROM "Clientes";',
                { transaction: t }
            );
            await queryInterface.sequelize.query(
                `ALTER SEQUENCE "Clientes_id_seq" RESTART WITH ${
                    clienteMaxId[0].max + 1
                };`,
                { transaction: t }
            );

            const [servicoMaxId] = await queryInterface.sequelize.query(
                'SELECT MAX(id) FROM "Servicos";',
                { transaction: t }
            );
            await queryInterface.sequelize.query(
                `ALTER SEQUENCE "Servicos_id_seq" RESTART WITH ${
                    servicoMaxId[0].max + 1
                };`,
                { transaction: t }
            );

            const [horarioMaxId] = await queryInterface.sequelize.query(
                'SELECT MAX(id) FROM "Horarios";',
                { transaction: t }
            );
            await queryInterface.sequelize.query(
                `ALTER SEQUENCE "Horarios_id_seq" RESTART WITH ${
                    horarioMaxId[0].max + 1
                };`,
                { transaction: t }
            );
        });
    },

    down: async (queryInterface, Sequelize) => {
        // Remoção das tabelas
        await queryInterface.dropTable("Agendamentos");
        await queryInterface.dropTable("Funcionarios");
        await queryInterface.dropTable("Clientes");
        await queryInterface.dropTable("Horarios");
        await queryInterface.dropTable("Servicos");
    },
};

// npx sequelize-cli db:migrate