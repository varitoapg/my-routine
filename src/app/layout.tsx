import type { Metadata } from "next";
import "@fontsource/roboto";
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import TanStackProvider from "lib/TanStack/TanStackProvider";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import LoadingSpinner from "@/components/UI/LoadingSpinner/LoadingSpinner";

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
        <TanStackProvider>
          <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
          <Toaster position="top-center" reverseOrder={false} />
        </TanStackProvider>
      </body>
    </html>
  );
}
