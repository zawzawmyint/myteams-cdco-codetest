import { z } from "zod";

export const createTeamFormValidationSchema = () => {
  return z.object({
    name: z
      .string({ required_error: "This is required" })
      .min(2, { message: "Name must be at least 2 characters long" })
      .max(100, { message: "Name must be at most 100 characters long" }),
    region: z
      .string({ required_error: "This is required" })
      .min(2, { message: "Region must be at least 2 characters long" })
      .max(100, { message: "Region must be at most 100 characters long" }),
    country: z
      .string({ required_error: "This is required" })
      .min(2, { message: "Country must be at least 2 characters long" })
      .max(100, { message: "Country must be at most 100 characters long" }),
  });
};
