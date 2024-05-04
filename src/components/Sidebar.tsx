import { Link, useRouterState } from "@tanstack/react-router";
import Logo from "./Logo";
import SidebarLink from "./SidebarLink";

const Sidebar = () => {
  const {
    location: { pathname },
  } = useRouterState();
  return (
    <aside className="flex flex-col min-w-56 min-h-full bg-gradient-to-br from-slate-100 to-slate-300 py-2 shadow-2xl rounded-e-2xl">
      <article className="flex-1">
        <section className="grid place-items-center">
          <Logo />
        </section>
        <section>
          <Link to="/">
            <SidebarLink isActive={pathname === "/"}>Home</SidebarLink>
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
        <section>
          <SidebarLink isActive={false}>Cerrar Sesión</SidebarLink>
        </section>
      </article>
    </aside>
  );
};

export default Sidebar;
