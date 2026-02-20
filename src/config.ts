import { z } from 'zod';

export const ItemSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1).max(120),
  description: z.string().max(500).optional(),
  createdAt: z.date().optional(),
});

export type Item = z.infer<typeof ItemSchema>;

export const CreateItemSchema = ItemSchema.omit({ id: true, createdAt: true });
export type CreateItem = z.infer<typeof CreateItemSchema>;

export const PaginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type Pagination = z.infer<typeof PaginationSchema>;
