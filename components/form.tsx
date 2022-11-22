import { FormEvent, useState } from "react";
import Modal from "./modal";

export default function Form() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [document, setDocument] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let form = {
      name,
      company,
      phone,
      document,
      email,
    };

    const prismaResponse = await fetch("/api/setUser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const prismaContent = await prismaResponse.json();

    const sheetsResponse = await fetch("/api/submit", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...form, id: prismaContent.id }),
    });
    const sheetsContent = await sheetsResponse.json();

    setOpen(sheetsContent.status === 200);

    setName("");
    setCompany("");
    setPhone("");
    setDocument("");
    setEmail("");
  };

  return (
    <div className="bg-abb-red py-10 px-6 lg:col-span-2 xl:p-12 shadow-lg">
      {open ? <Modal /> : ""}
      <h3 className="text-lg text-white font-medium text-center">
        Formulario de Participación
      </h3>
      <form
        action="#"
        method="POST"
        className="mt-6 space-y-6"
        onSubmit={handleSubmit}
      >
        <div>
          <label
            htmlFor="name"
            className="text-white block text-sm font-medium text-warm-gray-900"
          >
            Nombre y apellido
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="name"
              className="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-abb-red focus:ring-abb-red"
              value={name}
              onChange={(e) => setName(e.target.value)}
              minLength={2}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="company"
            className="text-white block text-sm font-medium text-warm-gray-900"
          >
            Empresa
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="company"
              name="company"
              autoComplete="company"
              className="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-abb-red focus:ring-abb-red"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="phone"
            className="text-white block text-sm font-medium text-warm-gray-900"
          >
            Teléfono
          </label>

          <div className="mt-1">
            <input
              type="number"
              name="phone"
              id="phone"
              autoComplete="tel"
              className="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-abb-red focus:ring-abb-red"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="document"
            className="text-white block text-sm font-medium text-warm-gray-900"
          >
            DNI / CE
          </label>
          <div className="mt-1">
            <input
              id="document"
              name="document"
              type="number"
              autoComplete="document"
              className="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-abb-red focus:ring-abb-red"
              value={document}
              onChange={(e) => setDocument(e.target.value)}
              minLength={5}
              required
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="text-white block text-sm font-medium text-warm-gray-900"
          >
            Email
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-abb-red focus:ring-abb-red"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              minLength={5}
              required
            />
          </div>
        </div>
        <div className="sm:flex">
          <button
            type="submit"
            className="mx-auto mt-4 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-white px-6 py-3 text-base font-medium text-abb-red shadow-sm transition hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-3/5"
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
}
