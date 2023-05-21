import Dashboard from "@/components/dashboard";
import data from "@/data/bowling.json";
export default async function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between">
			<Dashboard datarec={data} />
		</main>
	);
}
