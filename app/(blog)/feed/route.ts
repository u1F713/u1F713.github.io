import { NodeContext } from '@effect/platform-node'
import { Chunk, ManagedRuntime, Order, Stream } from 'effect'
import { ArticleScheme } from '../article-scheme.ts'
import { getArticles } from '../utils.ts'

export async function GET() {
  const runtime = ManagedRuntime.make(NodeContext.layer)
  const articleChunk = await runtime.runPromise(Stream.runCollect(getArticles))
  const articles = Chunk.sort(
    articleChunk,
    Order.mapInput(
      Order.reverse(Order.Date),
      (article: { data: ArticleScheme }) => article.data.pubDate
    )
  ).pipe(Chunk.toReadonlyArray)

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
      (acc, { id, data }) =>
        `${acc}
         <entry>
            <id>${id}</id>
            <title>${data.title}</title>
            <link href="https://u1f713.github.io/${id}"/>
            <updated>${data.updatedDate ?? data.pubDate}</updated>
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
