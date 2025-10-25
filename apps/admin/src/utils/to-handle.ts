import slugify from 'slugify'

export const toHandle = (title: string, locale?: string): string => {
  return slugify(title, {
    locale,
    replacement: '-',
    lower: true,
    strict: true,
    trim: true,
  })
}
