import { cn } from '@/lib/utils'
import { LoaderCircle } from 'lucide-react'
import { ReactNode } from 'react'

type LoaderSize = 'sm' | 'md' | 'lg' | 'xl'

interface LoaderProps {
  size: LoaderSize
  label: ReactNode
  className?: string
}

const sizesTextMap: Record<LoaderSize, string> = {
  sm: 'text-sm',
  md: 'text-normal',
  lg: 'text-lg',
  xl: 'text-xl',
}

const sizesGapMap: Record<LoaderSize, string> = {
  sm: 'gap-1',
  md: 'gap-1.5',
  lg: 'gap-3',
  xl: 'gap-3',
}

const sizeIconMap: Record<LoaderSize, number> = {
  sm: 24,
  md: 28,
  lg: 36,
  xl: 48,
}

const Loader = ({ size = 'md', label = 'Cargando', className = '' }: LoaderProps) => {
  return (
    <div
      className={cn(
        `flex h-full w-full flex-col items-center justify-center ${sizesGapMap[size]} ${sizesTextMap[size]} text-main-900`,
        className
      )}
      data-testid="Loader"
      role="alert"
      aria-busy="true"
    >
      <div className="animate-spin">
        <LoaderCircle size={sizeIconMap[size]} />
      </div>
      <div className="font-semibold">{label}</div>
    </div>
  )
}

export default Loader
