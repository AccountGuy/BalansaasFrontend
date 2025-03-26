import { LoaderCircle } from 'lucide-react'

interface LoaderButtonContentProps {
  label?: string
}

const LoaderButtonContent = ({ label = 'Cargando' }: LoaderButtonContentProps) => (
  <>
    <div>{label}</div>
    <div className="ml-1.5 animate-spin">
      <LoaderCircle />
    </div>
  </>
)

export default LoaderButtonContent
