import { z } from "zod";

export const createLoginFormValidationSchema = () => {
  return z.object({
    name: z
      .string({ required_error: "This is required" })
      .min(2, { message: "Name must be at least 2 characters long" })
      .max(20, { message: "Name must be at most 20 characters long" }),
  });
};
