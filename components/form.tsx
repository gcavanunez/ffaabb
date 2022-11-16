import { FormEvent, useState } from "react";
import Modal from "./modal";

export default function Form() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let form = {
      firstName,
      lastName,
      email,
      phone,
      subject,
    };

    const rawResponse = await fetch("/api/submit", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const content = await rawResponse.json();

    setOpen(content.status === 200);

    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setSubject("");
  };

  return (
    <div className="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12 shadow-lg">
      {open ? <Modal /> : ""}
      <h3 className="text-lg font-medium text-warm-gray-900">
        Send us a message
      </h3>
      <form
        action="#"
        method="POST"
        className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
        onSubmit={handleSubmit}
      >
        <div>
          <label
            htmlFor="first-name"
            className="block text-sm font-medium text-warm-gray-900"
          >
            First name
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="firstName"
              id="first-name"
              autoComplete="given-name"
              className="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              minLength={2}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="last-name"
            className="block text-sm font-medium text-warm-gray-900"
          >
            Last name
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="lastName"
              id="last-name"
              autoComplete="family-name"
              className="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              minLength={2}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-warm-gray-900"
          >
            Email
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              minLength={5}
              required
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-warm-gray-900"
            >
              Teléfono
            </label>
          </div>
          <div className="mt-1">
            <input
              type="number"
              name="phone"
              id="phone"
              autoComplete="tel"
              className="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-warm-gray-900"
          >
            Subject
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="subject"
              id="subject"
              className="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
        </div>
        {/* <div className="sm:col-span-2">
          <div className="flex justify-between">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-warm-gray-900"
            >
              Message
            </label>
            <span id="message-max" className="text-sm text-warm-gray-500">
              Max. 500 characters
            </span>
          </div>
          <div className="mt-1">
            <textarea
              id="message"
              name="message"
              rows={4}
              className="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500"
              aria-describedby="message-max"
              defaultValue={""}
              onChange={handleChange}
            />
          </div>
        </div> */}
        <div className="sm:col-span-2 sm:flex sm:justify-end">
          <button
            type="submit"
            className="mt-2 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-teal-500 px-6 py-3 text-base font-medium text-white shadow-sm transition hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:w-auto"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
