import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/layout/header";

export const metadata: Metadata = {
  title: "Learnstream",
  description: "Get your learn on!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className="flex h-full min-h-screen w-full flex-col">
        <Header />
        {children}
      </body>
    </html>
  );
}
