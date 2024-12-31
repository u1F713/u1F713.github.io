import { Schema as S } from 'effect'

export const ArticleScheme = S.Struct({
  title: S.String,
  description: S.String,
  pubDate: S.Date,
  updatedDate: S.optional(S.Date),
  image: S.optional(S.String)
})

export type ArticleScheme = typeof ArticleScheme.Type
