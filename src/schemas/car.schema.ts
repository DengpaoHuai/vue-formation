import { z } from 'zod';

export const carSchema = z.object({
  name: z.string(),
  model: z.string(),
  cost_in_credits: z.coerce.number().min(0, 'minimum de zéro').max(15, 'maximum de 15'),
});

export type Car = z.infer<typeof carSchema> & { _id: string };

//export { carSchema, type Car };
