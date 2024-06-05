const colorHash = {
  newFeature: 'text-emerald-700 bg-emerald-200',
  bugFix: 'text-rose-700 bg-rose-200',
  uiUxImprovement: 'text-purple-700 bg-purple-200',
  performanceImprovement: 'text-amber-700 bg-amber-200',
  contentUpdates: 'text-cyan-700 bg-cyan-200',
  securityEnhancement: 'text-zinc-700 bg-zinc-200',
} as const

const translations = {
  newFeature: 'Nueva característica',
  bugFix: 'Corrección de errores',
  uiUxImprovement: 'Mejora de interfaz',
  performanceImprovement: 'Mejora de rendimiento',
  contentUpdates: 'Nuevo contenido',
  securityEnhancement: 'Mejora de seguridad',
} as const

interface ChipKindVersionProps {
  noteKind: string
}

const ChipKindVersion = ({ noteKind }: ChipKindVersionProps) => {
  return (
    <span
      className={`${colorHash[noteKind as keyof typeof colorHash]} text-nowrap rounded px-3 py-1.5 font-semibold`}
    >
      {translations[noteKind as keyof typeof translations]}
    </span>
  )
}

export default ChipKindVersion
