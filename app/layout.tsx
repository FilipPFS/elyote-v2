import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
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
      <body className={`${poppins.variable}`}>
        <NextIntlClientProvider>
          {children}
          <ToastContainer
            position="bottom-right"
            autoClose={4000}
            theme="colored"
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
