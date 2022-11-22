// import { FormEvent, useState } from "react";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import Modal from "./modal";

interface IFormInput {
  name: string;
  company: string;
  phone: string;
  document: string;
  email: string;
}

export default function Form() {
  // const [name, setName] = useState("");
  // const [company, setCompany] = useState("");
  // const [phone, setPhone] = useState("");
  // const [document, setDocument] = useState("");
  // const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const { register, handleSubmit } = useForm<IFormInput>();
  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  const onSubmit: SubmitHandler<IFormInput> = async (form) => {
    // e.preventDefault();

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
    <div className="bg-abb-red py-10 px-6 shadow-lg lg:col-span-2 xl:p-12">
      {open ? <Modal /> : ""}
      <h3 className="text-center text-lg font-medium text-white">
        Formulario de Participación
      </h3>
      <form
        action="#"
        method="POST"
        className="mt-6 space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label
            htmlFor="name"
            className="text-warm-gray-900 block text-sm font-medium text-white"
          >
            Nombre y apellido
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="name"
              autoComplete="name"
              className="border-warm-gray-300 text-warm-gray-900 block w-full rounded-md py-3 px-4 shadow-sm focus:border-abb-red focus:ring-abb-red"
              {...register("name")}
              minLength={2}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="company"
            className="text-warm-gray-900 block text-sm font-medium text-white"
          >
            Empresa
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="company"
              autoComplete="company"
              className="border-warm-gray-300 text-warm-gray-900 block w-full rounded-md py-3 px-4 shadow-sm focus:border-abb-red focus:ring-abb-red"
              {...register("company")}
              required
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="phone"
            className="text-warm-gray-900 block text-sm font-medium text-white"
          >
            Teléfono
          </label>

          <div className="mt-1">
            <input
              type="number"
              id="phone"
              autoComplete="tel"
              className="border-warm-gray-300 text-warm-gray-900 block w-full rounded-md py-3 px-4 shadow-sm focus:border-abb-red focus:ring-abb-red"
              {...register("phone")}
              required
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="document"
            className="text-warm-gray-900 block text-sm font-medium text-white"
          >
            DNI / CE
          </label>
          <div className="mt-1">
            <input
              id="document"
              type="number"
              autoComplete="document"
              className="border-warm-gray-300 text-warm-gray-900 block w-full rounded-md py-3 px-4 shadow-sm focus:border-abb-red focus:ring-abb-red"
              {...register("document")}
              minLength={5}
              required
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="text-warm-gray-900 block text-sm font-medium text-white"
          >
            Email
          </label>
          <div className="mt-1">
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="border-warm-gray-300 text-warm-gray-900 block w-full rounded-md py-3 px-4 shadow-sm focus:border-abb-red focus:ring-abb-red"
              {...register("email")}
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
