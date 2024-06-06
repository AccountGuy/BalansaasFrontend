import type { ReactElement } from 'react'

interface SidebarLinkProps {
  label: string
  isActive: boolean
  icon: ReactElement
}

const SidebarLink = ({ isActive, label, icon }: SidebarLinkProps) => {
  return (
    <div
      className={`px-4 py-3 text-base font-semibold ${isActive ? 'border-r-4 border-main-700 text-main-700' : 'text-main-950'}`}
    >
      <div className="flex">
        {icon}
        <span className="ml-3">{label}</span>
      </div>
    </div>
  )
}

export default SidebarLink
