import { getServerTranslations } from "@/i18n/server";
import { Footer } from "@components/Footer/Footer";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { t } = await getServerTranslations("auth");

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col md:flex-row">
        <div className="flex w-full flex-col bg-gradient-to-t from-[#7AC74F] to-white p-8 md:w-1/2 md:p-16">
          <h1 className="to-primary-via-primary-orange inline-block bg-gradient-to-r from-primary-green-hover via-primary-orange bg-clip-text py-1 text-4xl font-bold text-transparent md:text-5xl">
            My Routine
          </h1>

          <div className="relative flex flex-grow items-center md:-top-24">
            <div className="font-bold text-text-darkSlate">
              <p className="mt-2 text-lg md:text-xl">{t("firstLine")}</p>
              <p className="mt-2 text-lg md:text-xl">{t("secondLine")}</p>
              <p className="mt-2 text-lg md:text-xl">{t("thirdLine")}</p>
              <p className="mt-2 text-lg md:text-xl">{t("fourthLine")}</p>
              <div className="mt-4 w-full rounded border-t-4 border-black"></div>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-center p-8 md:w-1/2 md:p-12">
          {children}
        </div>
      </div>

      <Footer className="z-10 flex flex-row-reverse bg-transparent md:-mt-24" />
    </div>
  );
}
