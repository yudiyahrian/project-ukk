import "@styles/globals.css";
import { Metadata } from "next";

import Nav from "@/components/Nav";
import { NextAuthProvider } from "./providers";
import { EdgeStoreProvider } from "@utils/edgestore";

export const metadata: Metadata = {
  title: `Project UKK`,
  description: `Membuat website gallery`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />
            <EdgeStoreProvider>{children}</EdgeStoreProvider>
          </main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
