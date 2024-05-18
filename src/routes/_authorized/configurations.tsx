import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authorized/configurations')({
  component: () => <div>Configuración</div>,
})
