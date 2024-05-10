import Form29 from "@/custom_components/Form29";
import { getSelectAccount } from "@/handlers/accountsHandler";
import { useQuery } from "@tanstack/react-query";

const F29Layout = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: getSelectAccount,
    queryKey: ["account-select"],
  });
  return (
    <main className="flex flex-row flex-wrap gap-5">
      <article className="flex flex-col flex-1">
        <h1 className="mb-4">Formulario 29</h1>
        {isError ?? "Error during loading"}
        {isLoading ? "Loading" : <Form29 accounts={data!} />}
      </article>
      <article className="flex-1" data-testid="previewData"></article>
    </main>
  );
};

export default F29Layout;
