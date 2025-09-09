import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { Poppins, Inter, Roboto } from "next/font/google";
import { UserSettingsProvider } from "@/context/UserSettingsContext";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});
const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Elyote",
  description:
    "Elyote est une entreprise de services numériques située en Ile-de-France, spécialisée dans la création d'outils sur-mesures et d'applications métier.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body
        className={`${poppins.variable} ${inter.variable} ${roboto.variable}`}
      >
        <NextIntlClientProvider>
          <UserSettingsProvider>
            <div className="dark:bg-gray-900 bg-gray-100 font-poppins">
              {children}
              <ToastContainer
                position="bottom-right"
                autoClose={4000}
                theme="colored"
              />
            </div>
          </UserSettingsProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
