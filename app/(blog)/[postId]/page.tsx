import CodeBlock from '@/app/components/CodeBlock'
import Image from '@/app/components/Image'
import { NodeContext } from '@effect/platform-node'
import { Chunk, Effect, ManagedRuntime, Stream } from 'effect'
import { Metadata, NextPage } from 'next'
import * as Post from '../Post'

interface Props {
  params: Promise<{ postId: string }>
}

const runtime = ManagedRuntime.make(NodeContext.layer)

const PostPage: NextPage<Props> = async props => {
  const [data, PostContent] = await Effect.gen(function* () {
    const { postId } = yield* Effect.promise(() => props.params)
    return yield* Post.collection.pipe(
      Stream.filter(({ id }) => id === postId),
      Stream.flatMap(post => Stream.zip(post.data, post.component)),
      Stream.runCollect,
      Effect.flatMap(Chunk.head)
    )
  }).pipe(runtime.runPromise)

  return (
    <article>
      {data.image && (
        <Image
          className="mx-auto md:rounded-md"
          priority={true}
          loading="eager"
          src={data.image}
          alt={data.title}
          height={400}
        />
      )}

      <section>
        <div className="px-4">
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

      <section className="mx-auto w-full max-w-screen-xl px-4 py-8">
        <div className="prose lg:prose-lg mx-auto">
          <PostContent components={{ img: Image, pre: CodeBlock }} />
        </div>
      </section>
    </article>
  )
}

export const generateStaticParams = () =>
  Post.collection.pipe(
    Stream.map(({ id }) => ({ postId: id })),
    Stream.runCollect,
    Effect.map(Chunk.toArray),
    runtime.runPromise
  )

export const generateMetadata = (props: Props): Promise<Metadata> =>
  Effect.gen(function* () {
    const { postId } = yield* Effect.promise(() => props.params)
    const { title, description } = yield* Post.collection.pipe(
      Stream.filter(({ id }) => id === postId),
      Stream.flatMap(({ data }) => data),
      Stream.runCollect,
      Effect.flatMap(Chunk.head)
    )
    return {
      title: `${title} | u1F713`,
      description: description
    }
  }).pipe(runtime.runPromise)

export const dynamicParams = false
export default PostPage
