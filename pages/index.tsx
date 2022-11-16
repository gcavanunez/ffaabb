import Head from "next/head";
import Form from "../components/form";
import Footer from "../components/footer";

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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl h-screen grid grid-cols-1 content-center">
            <Form />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
