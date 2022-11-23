import Head from "next/head";
import Image from "next/image";
import Form from "../components/form";
import Hero from "../components/hero";
import Photos from "../components/photos";
import background from "../../public/images/background.jpg";

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

        <div className="px-6 pt-24 pb-6 lg:grid lg:grid-cols-3 lg:px-0 lg:pb-0 lg:pt-0">
          <div className="lg:hidden">
            <Hero />
          </div>
          <div className="hidden h-full grid-cols-1 content-center lg:grid">
            <Photos />
          </div>
          <div className="grid h-full grid-cols-1 content-center overflow-hidden lg:p-4">
            <Form />
          </div>
          <div className="hidden h-screen grid-cols-1 content-center lg:grid">
            <Hero />
          </div>
          <div className="text-center lg:hidden">
            <Photos />
          </div>
        </div>
      </main>
    </>
  );
}
