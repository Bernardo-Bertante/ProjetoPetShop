import { sequelize } from "../connections/Sequelize";
import { DataTypes, Model } from "sequelize";
import PasswordValidator from "password-validator";

const passwordSchema = new PasswordValidator();
passwordSchema
    .is()
    .min(8)
    .is()
    .max(30)
    .has()
    .uppercase(1)
    .has()
    .lowercase()
    .has()
    .not()
    .spaces()
    .has()
    .symbols(1)
    .has()
    .digits(1);

class Funcionario extends Model {
    declare nome: string;
    declare sobrenome: string;
    declare cpf: string;
    declare dataNascimento: Date;
    declare password: string;
    declare telefone: string;
    declare email: string;
    declare isAdmin: boolean;
    declare secret: string;

    public async comparePassword(enteredPassword: string): Promise<boolean> {
        return enteredPassword === this.password;
    }
}

Funcionario.init(
    {
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sobrenome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dataNascimento: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                isDate: {
                    args: true,
                    msg: "A data de nascimento deve ser válida",
                },
            },
        },
        cpf: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                is: {
                    args: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                    msg: "O CPF deve ser válido",
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [6, 30],
                    msg: "A senha deve ter entre 6 e 30 caracteres",
                },
                isPasswordValid(value: string) {
                    if (!this.provider && !passwordSchema.validate(value)) {
                        throw new Error(
                            "A senha deve ter pelo menos 6 caracteres, 1 letra maiúscula, 1 letra minúscula, 1 número e 1 símbolo"
                        );
                    }
                },
            },
        },
        telefone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                is: {
                    args: /^\(\d{2}\) \d{4,5}-\d{4}$/,
                    msg: "O telefone deve ser válido",
                },
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: "O email deve ser válido",
                },
            },
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        secret: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: "Funcionario",
        tableName: "Funcionarios",
        schema: "public",
    }
);

export { Funcionario as FuncionarioModel };
