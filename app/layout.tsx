import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import UserProvider from "@/providers/UserProvider";
import Sidebar from "@/components/Sidebar";
import ModalProvider from "@/providers/ModalProvider";

const inter = Poppins({ subsets: ["latin"], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] });

export const metadata: Metadata = {
  title: "Flinsta",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <ModalProvider>
            <Sidebar>
              {children}
            </Sidebar>
          </ModalProvider>
        </UserProvider>
      </body>
    </html>
  );
}
