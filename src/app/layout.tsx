import type { Metadata } from "next";
import "@fontsource/roboto";
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import TanStackProvider from "lib/TanStack/TanStackProvider";

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
    <html lang="en" className="bg-[#F4F7FA] font-main">
      <body>
        <TanStackProvider>{children}</TanStackProvider>
      </body>
    </html>
  );
}
