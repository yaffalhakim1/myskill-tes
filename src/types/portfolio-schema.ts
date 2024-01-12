import * as z from "zod";

export const portfolioSchema = z.object({
  username: z.string().min(2).max(50),
  backgroundImage: z.any(),
  avatar: z.any(),
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
  portfolio: z.array(
    z.object({
      name: z.string().min(2).max(50),
      position: z.string().min(2).max(50),
      company: z.string().min(2).max(50),
      startDate: z.date({
        required_error: "A date of birth is required.",
      }),

      endDate: z.date({
        required_error: "A date of birth is required.",
      }),

      description: z.string().min(2).max(50),
    })
  ),
});
