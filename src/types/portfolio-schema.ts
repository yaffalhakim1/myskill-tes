import * as z from "zod";

export const portfolioSchema = z.object({
  username: z.string().min(2).max(50),
  backgroundImage: z.any(),
  avatar: z.any(),
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
});
