import { z } from "zod";

const Agendamento = z.object({
    nomeDonoAgendamento: z.string(),
    nomeAnimalAgendamento: z.string(),
    especieAnimalAgendamento: z.string(),
    tipoServicoAgendamento: z.string(),
    horarioAgendamento: z.date(), // Valida se é uma data
});

type Agendamento = z.infer<typeof Agendamento>;

export { Agendamento as AgendamentoType };
