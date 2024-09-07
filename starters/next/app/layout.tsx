import { Suspense } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import NavigationEvents from "@/components/helpers/navigationEvents";

import "./globals.css";
import "./preview.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

function getEnvironment(): string {
  return process.env.ENVIRONMENT || "production";
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const environment = getEnvironment();

  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Suspense fallback={null}>
          <NavigationEvents environment={environment} />
        </Suspense>
      </body>
    </html>
  );
}
