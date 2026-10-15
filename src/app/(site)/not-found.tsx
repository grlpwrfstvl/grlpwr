import Button from "./_components/Button";

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <p className="text-8xl font-extrabold text-grlPink md:text-9xl">404</p>
      <h1 className="mt-4 text-3xl font-extrabold text-grlGreen md:text-4xl">Denne siden finnes ikke (lenger)</h1>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/">Til forsiden</Button>
        <Button href="/program" variant="secondary">
          Se programmet
        </Button>
      </div>
    </div>
  );
}
