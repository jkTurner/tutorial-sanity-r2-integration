import type { PortableTextBlock } from "@portabletext/types";
import { client } from "../client";
import { groq } from "next-sanity";
import { R2ImageBlockType, YoutubeEmbedBlockType } from "./getNintendoGames";

export interface NintendoGameSlugType {
    _id: string;
    title: string;
    slug: { current: string };
    coverImage?: string;
    content?: Array<PortableTextBlock | R2ImageBlockType | YoutubeEmbedBlockType>;
}

const query = groq`
    *[_type == "nintendoGames" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        coverImage,
        content
    }
`

export async function getNintendoGameSlug(slug: string): Promise<NintendoGameSlugType | null>{
    return await client.fetch(query, {slug});
}