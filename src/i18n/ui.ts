export const locales = ['zh-tw', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'zh-tw';

export const categoryNames: Record<Locale, Record<string, string>> = {
	'zh-tw': {
		europe: '歐洲',
		uk: '英國',
		wales: '威爾斯',
		italy: '義大利',
		venice: '威尼斯',
		milan: '米蘭',
		asia: '亞洲',
		singapore: '新加坡',
		poetry: '詩',
		austria: '奧地利',
		vienna: '維也納',
		england: '英格蘭',
	},
	en: {
		europe: 'Europe',
		uk: 'United Kingdom',
		wales: 'Wales',
		italy: 'Italy',
		venice: 'Venice',
		milan: 'Milan',
		asia: 'Asia',
		singapore: 'Singapore',
		poetry: 'Poetry',
		austria: 'Austria',
		vienna: 'Vienna',
		england: 'England',
	},
};

export const ui = {
	'zh-tw': {
		siteName: 'Chi Darc',
		headerTitle: '旅行，為了鬆綁自己',
		tagline: '不斷旅行、閱讀、創作，想將眼前的美好分享給也在尋找的另一雙眼睛。',
		navHome: '首頁',
		navAbout: '關於琪',
		navBlog: '文章',
		navContact: '聯絡我',
		navEurope: '歐洲',
		navUk: '英國',
		navAsia: '亞洲',
		readMore: '繼續閱讀',
		recentPosts: '最新文章',
		categories: '分類',
		tags: '標籤',
		postedOn: '發布於',
		featuredLinks: '精選旅程',
		aboutTitle: '關於琪',
		aboutBody:
			'喜歡旅行、閱讀、創作，想將眼前的美好分享給也在尋找的另一雙眼睛。',
		contactTitle: '聯絡我',
		contactIntro: '歡迎來信交流旅行、藝術與文字。表單稍後會接上寄送服務。',
		formName: '姓名',
		formEmail: '電子郵件',
		formSubject: '主旨',
		formMessage: '訊息',
		formSubmit: '送出',
		formNote: '目前為前端預覽；送出尚未連線到後端處理。',
		footerCopy: '© 2025 Chi Darc — All Rights Reserved.',
		language: '語言',
		langZh: '中文',
		langEn: 'English',
		notFoundTitle: '找不到頁面',
		notFoundBody: '這頁不存在，或已經換了位子。',
		backHome: '回首頁',
		relatedCategory: '分類文章',
		allPosts: '所有文章',
		venice: '威尼斯',
		cardiff: '卡地夫',
		singapore: '新加坡',
	},
	en: {
		siteName: 'Chi Darc',
		headerTitle: 'Travel to Break Free',
		tagline:
			'Always travelling, reading, creating — sharing beauty with eyes that are also searching.',
		navHome: 'Home',
		navAbout: 'About',
		navBlog: 'Journal',
		navContact: 'Contact',
		navEurope: 'Europe',
		navUk: 'UK',
		navAsia: 'Asia',
		readMore: 'Read more',
		recentPosts: 'Recent posts',
		categories: 'Categories',
		tags: 'Tags',
		postedOn: 'Published',
		featuredLinks: 'Featured journeys',
		aboutTitle: 'About Chi',
		aboutBody:
			'I love travel, reading, and making things — and want to share the beauty in front of me with another pair of searching eyes.',
		contactTitle: 'Contact',
		contactIntro:
			'Get in touch about travel, art, or writing. The form will connect to a custom handler later.',
		formName: 'Name',
		formEmail: 'Email',
		formSubject: 'Subject',
		formMessage: 'Message',
		formSubmit: 'Send message',
		formNote: 'Front-end preview only — submit is not wired to a backend yet.',
		footerCopy: '© 2025 Chi Darc — All Rights Reserved.',
		language: 'Language',
		langZh: '中文',
		langEn: 'English',
		notFoundTitle: 'Page not found',
		notFoundBody: 'This page does not exist, or it has moved.',
		backHome: 'Back home',
		relatedCategory: 'In this category',
		allPosts: 'All posts',
		venice: 'Venice',
		cardiff: 'Cardiff',
		singapore: 'Singapore',
	},
} as const;

export type UiKey = keyof (typeof ui)['en'];

export function t(locale: Locale, key: UiKey): string {
	return ui[locale][key] ?? ui.en[key];
}

export function localizePath(locale: Locale, path = ''): string {
	const clean = path.replace(/^\/+/, '').replace(/\/+$/, '');
	if (locale === defaultLocale) {
		return clean ? `/${clean}/` : '/';
	}
	return clean ? `/${locale}/${clean}/` : `/${locale}/`;
}

export function getLocaleFromUrl(pathname: string): Locale {
	if (pathname === '/en' || pathname.startsWith('/en/')) return 'en';
	return 'zh-tw';
}
