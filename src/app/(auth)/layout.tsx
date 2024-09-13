export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <div className="flex w-1/2 flex-col bg-gradient-to-t from-[#7AC74F] to-white p-16">
        <h1 className="text-darkSlate text-5xl font-bold">My routine</h1>

        <div className="relative -top-24 flex flex-grow items-center">
          <div className="text-text-darkSlate font-bold">
            <p className="mt-2 text-xl">Make your own menu,</p>
            <p className="mt-2 text-xl">Make your own recipes,</p>
            <p className="mt-2 text-xl">Manage your own pantry or</p>
            <p className="mt-2 text-xl">your group&apos;s pantry and more!</p>
            <div className="mt-4 w-full rounded border-t-4 border-black"></div>
          </div>
        </div>
      </div>

      <div className="flex w-1/2 flex-col items-center justify-center p-12">
        {children}
      </div>
    </div>
  );
}
