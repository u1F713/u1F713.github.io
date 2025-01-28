import Image from '@/app/components/Image.tsx'
import { Rehype } from '@/lib/markdown-content/index.ts'
import { render } from '@/lib/markdown-content/render.ts'
import { NodeContext } from '@effect/platform-node'
import { Chunk, Effect, ManagedRuntime, pipe, Stream } from 'effect'
import type { Metadata } from 'next'
import { getPost } from '../utils.ts'

const runtime = ManagedRuntime.make(NodeContext.layer)

type Props = Promise<{
  postId: string
}>

export async function generateMetadata(props: {
  params: Props
}): Promise<Metadata> {
  const { postId } = await props.params
  const { data } = await pipe(
    Stream.filter(getPost, ({ id }) => id === postId),
    Stream.runCollect,
    Effect.flatMap(Chunk.get(0)),
    runtime.runPromise
  )
  return { title: `${data.title} | u1F713`, description: data.description }
}

export function generateStaticParams() {
  const posts = Stream.runCollect(Stream.map(getPost, _ => ({ postId: _.id })))
  return runtime.runPromise(posts).then(Chunk.toArray)
}

async function Posts(props: { params: Props }) {
  const { postId } = await props.params
  const { data, Content } = await Effect.gen(function* () {
    const { data, content } = yield* pipe(
      Stream.runCollect(Stream.filter(getPost, _ => _.id === postId)),
      Effect.flatMap(Chunk.get(0))
    )
    return { data, Content: yield* render(content, [Rehype.plugin]) }
  }).pipe(runtime.runPromise)

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
