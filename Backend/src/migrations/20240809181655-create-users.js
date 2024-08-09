"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
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
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("Funcionarios");
        await queryInterface.dropTable("Clientes");
        await queryInterface.dropTable("Servicos");
        await queryInterface.dropTable("Horario");
    },
};
