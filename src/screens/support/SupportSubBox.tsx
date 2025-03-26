import type { ReleaseNote } from '@/schemas'
import ChipKindVersion from './ChipKindVersion'

const SupportSubBox = ({ releaseNotes }: { releaseNotes: ReleaseNote[] }) => {
  // @ts-ignore
  const groupedReleases = Object.groupBy(releaseNotes, ({ kind }: { kind: string }) => kind)
  const obtainedKeys = Object.keys(groupedReleases).sort()
  return (
    <>
      {obtainedKeys.map((noteKind) => (
        <section className="relative mt-5 flex w-full flex-col gap-2.5 rounded-md" key={noteKind}>
          <div className="block">
            <ChipKindVersion noteKind={noteKind} />
          </div>
          <div className="block">
            <ul className="list-inside list-disc">
              {groupedReleases[noteKind].map(({ description, id }: any) => (
                <li className="font-semibold text-gray-700" key={id}>
                  {description}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </>
  )
}

export default SupportSubBox
