import { sequelize } from "../connections/Sequelize";
import { DataTypes, Model } from "sequelize";
import { ClienteModel } from "./ClienteModel";
import { ServicoModel } from "./ServicoModel";
import { HorarioModel } from "./HorarioModel";

class Agendamento extends Model {
    declare clienteId: number;
    declare servicoId: number;
    declare horarioId: number;
}

Agendamento.init(
    {
        clienteId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: ClienteModel,
                key: "id",
            },
        },
        servicoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: ServicoModel,
                key: "id",
            },
        },
        horarioId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: HorarioModel,
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

// Configuração das associações
Agendamento.belongsTo(ClienteModel, { foreignKey: "clienteId", as: "cliente" });
Agendamento.belongsTo(ServicoModel, { foreignKey: "servicoId", as: "servico" });
Agendamento.belongsTo(HorarioModel, { foreignKey: "horarioId", as: "horario" });

export { Agendamento as AgendamentoModel };
