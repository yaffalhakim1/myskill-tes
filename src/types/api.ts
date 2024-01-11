import { z } from "zod";
import { portfolioSchema } from "./portfolio-schema";

export type Response<TData = unknown> = {
  success: boolean;
  message?: string;
  data?: TData;
};

// FOR SCHEMAS
export type ProfileSchema = {
  data: {
    id: number;
  } & z.infer<typeof portfolioSchema>;
};

export type PortfolioInputs = z.infer<typeof portfolioSchema>;
