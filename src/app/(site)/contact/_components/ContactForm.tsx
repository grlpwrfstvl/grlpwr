"use client";

import { useForm, ValidationError } from "@formspree/react";

const inputClasses =
  "w-full rounded-2xl border-[3px] border-lightPink bg-white px-4 py-3 text-lg font-semibold outline-none transition focus:border-grlPink";

export default function ContactForm() {
  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORMSPREE_ID || "xayrnklv");

  if (state.succeeded) {
    return (
      <p role="status" className="rounded-3xl bg-lightPink p-8 text-center text-2xl font-extrabold text-grlPink">
        Takk for meldingen! Vi svarer så fort vi kan.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="mb-1 block font-extrabold text-grlGreen">
          Navn
        </label>
        <input id="name" type="text" name="name" autoComplete="name" className={inputClasses} />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block font-extrabold text-grlGreen">
          E-post
        </label>
        <input id="email" type="email" name="email" required autoComplete="email" placeholder="navn@domene.no" className={inputClasses} />
        <ValidationError prefix="E-post" field="email" errors={state.errors} className="mt-1 font-bold text-grlPink" />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block font-extrabold text-grlGreen">
          Melding
        </label>
        <textarea id="message" name="message" required rows={6} className={inputClasses} />
        <ValidationError prefix="Melding" field="message" errors={state.errors} className="mt-1 font-bold text-grlPink" />
      </div>
      <button
        type="submit"
        disabled={state.submitting}
        className="mx-auto block rounded-full bg-grlPink px-8 py-3 text-lg font-extrabold text-white transition hover:scale-105 hover:bg-grlGreen disabled:opacity-50"
      >
        {state.submitting ? "Sender …" : "Send"}
      </button>
      <ValidationError errors={state.errors} className="font-bold text-grlPink" />
    </form>
  );
}
