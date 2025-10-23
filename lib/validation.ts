import { z } from "zod";

export const createNewPasswordValidation = (t: (key: string) => string) =>
  z.object({
    site: z.string().min(2, t("validation.siteMin")),
    login: z.string().min(2, t("validation.loginMin")),
    password: z.string().optional(),
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
  client: z.string().min(1, "zodValidation.clientRequired"),
  client_city: z.string().min(1, "zodValidation.clientCityRequired"),
  phone: z.string().min(1, "zodValidation.phoneRequired"),
  email: z.string().email("zodValidation.emailInvalid"),
  start_date: z.string().min(1, "zodValidation.startDateRequired"),
  end_date: z.string().min(1, "zodValidation.endDateRequired"),
  id_material: z.string().min(1, "zodValidation.materialRequired"),
});

export const rentalFormSecondPartSchema = z.object({
  rental_price: z.string().min(1, "zodValidation.priceRequired"),
  acompte: z.string().min(1, "zodValidation.depositRequired"),
});

export const createRentalUpdateFormValidation = (t: (key: string) => string) =>
  z.object({
    client: z.string().min(1, t("zodValidation.clientRequired")),
    client_city: z.string().min(1, t("zodValidation.clientCityRequired")),
    phone: z.string().min(1, t("zodValidation.phoneRequired")),
    email: z.string().email(t("zodValidation.emailInvalid")),
    acompte: z.string().min(1, t("zodValidation.depositRequired")),
    accessories: z.string().optional(),
    comment: z.string().optional(),
  });

export const savFormSchemaValidation = z.object({
  client: z.string().min(1, "zodValidation.clientRequired"),
  phone: z.string().min(1, "zodValidation.phoneRequired"),
  email: z.string().email("zodValidation.emailInvalid"),
  product: z.string().min(1, "zodValidation.productRequired"),
  supplier: z.string().min(1, "zodValidation.supplierRequired"),
  lend_machine: z.string().min(1, "zodValidation.lendMachineRequired"),
});

export const savUpdateFormSchemaValidation = z
  .object({
    client: z.string().min(1, "zodValidation.clientRequired"),
    phone: z.string().min(1, "zodValidation.phoneRequired"),
    email: z.string().email("zodValidation.emailInvalid"),
    product: z.string().min(1, "zodValidation.productRequired"),
    supplier: z.string().min(1, "zodValidation.supplierRequired"),
    // status: z.string().min(1, "Statut est obligatoire"), // à enlever
    accessories: z.string().optional(),
    comment: z.string().optional(),
    description: z.string().optional(),
    date_purchase: z.string().optional(),
    bill_number: z.string().optional(),
    sku: z.string().optional(),
    warranty: z.enum(["yes", "no"]).optional(),
    serial_number: z.string().optional(),
    deadline: z.string().optional(),
    material_state: z.string().optional(),
    lend_machine: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.warranty === "yes") {
      if (!data.date_purchase || data.date_purchase.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["date_purchase"],
          message: "zodValidation.purchaseDateRequired",
        });
      }
    }
  });

export const savFilesValidation = z.object({
  files: z.array(z.instanceof(File)).optional(),
});

const contactMethods = ["mail", "sms"] as const;

export const templateFormSchemaValidation = z.object({
  type: z.enum(contactMethods, {
    required_error: "Veuillez séléctionner l'option.",
  }),
  subject: z.string().min(1, "Le sujet est obligatoire."),
  content: z.string().min(1, "Le contenu est obligatoire."),
});

export const mailSchema = z.object({
  subject: z.string().min(2, "Le sujet est obligatoire."),
  content: z.string().min(2, "Le contenu est obligatoire."),
  firstName: z.string().min(2, "Le prénom est obligatoire."),
  lastName: z.string().min(2, "Le nom est obligatoire."),
  email: z.string().email("Email invalide."),
});

export const smsSchema = z.object({
  content: z.string().min(2, "Le contenu est obligatoire."),
  firstName: z.string().min(2, "Le prénom est obligatoire."),
  lastName: z.string().min(2, "Le nom est obligatoire."),
  phone: z.string().min(6, "Le numéro de téléphone est obligatoire"),
});

export const signInSchema = z.object({
  username: z.string().min(2, "L'identifiant est obligatoire"),
  password: z.string().min(2, "Le mot de passe est obligatoire."),
});

export const profileSchema = z.object({
  first_name: z.string().min(2, "Le prénom est obligatoire."),
  last_name: z.string().min(2, "Le nom est obligatoire."),
  email: z
    .string()
    .email("L'adresse e-mail n'est pas valide.")
    .min(1, "L'adresse e-mail est obligatoire."),
  phone_number: z.string().min(6, "Le numéro de téléphone est obligatoire."),
  mobile_device: z
    .string()
    .min(2, "Le nom de l'appareil mobile est obligatoire."),
});

export const userCreateSchema = z.object({
  username: z
    .string()
    .min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères.")
    .max(30, "Le nom d'utilisateur ne peut pas dépasser 30 caractères."),

  first_name: z.string().min(2, "Le prénom est obligatoire."),

  last_name: z.string().min(2, "Le nom est obligatoire."),

  password: z.string().min(2, "Le mot de passe est obligatoire."),

  email: z
    .string()
    .email("L'adresse e-mail n'est pas valide.")
    .min(1, "L'adresse e-mail est obligatoire."),

  phone_number: z
    .string()
    .min(6, "Le numéro de téléphone est obligatoire.")
    .regex(
      /^(\+?\d{6,15})$/,
      "Le numéro de téléphone doit contenir uniquement des chiffres et peut commencer par +."
    ),

  mobile_device: z
    .string()
    .min(2, "Le nom de l'appareil mobile est obligatoire."),

  role: z.enum(["user", "manager", "director", "superadmin"], {
    errorMap: () => ({ message: "Le rôle doit être 'user' ou 'manager'." }),
  }),

  customers_id: z
    .array(
      z.number().int().positive("L'identifiant du client doit être positif.")
    )
    .min(1, "Au moins un client doit être sélectionné."),
});
