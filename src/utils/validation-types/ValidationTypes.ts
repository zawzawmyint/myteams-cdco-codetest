import { z } from "zod";
import { createTeamFormValidationSchema } from "../validation-schema/team/TeamFormValidationSchema";
import { createLoginFormValidationSchema } from "../validation-schema/LoginFormValidationSchema";
// library
export type TeamFormValues = z.infer<
  ReturnType<typeof createTeamFormValidationSchema>
>;
export type LoginFormValues = z.infer<
  ReturnType<typeof createLoginFormValidationSchema>
>;
