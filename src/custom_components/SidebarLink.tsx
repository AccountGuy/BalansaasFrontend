import type { ReactElement } from 'react'

interface SidebarLinkProps {
  label: string
  isActive: boolean
  icon: ReactElement
}

const SidebarLink = ({ isActive, label, icon }: SidebarLinkProps) => {
  return (
    <div
      className={`px-4 py-3 ${isActive ? 'border-r-4 border-cyan-900 font-bold text-cyan-900' : 'font-semibold text-slate-600'}`}
    >
      <div className="flex">
        {icon}
        <span className="ml-3">{label}</span>
      </div>
    </div>
  )
}

export default SidebarLink
