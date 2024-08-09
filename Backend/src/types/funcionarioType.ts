import { z } from "zod";

const Funcionario = z.object({
    nome: z.string(),
    sobrenome: z.string(),
    cpf: z.string(),
    dataNascimento: z.date(),
    password: z.string(),
    telefone: z.string(),
    email: z.string(),
    isAdmin: z.boolean(),
    secret: z.string(),
});

type Funcionario = z.infer<typeof Funcionario>;

export { Funcionario as FuncionarioType };
