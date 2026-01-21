import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LegalEase | AI-Powered Contract Analysis & Risk Assessment",
  description:
    "Analyze legal contracts instantly with LegalEase. Identify risks, compliance gaps, and critical clauses using advanced AI. Start your free legal audit today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} font-sans bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}
