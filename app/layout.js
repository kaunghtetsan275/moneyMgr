import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MuiThemeProvider from "./providers/MuiThemeProvider";
import NextThemeProvider from "./providers/NextThemeProvider";
import ThemedToaster from "./components/sharedComp/ThemedToaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Rohan Money Manager",
  description: "Manage your finances effectively",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextThemeProvider>
          <MuiThemeProvider>{children}</MuiThemeProvider>
          <ThemedToaster />
        </NextThemeProvider>
      </body>
    </html>
  );
}
