import { z } from 'zod';
export const projectCreateSchema = z.object({
  name: z
    .string()
    .min(2, 'Project name must be at least 2 characters')
    .max(80, 'Project name must not exceed 80 characters')
    .trim(),
  description: z
    .string()
    .max(500, 'Description must not exceed 500 characters')
    .optional()
    .or(z.literal('')),
});
export const projectUpdateSchema = z.object({
  name: z
    .string()
    .min(2, 'Project name must be at least 2 characters')
    .max(80, 'Project name must not exceed 80 characters')
    .trim()
    .optional(),
  description: z
    .string()
    .max(500, 'Description must not exceed 500 characters')
    .optional()
    .or(z.literal('')),
});
export type ProjectCreateFormData = z.infer<typeof projectCreateSchema>;
export type ProjectUpdateFormData = z.infer<typeof projectUpdateSchema>;