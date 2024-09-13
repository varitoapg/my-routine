import type { Metadata } from "next";
import "@fontsource/roboto";
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

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
    <html lang="en" className="font-main bg-[#F4F7FA]">
      <body>{children}</body>
    </html>
  );
}
