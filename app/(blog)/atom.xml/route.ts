import { render } from '@/lib/markdown-content/render.ts'
import { NodeContext } from '@effect/platform-node'
import { Chunk, Effect, ManagedRuntime, Order, Stream } from 'effect'
import { ArticleScheme } from '../article-scheme.ts'
import { getArticles } from '../utils.ts'

export async function GET() {
  const { renderToStaticMarkup } = await import('react-dom/server')

  const runtime = ManagedRuntime.make(NodeContext.layer)
  const articleTask = getArticles.pipe(
    Stream.mapEffect(
      Effect.fn(function* ({ id, data, content }) {
        const Content = yield* render(content)
        return { id, data, content: renderToStaticMarkup(Content({})) }
      })
    ),
    Stream.runCollect,
    Effect.map(
      Chunk.sort(
        Order.mapInput(
          Order.reverse(Order.Date),
          (article: { data: ArticleScheme }) => article.data.pubDate
        )
      )
    ),
    Effect.map(Chunk.toReadonlyArray)
  )
  const articles = await runtime.runPromise(articleTask)

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
    <feed xmlns="http://www.w3.org/2005/Atom">
    <title>u1F713</title>
    <subtitle>u1F713's Blog</subtitle>
    <link href="https://u1f713.github.io/feed/" rel="self"/>
    <link href="https://u1f713.github.io/"/>
    <updated>${articles[0].data.pubDate}</updated>
    <author>
	   <name>Nyarlathotep</name>
	   <email>anhedonia@skiff.com</email>
    </author>
    ${articles.reduce(
      (acc, { id, data, content }) =>
        `${acc}
         <entry>
            <id>${id}</id>
            <title>${data.title}</title>
            <link href="https://u1f713.github.io/${id}"/>
            <updated>${data.updatedDate ?? data.pubDate}</updated>
            <content type="text/html">
              ${content}
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
