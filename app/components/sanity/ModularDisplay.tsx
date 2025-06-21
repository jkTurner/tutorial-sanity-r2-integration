import { R2ImageBlockType, YoutubeEmbedBlockType } from "@/sanity/lib/nintendo-games/getNintendoGames";
import type { PortableTextBlock } from "@portabletext/types";
import { PortableText, PortableTextComponents } from "next-sanity";
import Image from "next/image";

type Props = {
    value: Array<PortableTextBlock | R2ImageBlockType | YoutubeEmbedBlockType>;
}

const components: PortableTextComponents = {
    types: {
        r2ImageEmbed: ({ value }) => {
            if (!value?.imageUrl) return null;

            return (
                <div className="">
                    <div className="w-full max-w-[600px] aspect-[16/9] relative">
                        <Image
                            src={value.imageUrl}
                            alt={value.caption || "Embeded Image"}
                            fill
                            className="nextImage"
                        />
                    </div>
                    {value.caption && (
                        <p className="italic text-sm opacity-70">{value.caption}</p>
                    )}
                </div>
            );
        },
        youtubeEmbed: ({ value }) => {
            const { url } = value;

            if (!url) return null;

            let videoId = "";

            try {
                const urlObj = new URL(url);
                if (urlObj.hostname === "youtu.be") {
                videoId = urlObj.pathname.slice(1); // strip leading slash
                } else if (urlObj.hostname.includes("youtube.com")) {
                videoId = urlObj.searchParams.get("v") || "";
                }
            } catch (error) {
                console.warn("Invalid YouTube URL:", url, error);
                return null;
            }

            if (!videoId) return null;

            const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0`;

            return (
                <div className="my-6">
                    <iframe
                        width="100%"
                        height="400"
                        src={embedUrl}
                        title="YouTube Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full md:h-[600px]"
                    />
                </div>
        );
        },
    },
    block: {
        h1: ({ children }) => <h1 className="text-2xl font-bold my-4">{children}</h1>,
        h2: ({ children }) => <h2 className="text-xl font-semibold my-3">{children}</h2>,
        h3: ({ children }) => <h3 className="text-lg font-medium my-2">{children}</h3>,
        normal: ({ children }) => <p className="my-2 leading-relaxed opacity-70">{children}</p>,
    },
};

export function ModularDisplay({ value }: Props) {
    return <PortableText value={value} components={components} />;
}