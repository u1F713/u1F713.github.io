import Image from '@/app/components/Image'
import {
  compileContent,
  getContent,
  getContentID,
  parseFrontmatter,
  readContentDirectory,
  Rehype
} from '@/lib/markdown-content'
import { NodeContext } from '@effect/platform-node'
import { Chunk, Effect, ManagedRuntime, pipe, Stream } from 'effect'
import { Metadata } from 'next'
import { PostScheme } from '../postScheme'

type Props = Promise<{
  postId: string
}>

const runtime = ManagedRuntime.make(NodeContext.layer)

export function generateStaticParams() {
  const posts = readContentDirectory('app/(blog)/content').pipe(
    Stream.mapEffect(getContentID),
    Stream.map(postId => ({ postId })),
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
    readContentDirectory('app/(blog)/content'),
    Stream.filterEffect(_ => Effect.map(getContentID(_), id => id === postId)),
    Stream.mapEffect(getContent),
    Stream.flatMap(parseFrontmatter(PostScheme)),
    Stream.runCollect,
    Effect.flatMap(Chunk.head),
    runtime.runPromise
  )
  return { title: `${title} | u1F713`, description: description }
}

async function Posts(props: { params: Props }) {
  const { postId } = await props.params

  const { data, Content } = await pipe(
    readContentDirectory('app/(blog)/content'),
    Stream.filterEffect(_ => Effect.map(getContentID(_), id => id === postId)),
    Stream.mapEffect(getContent),
    Stream.flatMap(content =>
      Effect.zipWith(
        parseFrontmatter(PostScheme)(content),
        compileContent(content, [Rehype.plugin]),
        (data, Content) => ({ data, Content }),
        { concurrent: true }
      )
    ),
    Stream.runCollect,
    Effect.flatMap(Chunk.head),
    runtime.runPromise
  )

  return (
    <article>
      <div className="border-dn-border border-b">
        <section className="border-dn-border mx-auto max-w-screen-xl md:border-x">
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
              <p className="text-dn-color/40 text-xl font-semibold">
                {data.description}
              </p>
            </div>
          </div>
        </section>
      </div>

      <section className="border-dn-border mx-auto max-w-screen-xl px-4 py-8 md:border-x">
        <div className="prose lg:prose-lg mx-auto">
          <Content components={{ img: Image }} />
        </div>
      </section>
    </article>
  )
}

export const dynamicParams = false
export default Posts
