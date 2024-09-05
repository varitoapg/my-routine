import type { Metadata } from "next";
import "@fontsource/roboto";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ny Routine",
  description: "App to control menu routine and pantry",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-main-font">{children}</body>
    </html>
  );
}
