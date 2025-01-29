import Image from '@/app/components/Image.tsx'
import { getContent, Rehype } from '@/lib/markdown-content/index.ts'
import {
  compileContent,
  parseFrontmatter
} from '@/lib/markdown-content/render.ts'
import { NodeContext } from '@effect/platform-node'
import { Chunk, Effect, ManagedRuntime, pipe, Stream } from 'effect'
import type { Metadata } from 'next'
import { PostScheme } from '../postScheme.ts'

type Props = Promise<{
  postId: string
}>

const runtime = ManagedRuntime.make(NodeContext.layer)

export function generateStaticParams() {
  const posts = pipe(
    getContent('app/(blog)/content'),
    Stream.map(([postId]) => ({ postId })),
    Stream.runCollect,
    Effect.map(Chunk.toArray)
  )
  return runtime.runPromise(posts)
}

export async function generateMetadata(props: {
  params: Props
}): Promise<Metadata> {
  const { postId } = await props.params
  const { title, description } = await pipe(
    getContent('app/(blog)/content'),
    Stream.filter(([id]) => id === postId),
    Stream.flatMap(([, content]) => parseFrontmatter(PostScheme)(content)),
    Stream.runCollect,
    Effect.flatMap(Chunk.get(0)),
    runtime.runPromise
  )
  return { title: `${title} | u1F713`, description: description }
}

async function Posts(props: { params: Props }) {
  const { postId } = await props.params

  const { data, Content } = await pipe(
    getContent('app/(blog)/content'),
    Stream.filter(([id]) => id === postId),
    Stream.flatMap(([id, content]) =>
      Effect.zipWith(
        parseFrontmatter(PostScheme)(content),
        compileContent(content, [Rehype.plugin]),
        (data, Content) => ({ id, data, Content }),
        { concurrent: true }
      )
    ),
    Stream.runCollect,
    Effect.flatMap(Chunk.get(0)),
    runtime.runPromise
  )

  return (
    <article>
      <div className="border-ds-border border-b">
        <section className="border-ds-border mx-auto max-w-screen-xl md:border-x">
          {data.image && (
            <Image
              className="mx-auto md:rounded-b-md"
              priority={true}
              loading="eager"
              src={data.image}
              alt={data.title}
              height={400}
            />
          )}

          <div className="px-4 py-8">
            <div className="prose lg:prose-lg mx-auto">
              <p>
                <time dateTime={data.pubDate.toDateString()}>
                  {data.pubDate.toLocaleString('en-US', { dateStyle: 'long' })}
                </time>
              </p>
              <h1>{data.title}</h1>
              <p className="text-ds-text/40 text-xl font-semibold">
                {data.description}
              </p>
            </div>
          </div>
        </section>
      </div>

      <section className="border-ds-border mx-auto max-w-screen-xl px-4 py-8 md:border-x">
        <div className="prose lg:prose-lg mx-auto">
          <Content components={{ img: Image }} />
        </div>
      </section>
    </article>
  )
}

export const dynamicParams = false
export default Posts
