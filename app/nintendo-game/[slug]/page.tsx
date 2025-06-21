import { ModularDisplay } from "@/app/components/sanity/ModularDisplay";
import { getNintendoGameSlug } from "@/sanity/lib/nintendo-games/getNintendoGameSlug";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function NintendoGamePage(props: {
    params: Promise<{ slug: string}>;
}) {
    const { slug } = await props.params;
    const game = await getNintendoGameSlug(slug);

    if (!game) return notFound();

    return (
        <div className="flex flex-col w-full max-w-[1280px] gap-2 mx-auto py-8 px-4">
            <h1 className="font-semibold text-lg">{game.title}</h1>
            {game.coverImage && (
                <div className="w-full max-w-[600px] aspect-[6/4] relative">
                    <Image
                        src={game.coverImage}
                        alt={game.title}
                        fill
                        className="nextImage"
                    />
                </div>
            )}

            {game.content && (
                <div>
                    <ModularDisplay value={game.content} />
                </div>
            )}
        </div>
    )
}
