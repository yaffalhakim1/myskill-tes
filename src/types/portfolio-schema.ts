import * as z from "zod";

export const portfolioSchema = z.object({
  id: z.number().optional(),
  username: z.string().min(2).max(50),
  backgroundImage: z.any({
    required_error: "Background Image is required.",
  }),
  avatar: z.any({
    required_error: "Avatar is required.",
  }),
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(1000, {
    message: "Description must be at most 1000 characters long",
  }),
  portfolios: z
    .array(
      z.object({
        name: z.string().min(2).max(50, {
          message: "Name must be at most 50 characters long",
        }),
        position: z.string().min(2).max(50, {
          message: "Position must be at most 1000 characters long",
        }),
        company: z.string().min(2).max(50),
        startDate: z.date({
          required_error: "Start Date is required.",
        }),
        endDate: z.date().optional(),
        description: z.string().min(2).max(1000),
      })
    )
    .max(10, {
      message: "You can only add up to 10 portfolio items",
    }),
});
