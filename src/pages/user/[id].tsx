import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "../../components/footer";

export default function User() {
  const router = useRouter();

  const getUser = async (id: number) => {
    const response = await fetch("../api/getUser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    return response.json();
  };
  let user = {};
  if (router.isReady) {
    user = getUser(0);
  }
  console.log(user);

  return (
    <>
      <Head>
        <title>Como los viejos tiempos - ABB</title>
        <meta name="description" content="Como los viejos tiempos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid h-screen max-w-3xl grid-cols-1 content-center">
            Info de user: nombre:
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
