import * as z from "zod";

export const portfolioSchema = z.object({
  username: z.string().min(2).max(50),
  backgroundImage: z.any(),
  avatar: z.any(),
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(50, {
    message: "Description must be at most 50 characters long",
  }),
  portfolio: z
    .array(
      z.object({
        name: z.string().min(2).max(50, {
          message: "Name must be at most 50 characters long",
        }),
        position: z.string().min(2).max(50, {
          message: "Position must be at most 50 characters long",
        }),
        company: z.string().min(2).max(50),
        startDate: z.date({
          required_error: "A date of birth is required.",
        }),

        endDate: z.date({
          required_error: "A date of birth is required.",
        }),

        description: z.string().min(2).max(50),
      })
    )
    .max(10, {
      message: "You can only add up to 10 portfolio items",
    }),
});
