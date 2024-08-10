import { z } from "zod";

const Agendamento = z.object({
    clienteId: z.number(),
    servicoId: z.number(),
    horarioId: z.number(),
});

type Agendamento = z.infer<typeof Agendamento>;

export { Agendamento as AgendamentoType };
