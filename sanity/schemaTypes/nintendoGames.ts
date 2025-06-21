import { R2Uploader } from "@/app/components/sanity/R2Uploader";
import { defineType } from "sanity";

export const nintendoGames = defineType({
    name: "nintendoGames",
    title: "Nintendo Games",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { source: "title" },
        },
        {
            name: "coverImage",
            title: "Cover Image",
            type: "url",
            components: {
                input: R2Uploader,
            },
        },
        {
            name: "content",
            title: "Modular Content",
            type: "array",
            of: [
                // rich text editor
                { type: "block" },
                // custom r2 image uploader
                {
                    type: "object",
                    name: "r2ImageEmbed",
                    title: "Image URL (R2)",
                    fields: [
                        {
                            name: "imageUrl",
                            title: "Image URL (R2)",
                            type: "url",
                            components: { input: R2Uploader },
                        },
                        {
                            name: "caption",
                            title: "Caption",
                            type: "string",
                        },
                    ],
                    preview: {
                        select: {
                            caption: "caption",
                            imageUrl: "imageUrl",
                        },
                        prepare({ caption, imageUrl }) {
                            return {
                                title: caption || "Image Embed",
                                subtitle: imageUrl
                            }
                        }
                    }
                },
                // YouTube embeded
                {
                    type: 'object',
                    name: 'youtubeEmbed',
                    title: 'YouTube Embed',
                    fields: [
                        {
                            name: 'url',
                            type: 'url',
                            title: 'YouTube Video URL',
                        }
                    ],
                    preview: {
                        select: { url: "url" },
                        prepare({ url }) {
                            return {
                                title: "YouTube Embed",
                                subtitle: url
                            }
                        }
                    }
                }
            ]
        }
    ]
})