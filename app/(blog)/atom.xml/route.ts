import { generateAtomFeed } from '@/lib/atom-feed/index.ts'
import {
  compileContent,
  getContent,
  getContentID,
  parseFrontmatter,
  readContentDirectory
} from '@/lib/markdown-content'
import { NodeContext } from '@effect/platform-node'
import { Chunk, Effect, ManagedRuntime, Order, pipe, Stream } from 'effect'
import { PostScheme } from '../postScheme.ts'

export async function GET() {
  const { renderToStaticMarkup } = await import('react-dom/server')
  const runtime = ManagedRuntime.make(NodeContext.layer)
  const postsOrder = Order.mapInput(
    Order.reverse(Order.Date),
    (post: { data: PostScheme }) => post.data.pubDate
  )
  const posts = await pipe(
    readContentDirectory('app/(blog)/content'),
    Stream.mapEffect(
      Effect.fn(function* (filename) {
        const file = yield* getContent(filename)
        const Content = yield* compileContent(file)

        return {
          id: yield* getContentID(filename),
          data: yield* parseFrontmatter(PostScheme)(file),
          Content: renderToStaticMarkup(Content({}))
        }
      })
    ),
    Stream.runCollect,
    Effect.map(Chunk.sort(postsOrder)),
    Effect.map(Chunk.toReadonlyArray),
    runtime.runPromise
  )

  const feed = await runtime.runPromise(
    generateAtomFeed({
      title: 'u1F713',
      subtitle: "u1F713's Blog",
      links: {
        canonical: 'https://u1f713.github.io',
        self: 'https://u1f713.github.io/atom.xml'
      },
      author: { name: 'Nyarlathotep', email: 'anhedonia@skiff.com' },
      entries: posts.map(({ id, data, Content }) => ({
        id,
        title: data.title,
        link: `https://u1f713.github.io/${id}`,
        updated: data.updatedDate ?? data.pubDate,
        content: Content
      }))
    })
  )

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8'
    }
  })
}

export const dynamic = 'force-static'
