import { sequelize } from "../connections/Sequelize";
import { DataTypes, Model } from "sequelize";

class Horario extends Model {
    declare horario: Date;
    declare disponibilidade: boolean;
}

Horario.init(
    {
        horario: {
            type: DataTypes.DATE,
            allowNull: false,
            unique: true,
            validate: {
                isDate: {
                    args: true,
                    msg: "A data de nascimento deve ser válida",
                },
            },
        },
        disponibilidade: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Horario",
        tableName: "Horarios",
        schema: "public",
    }
);

export { Horario as HorarioModel };
