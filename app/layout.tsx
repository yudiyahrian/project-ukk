import "@styles/globals.css";
import { Metadata } from "next";

import { Navbar } from "@/components";
import { NextAuthProvider } from "./providers";
import { EdgeStoreProvider } from "@utils/edgestore";
import { Inter } from "next/font/google";
import { cn } from "@utils/utils";
import { Toaster } from "@components/ui/Toaster";
import NextTopLoader from "nextjs-toploader";
import { getServerSession } from "next-auth";
import { authOptions } from "@utils/auth";

export const metadata: Metadata = {
  title: `Project UKK`,
  description: `Membuat website gallery`,
};

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode;
  authModal: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html
      lang="en"
      className={cn(
        "bg-white text-slate-900 antialiased light",
        inter.className
      )}
    >
      <body className="min-h-screen pt-12 bg-slate-50 antialiased">
        <NextAuthProvider session={session}>
          <Navbar />
          <NextTopLoader showSpinner={false} color="#2299DD" />
          {authModal}
          <div className="container max-w-7xl h-full pt-12">
            <EdgeStoreProvider>{children}</EdgeStoreProvider>
          </div>
          <Toaster />
        </NextAuthProvider>
      </body>
    </html>
  );
}
