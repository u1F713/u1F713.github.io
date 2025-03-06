import { Option, Order, Schema as S } from 'effect'
import { Content, Rehype } from '../lib/markdown-content'

export type Schema = typeof Schema.Type

export const Schema = S.Struct({
  title: S.String,
  description: S.String,
  pubDate: S.Date,
  updatedDate: S.optional(S.Date),
  image: S.optional(S.String),
  tags: S.String.pipe(S.Array, S.optional)
})

export const collection = Content.collection({
  source: 'app/(blog)/content',
  schema: Option.some(Schema),
  plugins: Option.some([...Rehype.plugins])
})

export const order = Order.mapInput(
  Order.reverse(Order.Date),
  (post: { data: Schema }) => post.data.pubDate
)
