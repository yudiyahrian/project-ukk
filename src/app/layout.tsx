// Import CSS global styles
import "@/styles/globals.css";

// Import Next.js modules
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { ClerkProvider } from "@clerk/nextjs";

// Import React modules
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";
import FullscreenImageView from "@/components/fullscreen-image-view";
import Loading from "@/app/(pages)/loading";

// Import site configuration
import { siteConfig } from "@/config/site";

// Define font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

// Define metadata for the site
export const metadata = {
  metadataBase: new URL("https://threads.codebustar.com"),
  title: {
    default: siteConfig.name,
    template: `%s • ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "nextjs",
    "prisma",
    "wave",
    "t3-stack",
    "uploadthing",
    "shadcn ui",
  ],
  authors: [
    {
      name: "admin",
      url: "https://x.com",
    },
  ],
  creator: "sujjeee",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "admin",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

// Define viewport settings
export const viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

// Define RootLayout component
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`font-sans no-scrollbar ${inter.variable}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
            <Suspense fallback={<Loading />}>
              <FullscreenImageView />
            </Suspense>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
