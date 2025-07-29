// layout.js atau layout.tsx

import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "./lib/redux/provider";
import WhatsappSticky from "@/components/ui/whatsappSticky";
// Inisialisasi font DM Sans
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Graha Gloria Group",
  description: "Graha Gloria Group",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} font-sans antialiased overflow-x-hidden`}>
        <ReduxProvider>
          <WhatsappSticky/>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
