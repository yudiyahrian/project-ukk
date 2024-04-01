import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import "./globals.css";
import localFont from 'next/font/local';
import Navbar from "@/components/Navbar";
import ModalProvider from "@/providers/ModalProvider";
import UserProvider from "@/providers/UserProvider";

const inter = Roboto_Flex({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wave",
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
            <Navbar>
              {children}
            </Navbar>
          </ModalProvider>
        </UserProvider>
      </body>
    </html>
  );
}
