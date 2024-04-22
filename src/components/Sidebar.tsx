import { Link } from "@tanstack/react-router";
import Logo from "./Logo";

const Sidebar = () => {
  return (
    <aside className="min-w-60 min-h-full bg-slate-700 py-4 px-2">
      <section>
        <Logo />
      </section>
      <Link to="/">
        <section>Home</section>
      </Link>
      <Link to="/about">
        <section>About</section>
      </Link>
    </aside>
  );
};

export default Sidebar;
