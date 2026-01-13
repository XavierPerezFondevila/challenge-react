import type { Metadata } from "next";
import { roboto } from './fonts';
import "./globals.css";
import { FavoriteCharactersProvider } from "@/context/FavoriteCharactersContext";
import Header from "@/components/Header";
import { CharactersProvider } from "@/context/CharactersContext";

export const metadata: Metadata = {
  title: "Challenge React",
  description: "Website for the react challenge",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased font-main`}>
        <CharactersProvider>
          <FavoriteCharactersProvider>
            <Header />
            {children}
          </FavoriteCharactersProvider>
        </CharactersProvider>
      </body>
    </html>
  );
}
