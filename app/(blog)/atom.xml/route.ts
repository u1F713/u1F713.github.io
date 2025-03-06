import { generateAtomFeed } from '@/app/lib/atom-feed/index.ts'
import { NodeContext } from '@effect/platform-node'
import { Array, Chunk, Effect, ManagedRuntime, Stream } from 'effect'
import * as Post from '../Post.ts'

export async function GET() {
  const { renderToStaticMarkup } = await import('react-dom/server')
  const runtime = ManagedRuntime.make(NodeContext.layer)

  const posts = await Post.collection.pipe(
    Stream.flatMap(post =>
      Stream.zipWith(post.data, post.component, (data, PostComponent) => ({
        id: post.id,
        data,
        PostComponent
      }))
    ),

    Stream.runCollect,
    Effect.map(Chunk.sort(Post.order)),
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
      entries: Array.map(Chunk.toArray(posts), post => ({
        id: post.id,
        title: post.data.title,
        link: `https://u1f713.github.io/${post.id}`,
        updated: post.data.updatedDate ?? post.data.pubDate,
        content: renderToStaticMarkup(post.PostComponent({}))
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
