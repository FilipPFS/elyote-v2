"use server";

import { revalidatePath } from "next/cache";
import { contentDetectApiClient } from "../axios";
import { ApiResponse, getToken } from "./actions.global";
import axios from "axios";
import { MailData, SmsData } from "@/types";
import { mailSchema, smsSchema } from "../validation";

export const sendMail = async (formData: MailData): Promise<ApiResponse> => {
  try {
    const token = await getToken();

    if (!token)
      return {
        success: false,
      };

    const result = mailSchema.safeParse(formData);

    if (!result.success) {
      console.log(result.error.formErrors.fieldErrors);

      return {
        success: false,
        errors: result.error.formErrors.fieldErrors,
      };
    }

    const postData = {
      info: {
        template_id: 4828926,
        sender_name: "Antoine",
        sender_email: "aa@elyote.com",
        message_email: formData.content,
        recipient_email: formData.email,
        recipient_name: `${formData.firstName} ${formData.lastName}`,
        subject_email: formData.subject,
        post_name: "Antoine",
        post_address: "38 bis rue",
        post_zip: "77280",
        post_city: "Othis",
        post_phone: "0606060660",
        post_email: "aa@elyote.com",
        files: "nomFichier",
      },
      source_type: "sav",
      subject_email: formData.subject,
      source_id: "12345",
      need_to_be_sended: "yes",
      need_to_be_archived: "yes",
      type_email: "test-depuis-hopscotch",
    };

    console.log("POSTDATA", postData);

    const formDataToSend = new FormData();

    formDataToSend.append("json", JSON.stringify(postData));

    const res = await contentDetectApiClient.post(`/api/mail`, formDataToSend, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      revalidatePath("/communication/liste");

      return {
        success: true,
      };
    } else {
      return {
        success: false,
        error: `Erreur survenue: ${res.status}`,
      };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Axios error occurred:",
        error.response?.data || error.message
      );

      return {
        success: false,
        error: String(error.message),
      };
    } else {
      console.error("Unexpected error:", error);
      return {
        success: false,
        error: String(error),
      };
    }
  }
};

export const sendSms = async (formData: SmsData): Promise<ApiResponse> => {
  try {
    const token = await getToken();

    if (!token)
      return {
        success: false,
      };

    const result = smsSchema.safeParse(formData);

    if (!result.success) {
      console.log(result.error.formErrors.fieldErrors);

      return {
        success: false,
        errors: result.error.formErrors.fieldErrors,
      };
    }

    const postData = {
      info: {
        sender_name: "BUREAU VALL",
        client_name: formData.lastName,
        client_firstname: formData.firstName,
        recipient_number: formData.phone,
        subject_sms: "archive sms",
        message_sms: formData.content,
        operator_sms: formData.operator ? formData.operator : "Test Operator",
      },
      source_type: "sav",
      source_id: "10",
      need_to_be_sended: "yes",
      need_to_be_archived: "yes",
      type_sms: "sms",
    };

    console.log("POSTDATA", postData);

    const res = await contentDetectApiClient.post(`/api/sms`, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      revalidatePath("/communication/liste");

      console.log("RES DATA", res.data);

      return {
        success: true,
      };
    } else {
      return {
        success: false,
        error: `Erreur survenue: ${res.status}`,
      };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Axios error occurred:",
        error.response?.data || error.message
      );

      return {
        success: false,
        error: String(error.message),
      };
    } else {
      console.error("Unexpected error:", error);
      return {
        success: false,
        error: String(error),
      };
    }
  }
};
