import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n/ui';

export type Post = CollectionEntry<'posts'>;

export async function getPosts(locale: Locale): Promise<Post[]> {
	const posts = await getCollection('posts', ({ data }) => data.locale === locale);
	return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getPostBySlug(locale: Locale, slug: string): Promise<Post | undefined> {
	const posts = await getPosts(locale);
	return posts.find((p) => p.data.postSlug === slug);
}

export async function getPostsByCategory(locale: Locale, category: string): Promise<Post[]> {
	const posts = await getPosts(locale);
	return posts.filter((p) => p.data.categories.includes(category));
}

export async function getAllCategories(locale: Locale): Promise<string[]> {
	const posts = await getPosts(locale);
	const set = new Set<string>();
	for (const p of posts) {
		for (const c of p.data.categories) set.add(c);
	}
	return [...set].sort();
}

export async function getTwinSlug(translationKey: string, targetLocale: Locale): Promise<string | undefined> {
	const posts = await getCollection('posts', ({ data }) => data.translationKey === translationKey && data.locale === targetLocale);
	return posts[0]?.data.postSlug;
}

export function formatDate(date: Date, locale: Locale): string {
	return new Intl.DateTimeFormat(locale === 'zh-tw' ? 'zh-TW' : 'en-GB', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}).format(date);
}
