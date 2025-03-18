export type Locale = (typeof locales)[number];

export const locales = ['en', 'se'] as const;
export const defaultLocale: Locale = 'se';
