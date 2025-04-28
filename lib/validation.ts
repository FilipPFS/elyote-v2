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

export const createNewContactValidation = (t: (key: string) => string) =>
  z.object({
    firstname: z.string().min(2, t("validation.firstNameMin")),
    lastname: z.string().min(2, t("validation.lastNameMin")),
    email: z
      .string()
      .email(t("validation.emailInvalid"))
      .or(z.literal(""))
      .optional(),
    corporate_name: z.string().optional(),
    mobile: z.string().optional(),
    landline: z.string().optional(),
    additional_data: z.string().optional(),
    access_level: z.string(),
  });

export type NewContactValidationType = z.infer<
  ReturnType<typeof createNewContactValidation>
>;

export const materialFormSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  type: z
    .string({ required_error: "Le type est requis" })
    .nullable()
    .refine((val) => val !== null && val.length > 0, {
      message: "Le type est requis",
    }),
  lend: z.preprocess(
    (val) => (val === null ? undefined : val),
    z.coerce
      .number({
        invalid_type_error: "Veuillez choisir la disponibilité pour prêt",
      })
      .nonnegative("Veuillez choisir la disponibilité pour prêt")
  ),
  rent: z.preprocess(
    (val) => (val === null ? undefined : val),
    z.coerce
      .number({
        invalid_type_error: "Veuillez choisir la disponibilité pour location",
      })
      .nonnegative("Veuillez choisir la disponibilité pour location")
  ),
  deposit: z.string().min(1, "La caution ou prix d'achat est requis"),
});
