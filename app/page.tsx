import { getNintendoGames, NintendoGamesType } from "@/sanity/lib/nintendo-games/getNintendoGames";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {

	const games = await getNintendoGames();

	return (
		<div className="flex flex-col w-full max-w-[1280px] gap-2 mx-auto py-8 px-4">
			<h1 className="text-lg font-semibold">Nintendo Games</h1>
			<div>
				{games.map((game: NintendoGamesType) => (
					<div key={game._id} className="flex gap-4 items-center py-4 border-b-1 border-gray-700">
						{game.coverImage && (
							<div className="w-[300px] aspect-[5/3] relative">
								<Image 
									src={game.coverImage}
									alt={game.title}
									fill
									className="nextImage"
								/>
							</div>
						)}
						<Link href={`/nintendo-game/${game.slug.current}`}>
							<h2 className="font-semibold text-lg">{game.title}</h2>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}
