import SupportTopBox from '@/custom_components/SupportTopBox'
import SupportBottomBox from '@/custom_components/SupportBottomBox'

const SupportLayout = () => {
  return (
    <main className="flex flex-row flex-wrap gap-10">
      <article className="w-full">
        <h1 className="mb-6">Soporte</h1>
        <SupportTopBox />
      </article>
      <article className="w-full">
        <h1 className="mb-6">Notas de las versiones</h1>
        <div className="flex flex-col gap-y-16">
          <SupportBottomBox />
        </div>
      </article>
      <article className="flex-1" data-testid="previewData"></article>
    </main>
  )
}

export default SupportLayout
