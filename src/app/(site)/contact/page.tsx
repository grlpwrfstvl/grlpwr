import ContactForm from "../components/contactForm"

export default async function Contact() {

    return (
        <main className="w-full py-2 md:py-12">
        <div className="flex flex-col justify-center">
        <h1 className="text-5xl p-4 md:px-10 text-grlPink drop-shadow font-extrabold">
                Kontakt
        </h1> 
        <p className="p-4 md:px-10">
        Har du spørsmål om festivalen? Ønsker du fremtidig samarbeid?
          <br />
          Ta kontakt, så svarer vi på henvendelsen din så fort vi kan.

        </p>
        <ContactForm />
          
        </div>
        </main>
    )
}