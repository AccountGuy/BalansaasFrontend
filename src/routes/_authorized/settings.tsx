import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authorized/settings')({
  component: () => <div>Configuración</div>,
})
