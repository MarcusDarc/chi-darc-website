// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://chidarc.com',
	trailingSlash: 'always',
	i18n: {
		locales: ['zh-tw', 'en'],
		defaultLocale: 'zh-tw',
		routing: {
			prefixDefaultLocale: false,
		},
	},
});
