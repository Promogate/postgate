import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalsProvider } from "@/components/modals/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zapgate - Desbloquei o potencial do seu Whastapp",
  description: "Desbloquei o potencial do seu Whastapp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="pt-br">
        <body className={inter.className}>
          <ModalsProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
