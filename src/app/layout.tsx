import type { Metadata } from "next";
import "@fontsource/roboto";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Routine",
  description: "App to control menu routine and pantry",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="font-main-font">
      <body>{children}</body>
    </html>
  );
}
