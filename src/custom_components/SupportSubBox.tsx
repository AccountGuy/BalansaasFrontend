import type { ReleaseNote } from '@/schemas'
import ChipKindVersion from './ChipKindVersion'

const SupportSubBox = ({ releaseNotes }: { releaseNotes: ReleaseNote[] }) => {
  const a = Object.groupBy(releaseNotes, ({ kind }: { kind: string }) => kind)
  const obtainedKeys = Object.keys(a).sort()
  console.log(a)
  return (
    <>
      {obtainedKeys.map((noteKind) => (
        <section className="relative mt-5 flex w-full flex-col gap-2.5 rounded-md">
          <div className="block">
            <ChipKindVersion noteKind={noteKind} />
          </div>
          <div className="block">
            <ul className="list-inside list-disc">
              {a[noteKind].map((keyInstance) => (
                <li className="font-semibold text-gray-700">{keyInstance.description}</li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </>
  )
}

export default SupportSubBox
