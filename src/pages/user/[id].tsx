import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

type User = {
  name: string;
  company: string;
  phone: string;
  document: string;
  email: string;
};

export default function User() {
  const [user, setUser] = useState<User>({
    name: "",
    company: "",
    phone: "",
    document: "",
    email: "",
  });
  const router = useRouter();
  const { id } = router.query;

  const getUser = (id: number) => {
    return fetch("../api/getUser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((response) => response.json())
      .then((data) => setUser(data));
  };

  useEffect(() => {
    id && getUser(parseInt(id as any));
  }, [id]);

  return (
    <>
      <Head>
        <title>Como los viejos tiempos - ABB</title>
        <meta name="description" content="Como los viejos tiempos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-auto bg-gray-100 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid h-screen max-w-3xl grid-cols-1 content-center">
          <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Información
              </h3>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Nombre y apellido
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {user && user.name}
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Empresa</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {user && user.company}
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Teléfono
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {user && user.phone}
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    DNI / CE
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {user && user.document}
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {user && user.email}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
