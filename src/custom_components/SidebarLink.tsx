interface SidebarLinkProps {
  children: string;
  isActive: boolean;
}

const SidebarLink = ({ isActive, children }: SidebarLinkProps) => {
  return (
    <div
      className={`py-1.5 px-4 ${isActive ? "font-bold border-r-4 border-cyan-900 text-cyan-900" : "text-slate-600 font-semibold"}`}
    >
      {children}
    </div>
  );
};

export default SidebarLink;
