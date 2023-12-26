import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { Montserrat, Great_Vibes } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { useRouter } from "next/router";

const mont = Montserrat({ subsets: ["latin"], variable: "--font-mont" });
const vibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-vibes",
});

export const metadata: Metadata = {
  title: "Walking After Midnight",
  description: "The Mcfarland Family",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-zinc-50 text-zinc-900">
      <body
        className={`${mont.variable} ${vibes.variable} relative font-sans antialiased`}
      >
        <Navbar />
        <main className="relative flex min-h-screen flex-col">
          <Providers>
            <div className="flex-1 flex-grow">{children}</div>
          </Providers>
        </main>

        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
