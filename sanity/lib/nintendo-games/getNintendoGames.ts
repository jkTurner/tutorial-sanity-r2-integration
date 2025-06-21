import { groq } from "next-sanity";
import { client } from "../client";
import type { PortableTextBlock } from "@portabletext/types";

export type R2ImageBlockType = {
    _type: "r2ImageEmbed";
    imageUrl: string;
    caption?: string;
}

export type YoutubeEmbedBlockType = {
    _type: "youtubeEmbed";
    url: string;
};

export interface NintendoGamesType {
    _id: string;
    title: string;
    slug: { current: string };
    coverImage?: string;
    content?: Array<PortableTextBlock | R2ImageBlockType | YoutubeEmbedBlockType>;
}

const query = groq`
    *[_type == "nintendoGames" && defined(slug.current)] | order(_createdAt desc) {
        _id,
        title,
        slug,
        coverImage,
        content
    }
`;

export async function getNintendoGames(): Promise<NintendoGamesType[]> {
    return await client.fetch(query);
}