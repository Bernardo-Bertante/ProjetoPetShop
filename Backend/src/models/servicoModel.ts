import { sequelize } from "../connections/Sequelize";
import { DataTypes, Model } from "sequelize";

class Servico extends Model {
    declare tipoServico: string;
    declare preco: number;
    declare duracaoServico: number;
}

Servico.init(
    {
        tipoServico: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        preco: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        duracaoServico: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Servico",
        tableName: "Servicos",
        schema: "public",
    }
);

export { Servico as ServicoModel };
