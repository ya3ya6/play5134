import localFont from "next/font/local";

import { cn } from "@/lib/utils";
import { Providers } from "@/components/providers";

import "./globals.css";

import { MainLayout } from "@/components/main-layout";

const fontInter = localFont({
  src: "../assets/fonts/Inter.var.woff2",
  display: "swap",
  variable: "--font-inter",
});

type RootLayoutProps = {
  children: React.ReactNode;
};
const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" className={cn(fontInter.variable)}>
      <body className="font-sans font-medium">
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
