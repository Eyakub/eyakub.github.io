export type Lang = 'en' | 'bn'
export type L10n = { en: string; bn: string }

const BN_DIGITS = '০১২৩৪৫৬৭৮৯'

export const tr = (v: L10n, lang: Lang): string => (lang === 'bn' && v.bn ? v.bn : v.en)

export const fmt = (template: string, vars: Record<string, string>): string =>
  template.replace(/\{(\w+)\}/g, (whole, k: string) => (k in vars ? vars[k] : whole))

export const num = (n: number, lang: Lang): string =>
  lang === 'bn' ? String(n).replace(/\d/g, (d) => BN_DIGITS[Number(d)]) : String(n)
