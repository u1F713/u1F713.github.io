import { z, defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional()
  })
})

export const collections = { blog }
