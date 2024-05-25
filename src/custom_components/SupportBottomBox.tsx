import { getAllReleases } from "@/handlers/releasesHandler";
import { useQuery } from "@tanstack/react-query";

const SupportBottomBox = () => {
	const { data, isLoading, isError } = useQuery({
		queryFn: getAllReleases,
		queryKey: ["releases"],
	});
	if (data === undefined) return <div>Loading...</div>
	return (
		data.map(release => (
		<section className="flex flex-col min-h-52 w-full p-2.5 rounded-md p-5 shadow-custom divide-y">
		<div className="justify-between px-5 py-3 flex items-end h-14">
		
		<div className="text-2xl font-semibold text-main-800 flex align-center items-center">
		Versión {release.compositeVersion}
		</div>
		<div className="text-xl font-semibold text-main-800 flex align-center items-center">
		{release.createdAt}
		</div>
		</div>
		<span>
		{release.releaseNotes.map(releaseNote => (
		<section className="relative flex min-h-52 w-full rounded-md p-5">
		<span className="block">
		{releaseNote.id}
		</span>
		<span className="block">
		{releaseNote.description}
		</span>
		<span className="block">
		{releaseNote.kind}
		</span>
		</section>
		))}
		</span>
		</section>
		))
	)
}

export default SupportBottomBox
