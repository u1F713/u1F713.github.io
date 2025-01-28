import { Schema as S } from 'effect'

export const PostScheme = S.Struct({
  title: S.String,
  description: S.String,
  pubDate: S.Date,
  updatedDate: S.optional(S.Date),
  image: S.optional(S.String),
  tags: S.String.pipe(S.Array, S.optional)
})

export type PostScheme = typeof PostScheme.Type
