import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import MobileHeader from "@/components/MobileHeader";
import Sidebar from "@/components/Sidebar";
import MobileFooter from "@/components/MobileFooter";

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
        <div className="flex relative sm:flex-row flex-col gap-4">
          <MobileHeader />
          <Sidebar />
          <main className="flex-1">{children}</main>
          <MobileFooter />
        </div>
      </body>
    </html>
  );
}
