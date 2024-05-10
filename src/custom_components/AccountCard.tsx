import { partialHide } from "@/lib/string_utils";
import { Account } from "@/schemas";
import RelativeTime from "./RelativeTime";

const AccountCard = ({
  name,
  taxServicePassword,
  taxServiceUser,
  createdAt,
}: Account) => {
  return (
    <section className="balansaas-gradient flex-1 min-h-28 min-w-60 w-60 border border-slate-500 rounded-md px-4 py-1.5 shadow-md">
      <div className="block mb-1" data-testid="header">
        <span className="font-semibold text-gray-800 text-xl">{name}</span>
      </div>
      <div className="flex flex-col w-full">
        <div className="text-base" data-testid="data-container">
          <div>
            <span className="block font-medium text-sm text-gray-500">
              Usuario
            </span>
            <span className="block font-semibold text-gray-800">
              {taxServiceUser}
            </span>
          </div>
          <div className="mt-1.5">
            <span className="block font-medium text-sm text-gray-500">
              Contraseña
            </span>
            <span className="block font-semibold text-gray-800">
              {partialHide(taxServicePassword)}
            </span>
          </div>
        </div>
        <div className="flex justify-end text-gray-500 mt-2 text-sm">
          <div>
            Creado <RelativeTime date={createdAt} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountCard;
