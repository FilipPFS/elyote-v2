import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import MobileHeader from "@/components/Mobile/MobileHeader";
import MobileFooter from "@/components/Mobile/MobileFooter";
import Header from "@/components/Header";
import { UserProvider } from "@/context/UserContext";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable}`}>
        <UserProvider>
          <div className="flex relative min-h-screen sm:flex-row flex-col gap-4">
            <MobileHeader />
            <Sidebar />
            <main className="flex-1 pb-48">
              <Header />
              {children}
            </main>
            <MobileFooter />
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
