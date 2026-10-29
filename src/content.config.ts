import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
	loader: glob({
		pattern: '**/*.md',
		base: './src/content/posts',
		generateId: ({ entry }) => entry.replace(/\.md$/, ''),
	}),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		locale: z.enum(['zh-tw', 'en']),
		translationKey: z.string(),
		postSlug: z.string(),
		categories: z.array(z.string()).default([]),
		tags: z.array(z.string()).default([]),
		cover: z.string().optional(),
		featured: z.boolean().default(false),
	}),
});

export const collections = { posts };
