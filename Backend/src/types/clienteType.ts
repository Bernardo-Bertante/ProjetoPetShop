import { z } from "zod";

const Cliente = z.object({
    nomeDono: z.string(),
    sobrenomeDono: z.string(),
    nomeAnimal: z.string(),
    racaAnimal: z.string(),
    especieAnimal: z.string(),
    telefone: z.string(),
    email: z.string().optional(),
});

type Cliente = z.infer<typeof Cliente>;

export { Cliente as ClienteType };
