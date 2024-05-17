import { Link, useNavigate, useRouterState } from '@tanstack/react-router'
import Logo from './Logo'
import SidebarLink from './SidebarLink'
import { Home, BookUser, LogOut, Cog } from 'lucide-react'
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
    <aside className="balansaas-gradient flex min-h-full min-w-64 flex-col rounded-e-2xl pb-8 pt-2 shadow-2xl">
      <article className="flex-1">
        <section className="grid place-items-center">
          <Logo />
        </section>
        <section>
          <Link to="/landing">
            <SidebarLink isActive={pathname === '/landing'} label="Inicio" icon={<Home />} />
          </Link>
          <Link to="/accounts">
            <SidebarLink isActive={pathname === '/accounts'} label="Cuentas" icon={<BookUser />} />
          </Link>
          <Link to="/form-29">
            <SidebarLink
              isActive={pathname === '/form-29'}
              label="Formulario F29"
              icon={<F29Book />}
            />
          </Link>
        </section>
      </article>
      <article>
        <SidebarLink isActive={false} label="Configuración" icon={<Cog />} />
        <section onClick={handleLogout} className="cursor-pointer">
          <SidebarLink isActive={false} label="Cerrar Sesión" icon={<LogOut />} />
        </section>
      </article>
    </aside>
  )
}

export default Sidebar
