import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import MobileHeader from "@/components/Mobile/MobileHeader";
import MobileFooter from "@/components/Mobile/MobileFooter";
import Header from "@/components/Header";
import { UserProvider } from "@/context/UserContext";
import { ToastContainer } from "react-toastify";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

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
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={`${poppins.variable}`}>
        <NextIntlClientProvider>
          {" "}
          <UserProvider>
            <div className="flex relative min-h-screen sm:flex-row flex-col gap-4">
              <MobileHeader />
              <Sidebar />
              <main className="flex-1 flex flex-col max-sm:pb-48">
                <Header />
                {children}
              </main>
              <MobileFooter />
              <ToastContainer
                position="bottom-right"
                autoClose={4000}
                theme="colored"
              />
            </div>
          </UserProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
