import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const supportedLocales = ["fr", "en"];
  const cookieLocale = (await cookies()).get("ELYOTE_LANG")?.value || "fr";

  const locale = supportedLocales.includes(cookieLocale) ? cookieLocale : "fr";

  const messages = {
    global: (await import(`@/messages/${locale}/global.json`)).default,
    commandes: (await import(`@/messages/${locale}/commandes.json`)).default,
    contacts: (await import(`@/messages/${locale}/contacts.json`)).default,
    material: (await import(`@/messages/${locale}/material.json`)).default,
    rentals: (await import(`@/messages/${locale}/rentals.json`)).default,
    sav: (await import(`@/messages/${locale}/sav.json`)).default,
    credentials: (await import(`@/messages/${locale}/credentials.json`))
      .default,
  };

  return {
    locale,
    messages,
    timeZone: "Europe/Paris",
    formats: {
      dateTime: {
        short: {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        },
        long: {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        },
      },
    },
  };
});
