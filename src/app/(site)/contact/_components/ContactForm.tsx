"use client"
import { useForm, ValidationError } from "@formspree/react";


export default function ContactForm() {
  const [state, handleSubmit] = useForm("xayrnklv");

  if (state.succeeded) {
    return <p>Takk for din e-post! Vi sender svar så fort vi har anledning.</p>;
  }

  return (
    <div className="w-full md:w-4/6 mx-auto p-6">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <label htmlFor="email" className="text-sm font-semibold">
          E-post
        </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="navn@domene.no"
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
        <textarea
          id="message"
          name="message"
          placeholder="Din melding"
          rows={7}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} />

        <button
          type="submit"
          disabled={state.submitting}
          className="bg-green-600 text-white w-1/2 md:w-1/4 m-auto font-semibold py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring focus:border-blue-500 disabled:opacity-50"
        >
          Send
        </button>

        <ValidationError errors={state.errors} />
      </form>
    </div>
  );
}
