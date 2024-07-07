import { z } from 'zod';

export const userValidator = z.object({
    email: z.string().max(128).email(),
    name: z.string().max(64).regex(/^[a-zA-Z0-9_\s]+$/).trim().optional(),
});

export const userWithPasswordValidator = userValidator.extend({
    password: z.string().min(8).max(128),
});