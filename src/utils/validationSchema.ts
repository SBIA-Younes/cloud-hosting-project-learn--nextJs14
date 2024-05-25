import { z } from "zod";

// Create Article Schema
export const createArticleSchema = z.object({
  title: z.string().min(2).max(200),
  description: z.string().min(10),
});

// Register Schema
export const registerSchema = z.object({
  username: z.string().min(2).max(100), //.optional(),
  email: z.string().min(3).max(200).email(),
  password: z.string().min(6),
});

// Login Schema
export const loginSchema = z.object({
  email: z.string().min(3).max(200).email(),
  password: z.string().min(6),
});
