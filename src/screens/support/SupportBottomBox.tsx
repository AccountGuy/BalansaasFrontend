import { getAllReleases } from '@/handlers/releasesHandler'
import SupportSubBox from './SupportSubBox'
import { useQuery } from '@tanstack/react-query'

const SupportBottomBox = () => {
  const { data } = useQuery({
    queryFn: getAllReleases,
    queryKey: ['releases'],
  })
  if (data === undefined) return <div>Loading...</div>
  return data.map(({ createdAt, compositeVersion, releaseNotes }) => (
    <div
      key={compositeVersion}
      className="card-border flex min-h-52 w-full flex-col divide-y rounded-md p-5"
    >
      <section>
        <div className="flex h-14 items-end justify-between px-5 py-3">
          <div className="align-center flex items-center text-2xl font-semibold text-main-800">
            Versión {compositeVersion}
          </div>
          <div className="align-center flex items-center text-xl font-semibold text-main-800">
            {createdAt}
          </div>
        </div>
      </section>
      <section className="px-5 py-2">
        <SupportSubBox releaseNotes={releaseNotes} />
      </section>
    </div>
  ))
}

export default SupportBottomBox
