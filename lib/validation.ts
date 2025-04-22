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
