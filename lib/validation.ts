import z from "zod";

export const newPasswordValidation = z.object({
  site: z.string().min(2, "Le champ site est obligatoire."),
  login: z.string().min(2, "Le champ login est obligatoire."),
  password: z.string().min(2, "Le champ password est obligatoire."),
  url: z.string().url().or(z.literal("")).optional(),
  additional_data: z.string().optional(),
  access_level: z.string(),
});
