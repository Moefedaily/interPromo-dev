import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Le Séoul",
  description: "Restaurant Coréen situé au coeur de la ville de Grenoble",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <html lang="fr">
      <head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-custom-grey">{children}</body>
    </html>
  );
}


