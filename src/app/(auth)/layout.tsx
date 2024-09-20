import { Footer } from "@components/Footer/Footer";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-row">
        <div className="flex w-1/2 flex-col bg-gradient-to-t from-[#7AC74F] to-white p-16">
          <h1 className="to-primary-via-primary-orange inline-block bg-gradient-to-r from-primary-green-hover via-primary-orange bg-clip-text py-1 text-5xl font-bold text-transparent">
            My Routine
          </h1>

          <div className="relative -top-24 flex flex-grow items-center">
            <div className="font-bold text-text-darkSlate">
              <p className="mt-2 text-xl">Make your own menu,</p>
              <p className="mt-2 text-xl">Make your own recipes,</p>
              <p className="mt-2 text-xl">Manage your own pantry or</p>
              <p className="mt-2 text-xl">Your group&apos;s pantry and more!</p>
              <div className="mt-4 w-full rounded border-t-4 border-black"></div>
            </div>
          </div>
        </div>

        <div className="flex w-1/2 flex-col items-center justify-center p-12">
          {children}
        </div>
      </div>
      <Footer className="z-10 -mt-24 flex flex-row-reverse bg-transparent" />
    </div>
  );
}
