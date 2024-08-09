import { sequelize } from "../connections/Sequelize";
import { DataTypes, Model } from "sequelize";

class Agendamento extends Model {
    declare nomeDonoAgendamento: number; // ID do Cliente
    declare nomeAnimalAgendamento: number; // ID do Cliente
    declare especieAnimalAgendamento: number; // ID do Cliente
    declare tipoServicoAgendamento: number; // ID do Serviço
    declare horarioAgendamento: number; // ID do Horário
}

Agendamento.init(
    {
        nomeDonoAgendamento: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Clientes",
                key: "id",
            },
        },
        nomeAnimalAgendamento: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Clientes",
                key: "id",
            },
        },
        especieAnimalAgendamento: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Clientes",
                key: "id",
            },
        },
        tipoServicoAgendamento: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Servicos",
                key: "id",
            },
        },
        horarioAgendamento: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Horarios",
                key: "id",
            },
        },
    },
    {
        sequelize,
        modelName: "Agendamento",
        tableName: "Agendamentos",
        schema: "public",
    }
);

export { Agendamento as AgendamentoModel };
