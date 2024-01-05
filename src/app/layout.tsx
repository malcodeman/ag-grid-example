import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ColorSchemeScript } from "@mantine/core";
import { Providers } from "./providers";
import "@mantine/core/styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pecunia",
  description: "Multi-currency budgeting app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
