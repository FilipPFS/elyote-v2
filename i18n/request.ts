import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const messages = {
    global: (await import(`@/messages/${locale}/global.json`)).default,
    sidebar: (await import(`@/messages/${locale}/sidebar.json`)).default,
  };

  return {
    locale,
    messages,
  };
});
