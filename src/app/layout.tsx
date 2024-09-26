import type { Metadata } from "next";
import "@fontsource/roboto";
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import TanStackProvider from "@lib/TanStack/TanStackProvider";
import LoadingSpinner from "@components/UI/LoadingSpinner/LoadingSpinner";
import { I18nProvider } from "i18n/i18n-context";
import { detectLanguage } from "i18n/server";

export const metadata: Metadata = {
  title: "My Routine",
  description: "App to control menu routine and pantry",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lng = await detectLanguage();

  return (
    <I18nProvider language={lng}>
      <html
        lang={lng}
        className="flex min-h-screen flex-col bg-[#F4F7FA] font-main"
      >
        <body>
          <TanStackProvider>
            <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
            <Toaster position="top-center" reverseOrder={false} />
          </TanStackProvider>
        </body>
      </html>
    </I18nProvider>
  );
}
