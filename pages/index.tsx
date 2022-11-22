import Head from "next/head";
import Image from "next/image";
import Hero from "../components/hero";
import Form from "../components/form";
import Footer from "../components/footer";
import background from "../public/images/background.jpg";

//TODO: al tener éxito, generación de QR

export default function Home() {
  return (
    <>
      <Head>
        <title>Como los viejos tiempos - ABB</title>
        <meta name="description" content="Como los viejos tiempos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <div className="fixed -z-10 overflow-hidden">
          <Image
            alt="Fiesta ABB"
            src={background}
            placeholder="blur"
            quality={100}
            priority
            className="h-screen object-cover object-right-top"
          />
        </div>

        {/* <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"> */}
        {/* <div className="flex flex-row justify-between sm:px-6 lg:px-8"> */}
        <div className="lg:grid lg:grid-cols-3 px-6 lg:px-0">
          <div className="lg:hidden">
            <Hero />
          </div>
          <div className="hidden h-screen lg:grid grid-cols-1 content-center">
            fotos desktop
          </div>
          <div className="h-screen grid grid-cols-1 content-center">
            <Form />
          </div>
          <div className="hidden h-screen lg:grid grid-cols-1 content-center">
            <Hero />
          </div>
          <div className="lg:hidden text-center">fotos móvil</div>
        </div>
      </main>

      <Footer />
    </>
  );
}
