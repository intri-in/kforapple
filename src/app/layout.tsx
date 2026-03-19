import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ProgressBar from "@/components/general/ProgressBar";
import ThemeRegistry from "@/lib/helpers/theme/ThemeRegistery";
import { DEFAULT_METADATA, SUPPORTED_LANGUAGES } from "#/defines/constants";
import { Suspense } from "react";
import { theme } from '#/defines/theme';
import { Toastify } from "@/components/general/Toastify";

export async function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((lng) => ({ lng }))
}


export const metadata: Metadata = DEFAULT_METADATA

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode,
  params: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  return (
    <html lang="en">
      <head>
          <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <ProgressBar />
      <ThemeRegistry  theme={theme}>
            
          {children}
          <Toastify />
      </ThemeRegistry>
      </body>
    </html>
  )
}

