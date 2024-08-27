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
            validate: {
                min: 0,
                isDecimal: {
                    msg: "O preço deve ser um número decimal válido.",
                },
                isNumber(value: any) {
                    if (typeof value !== "number" && isNaN(Number(value))) {
                        throw new Error("O preço deve ser um número válido.");
                    }
                },
            },
        },
        duracaoServico: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isIn: {
                    args: [[1, 2, 3, 4, 5]],
                    msg: "A duração do serviço deve ser entre 1 e 5 horas.",
                },
            },
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
