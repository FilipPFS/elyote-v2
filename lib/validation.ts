import { z } from "zod";

export const createNewPasswordValidation = (t: (key: string) => string) =>
  z.object({
    site: z.string().min(2, t("validation.siteMin")),
    login: z.string().min(2, t("validation.loginMin")),
    password: z.string().min(2, t("validation.passwordMin")),
    url: z
      .string()
      .url(t("validation.urlInvalid"))
      .or(z.literal(""))
      .optional(),
    additional_data: z.string().optional(),
    access_level: z.string(),
  });

export type NewPasswordValidationType = z.infer<
  ReturnType<typeof createNewPasswordValidation>
>;

export const newContactValidation = z.object({
  firstname: z.string().min(2, "Le champ Prénom est obligatoire."),
  lastname: z.string().min(2, "Le champ Nom est obligatoire."),
  email: z.string().email("Invalid type of email").or(z.literal("")).optional(),
  corporate_name: z.string().optional(),
  mobile: z.string().optional(),
  landline: z.string().optional(),
  additional_data: z.string().optional(),
  access_level: z.string(),
});
