import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const supportedLocales = ["fr", "en"];
  const cookieLocale = (await cookies()).get("ELYOTE_LANG")?.value || "fr";

  const locale = supportedLocales.includes(cookieLocale) ? cookieLocale : "fr";

  const messages = {
    global: (await import(`@/messages/${locale}/global.json`)).default,
    commandes: (await import(`@/messages/${locale}/commandes.json`)).default,
    credentials: (await import(`@/messages/${locale}/credentials.json`))
      .default,
  };

  return {
    locale,
    messages,
  };
});
