export type Locale = (typeof locales)[number];

export const locales = ['en', 'se', 'no', 'dk'] as const;
export const defaultLocale: Locale = 'se';
