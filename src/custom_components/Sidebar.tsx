import { Link, useNavigate, useRouterState } from '@tanstack/react-router'
import Logo from './Logo'
import SidebarLink from './SidebarLink'
import { Home, BookUser, LogOut } from 'lucide-react'
import F29Book from '@/components/icons/F29Book'
import { localStorageKey } from '@/stores/authStore'
import { toast } from '@/components/ui/use-toast'

const Sidebar = () => {
  const {
    location: { pathname },
  } = useRouterState()

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem(localStorageKey)
    toast({ variant: 'default', title: 'Cierre de sessión exitoso' })
    navigate({ to: '/login' })
  }

  return (
    <aside className="balansaas-gradient flex min-h-full min-w-64 flex-col rounded-e-2xl py-2 shadow-2xl">
      <article className="flex-1">
        <section className="grid place-items-center">
          <Logo />
        </section>
        <section>
          <Link to="/landing">
            <SidebarLink isActive={pathname === '/landing'}>
              <div className="flex">
                <Home />
                <span className="ml-2">Inicio</span>
              </div>
            </SidebarLink>
          </Link>
          <Link to="/accounts">
            <SidebarLink isActive={pathname === '/accounts'}>
              <div className="flex">
                <BookUser />
                <span className="ml-2">Cuentas</span>
              </div>
            </SidebarLink>
          </Link>
          <Link to="/form-29">
            <SidebarLink isActive={pathname === '/form-29'}>
              <div className="flex">
                <F29Book />
                <span className="ml-2">Formulario 29</span>
              </div>
            </SidebarLink>
          </Link>
        </section>
      </article>
      <article>
        <section onClick={handleLogout} className="cursor-pointer">
          <SidebarLink isActive={false}>
            <div className="flex">
              <LogOut />
              <span className="ml-2">Cerrar Sesión</span>
            </div>
          </SidebarLink>
        </section>
      </article>
    </aside>
  )
}

export default Sidebar
