import { Footer } from "@components/Footer/Footer";

export default function LoggedInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 overflow-auto">{children}</main>
      <Footer />
    </div>
  );
}
