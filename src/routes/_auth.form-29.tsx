import { createFileRoute } from "@tanstack/react-router";
import Form29 from "../custom_components/Form29";

export const Route = createFileRoute("/_auth/form-29")({
  component: About,
});

function About() {
  return (
    <main className="flex flex-row gap-5">
      <article className="flex flex-col flex-1">
        <h1>Formulario 29</h1>
        <Form29 />
      </article>
      <article className="flex flex-col flex-1">
        <section className="w-full aspect-video border-2 border-black border-dashed grid place-items-center rounded-xl mt-12">
          <div className="text-center text-lg">
            <span className="block">
              Click en <span className="font-bold">Generar</span> para
            </span>
            <span>Ver el balance de impuestos</span>
          </div>
        </section>
      </article>
    </main>
  );
}
