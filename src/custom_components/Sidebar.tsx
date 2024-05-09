import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import Logo from "./Logo";
import SidebarLink from "./SidebarLink";
import { localStorageKey } from "@/stores/authStore";
import { toast } from "@/components/ui/use-toast";

const Sidebar = () => {
  const {
    location: { pathname },
  } = useRouterState();

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(localStorageKey);
    toast({ variant: "default", title: "Cierre de sessión exitoso" });
    navigate({ to: "/login" });
  };

  return (
    <aside className="balansaas-gradient flex flex-col min-w-56 min-h-full py-2 shadow-2xl rounded-e-2xl">
      <article className="flex-1">
        <section className="grid place-items-center">
          <Logo />
        </section>
        <section>
          <Link to="/landing">
            <SidebarLink isActive={pathname === "/landing"}>Home</SidebarLink>
          </Link>
          <Link to="/form-29">
            <SidebarLink isActive={pathname === "/form-29"}>
              Formulario 29
            </SidebarLink>
          </Link>
          <Link to="/accounts">
            <SidebarLink isActive={pathname === "/accounts"}>
              Cuentas SII
            </SidebarLink>
          </Link>
        </section>
      </article>
      <article>
        <section onClick={handleLogout} className="cursor-pointer">
          <SidebarLink isActive={false}>Cerrar Sesión</SidebarLink>
        </section>
      </article>
    </aside>
  );
};

export default Sidebar;
