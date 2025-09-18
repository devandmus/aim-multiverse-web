import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.date(),
        updatedDate: z.date().optional(),
        tags: z.array(z.string()).optional(),
        category: z.string().optional(),
        author: z.string().default('Andrés Ignacio Maldonado'),
        featured: z.boolean().default(false),
        readingTime: z.string().optional(),
        image: z.string().optional(),
        video: z.string().optional(),
        resources: z.object({
            pdfs: z.array(z.string()).optional(),
            images: z.array(z.string()).optional(),
            videos: z.array(z.string()).optional(),
            codeExamples: z.array(z.string()).optional(),
        }).optional(),
        draft: z.boolean().default(false),
        relatedPosts: z.array(z.string()).optional(),
        seo: z.object({
            title: z.string().optional(),
            description: z.string().optional(),
            keywords: z.array(z.string()).optional(),
        }).optional(),
    }),
});

const config = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
    }),
});

export const collections = {
    blog,
    config,
};
