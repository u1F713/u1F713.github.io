import CodeBlock from '@/app/components/CodeBlock'
import Image from '@/app/components/Image'
import { NodeContext } from '@effect/platform-node'
import { Chunk, Effect, ManagedRuntime, pipe, Stream } from 'effect'
import { Metadata, NextPage } from 'next'
import * as Post from '../Post'

interface Props {
  params: Promise<{ postId: string }>
}

const runtime = ManagedRuntime.make(NodeContext.layer)

const PostPage: NextPage<Props> = async props => {
  const { postId } = await props.params
  const [data, PostContent] = await Post.collection.pipe(
    Stream.filter(({ id }) => id === postId),
    Stream.flatMap(post => Stream.zip(post.data, post.component)),
    Stream.runHead,
    Effect.flatten,
    runtime.runPromise
  )

  return (
    <article>
      {data.image && (
        <Image
          className="mx-auto rounded-lg"
          loading="eager"
          priority={true}
          height={400}
          src={data.image}
          alt={data.title}
        />
      )}

      <section className="prose lg:prose-lg mx-auto my-8">
        <h1 className="mb-1">{data.title}</h1>
        <p className="text-dn-color-200/70 mt-0">
          <time dateTime={data.pubDate.toDateString()}>
            {data.pubDate.toLocaleString('en-US', { dateStyle: 'long' })}
          </time>
        </p>
        <p className="text-dn-color/40 text-xl font-semibold">
          {data.description}
        </p>
      </section>

      <section className="prose lg:prose-lg mx-auto">
        <PostContent components={{ img: Image, pre: CodeBlock }} />
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
  pipe(
    Effect.promise(() => props.params),
    Stream.flatMap(({ postId }) =>
      Stream.filter(Post.collection, ({ id }) => id === postId)
    ),
    Stream.flatMap(({ data }) => data),
    Stream.map(({ title, description }) => ({
      title: `${title} | u1F713`,
      description: description
    })),
    Stream.runHead,
    Effect.flatten,
    runtime.runPromise
  )

export const dynamicParams = false
export default PostPage
