import {
  compileContent,
  getContent,
  parseFrontmatter
} from '@/lib/markdown-content'
import { NodeContext } from '@effect/platform-node'
import { Chunk, Effect, ManagedRuntime, Order, pipe, Stream } from 'effect'
import { PostScheme } from '../postScheme.ts'

export async function GET() {
  const { renderToStaticMarkup } = await import('react-dom/server')
  const runtime = ManagedRuntime.make(NodeContext.layer)
  const order = Order.mapInput(
    Order.reverse(Order.Date),
    (posts: { data: PostScheme }) => posts.data.pubDate
  )

  const posts = await pipe(
    getContent('app/(blog)/content'),
    Stream.flatMap(([id, content]) =>
      Effect.zipWith(
        parseFrontmatter(PostScheme)(content),
        compileContent(content),
        (data, Content) => ({
          id,
          data,
          Content: renderToStaticMarkup(Content({}))
        }),
        { concurrent: true }
      )
    ),
    Stream.runCollect,
    Effect.map(Chunk.sort(order)),
    Effect.map(Chunk.toReadonlyArray),
    runtime.runPromise
  )

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
    <feed xmlns="http://www.w3.org/2005/Atom">
    <title>u1F713</title>
    <subtitle>u1F713's Blog</subtitle>
    <link href="https://u1f713.github.io/feed/" rel="self"/>
    <link href="https://u1f713.github.io/"/>
    <updated>${posts[0].data.pubDate}</updated>
    <author>
	   <name>Nyarlathotep</name>
	   <email>anhedonia@skiff.com</email>
    </author>
    ${posts.reduce(
      (acc, { id, data, Content }) =>
        `${acc}
         <entry>
            <id>${id}</id>
            <title>${data.title}</title>
            <link href="https://u1f713.github.io/${id}"/>
            <updated>${data.updatedDate ?? data.pubDate}</updated>
            <content type="text/html">
              ${Content}
            </content>
          </entry>`,
      ''
    )}
    </feed>`,
    {
      headers: {
        'Content-Type': 'application/atom+xml; charset=utf-8'
      }
    }
  )
}

export const dynamic = 'force-static'
