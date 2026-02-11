import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";

import NavigationEvents from "@/integration/helpers/NavigationEvents";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Drupal Decoupled", template: "%s | Drupal Decoupled" },
  description: "Powered by Drupal Decoupled",
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
          {environment === "preview" && <NavigationEvents />}
        </Suspense>
      </body>
    </html>
  );
}
