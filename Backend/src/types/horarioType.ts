import { z } from "zod";

const Horario = z.object({
    horario: z.date(),
    disponibilidade: z.boolean(),
});

type Horario = z.infer<typeof Horario>;

export { Horario as HorarioType };
