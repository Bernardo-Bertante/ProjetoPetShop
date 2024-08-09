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
            secret: {
                type: Sequelize.STRING,
                allowNull: true,
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

        await queryInterface.createTable("Horario", {
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
            nomeDonoAgendamento: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Clientes",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            nomeAnimalAgendamento: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            especieAnimalAgendamento: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            tipoServicoAgendamento: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Servicos",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            horarioAgendamento: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Horario",
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

        // Inserir dados na tabela Horario
        await queryInterface.bulkInsert(
            "Horario",
            [
                {
                    horario: new Date("2024-08-09T15:30:00"),
                    disponibilidade: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("Agendamentos");
        await queryInterface.dropTable("Funcionarios");
        await queryInterface.dropTable("Clientes");
        await queryInterface.dropTable("Servicos");
        await queryInterface.dropTable("Horario");
    },
};
