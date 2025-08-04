export const locales = ['en', 'vi'] as const

export type LocaleType = (typeof locales)[number]
