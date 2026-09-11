import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/context/toast-context";
import { AffiliateDemoProvider } from "@/context/affiliate-demo-context";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SquadDeck Affiliate System | Interactive Demo & Management Hub",
  description: "Complete interactive prototype of the SquadDeck Affiliate Program for coaches, sports clubs, and directors.",
  icons: {
    icon: "https://squaddeck.com/wp-content/uploads/2024/08/Favicon.png",
    shortcut: "https://squaddeck.com/wp-content/uploads/2024/08/Favicon.png",
    apple: "https://squaddeck.com/wp-content/uploads/2024/08/Favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} font-sans scroll-smooth h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-[#8B14C2]/20 selection:text-[#27125B]">
        <ToastProvider>
          <AffiliateDemoProvider>
            {children}
          </AffiliateDemoProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
