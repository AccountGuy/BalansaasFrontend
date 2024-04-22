import { Link } from "@tanstack/react-router";
import Logo from "./Logo";

const Sidebar = () => {
  return (
    <aside className="min-w-60 min-h-full bg-gradient-to-br from-slate-100 to-slate-300 py-2 shadow-2xl rounded-e-2xl">
      <section>
        <Logo />
      </section>
      <Link to="/">
        <section className="py-1.5 px-4">Landing</section>
      </Link>
      <Link to="/form-29">
        <section className="py-1.5 px-4">Formulario 29</section>
      </Link>
    </aside>
  );
};

export default Sidebar;
