import * as z from 'zod';

export const addItemSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  stock: z.number().min(1, { message: "Stock must be at least 1" }).int(),
});
