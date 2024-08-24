import { sequelize } from "../connections/Sequelize";
import { DataTypes, Model } from "sequelize";

class Cliente extends Model {
    declare nomeDono: string;
    declare sobrenomeDono: string;
    declare nomeAnimal: string;
    declare racaAnimal: string;
    declare especieAnimal: string;
    declare telefone: string;
    declare email: string | null;
}

Cliente.init(
    {
        nomeDono: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sobrenomeDono: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nomeAnimal: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        racaAnimal: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        especieAnimal: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        telefone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                is: {
                    args: /^\(\d{2}\) \d{5}-\d{4}$/,
                    msg: "O telefone deve ser válido",
                },
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
            validate: {
                isEmail: {
                    msg: "O email deve ser válido",
                },
            },
        },
    },
    {
        sequelize,
        modelName: "Cliente",
        tableName: "Clientes",
        schema: "public",
    }
);

export { Cliente as ClienteModel };
