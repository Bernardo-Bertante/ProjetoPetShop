import { z } from "zod";

const Servico = z.object({
    tipoServico: z.string(),
    preco: z.number(),
    duracaoServico: z.number(),
});

type Servico = z.infer<typeof Servico>;

export { Servico as ServicoType };
