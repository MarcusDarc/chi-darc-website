import type { Locale } from '../i18n/ui';

/** Strip locale prefix to get a locale-agnostic path (always starts with /). */
export function stripLocale(pathname: string): string {
	if (pathname === '/en' || pathname === '/en/') return '/';
	if (pathname.startsWith('/en/')) {
		const rest = pathname.slice(3);
		return rest.startsWith('/') ? rest : `/${rest}`;
	}
	return pathname || '/';
}

export function withLocale(locale: Locale, pathname: string): string {
	const base = stripLocale(pathname);
	if (locale === 'zh-tw') {
		return base.endsWith('/') || base === '/' ? base : `${base}/`;
	}
	if (base === '/') return '/en/';
	const clean = base.endsWith('/') ? base.slice(0, -1) : base;
	return `/en${clean}/`;
}
