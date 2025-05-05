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

export const createNewMaterialValidation = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(1, t("zodValidation.nameMsg")),
    type: z
      .string({ required_error: t("zodValidation.typeMsg") })
      .nullable()
      .refine((val) => val !== null && val.length > 0, {
        message: t("zodValidation.typeMsg"),
      }),
    lend: z.preprocess(
      (val) => (val === null ? undefined : val),
      z.coerce
        .number({
          invalid_type_error: t("zodValidation.lendMsg"),
        })
        .nonnegative(t("zodValidation.lendMsg"))
    ),
    rent: z.preprocess(
      (val) => (val === null ? undefined : val),
      z.coerce
        .number({
          invalid_type_error: t("zodValidation.rentMsg"),
        })
        .nonnegative(t("zodValidation.rentMsg"))
    ),
    deposit: z.string().min(1, t("zodValidation.depositMsg")),
  });

export const rentalFormFirstPartSchema = z.object({
  client: z.string().min(1, "Client est obligatoire."),
  client_city: z.string().min(1, "Ville est obligatoire."),
  phone: z.string().min(1, "Téléphone est obligatoire."),
  email: z.string().email("Email invalide."),
  start_date: z.string().min(1, "Date de début est obligatoire."),
  end_date: z.string().min(1, "Date de fin est obligatoire."),
  id_material: z.string().min(1, "Matériel est obligatoire"),
});

export const rentalFormSecondPartSchema = z.object({
  rental_price: z.string().min(1, "Prix est obligatoire."),
  acompte: z.string().min(1, "Acompte est obligatoire."),
});

export const rentalUpdatedFormSchema = z.object({
  client: z.string().min(1, "Client est obligatoire."),
  client_city: z.string().min(1, "Ville est obligatoire."),
  phone: z.string().min(1, "Téléphone est obligatoire."),
  email: z.string().email("Email invalide."),
  acompte: z.string().min(1, "Acompte est obligatoire."),
  accessories: z.string().optional(),
  comment: z.string().optional(),
});
