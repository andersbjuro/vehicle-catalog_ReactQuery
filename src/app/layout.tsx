import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import ClientProviders from "@/components/client-providers";
import { cookies } from "next/headers";
import data from "@/lib/data";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Catalog Managment",
  description: "Forba Catalog Managment",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const setting = data.setting
  const countryCodeCookie = (await cookies()).get('user-country-code')
  const contryCode = countryCodeCookie ? countryCodeCookie.value : '752'

  return (
    <html lang={locale} className="dark" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased remove-scrollbar",
          geistSans.variable,
          geistMono.variable,
        )}
      >
        <NextIntlClientProvider>
          <ClientProviders setting={{ ...setting, countryCode: Number(contryCode) }}>
            {children}
          </ClientProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
