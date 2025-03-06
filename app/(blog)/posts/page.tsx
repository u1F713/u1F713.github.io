import { NodeContext } from '@effect/platform-node'
import clsx from 'clsx'
import { Chunk, Effect, Stream } from 'effect'
import type { NextPage } from 'next'
import Link from 'next/link'
import * as Post from '../Post.ts'

const postTask = Post.collection.pipe(
  Stream.flatMap(post =>
    Stream.map(post.data, data => ({ id: post.id, data }))
  ),
  Stream.runCollect
)

const Posts: NextPage = async () => {
  const posts = await Effect.runPromise(
    postTask.pipe(
      Effect.map(Chunk.sort(Post.order)),
      Effect.provide(NodeContext.layer)
    )
  )

  return (
    <div className="mx-auto w-full max-w-screen-xl">
      <h1 className="px-4 py-10 text-3xl font-semibold lg:px-6 lg:text-5xl">
        Blog posts
      </h1>

      <ul className="grid grid-cols-1 grid-rows-1 gap-[1px] md:grid-cols-2 lg:grid-cols-3">
        {Chunk.toArray(posts).map(({ id, data }) => (
          <li key={id}>
            <Link href={`/${id}`} about="">
              <ArticleCard {...data} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

const ArticleCard = ({ title, description, pubDate, tags }: Post.Schema) => (
  <article
    className={clsx(
      'grid h-full min-h-70 grid-cols-1 grid-rows-[auto_1fr] gap-5 break-words lg:min-h-90',
      'hover:bg-dn-border/40 shadow-dn-border group p-4 shadow-[0_0_0_1px] lg:p-6'
    )}
  >
    <section>
      <p className="mb-2">
        <time dateTime={pubDate.toDateString()}>
          {pubDate.toLocaleString('en-US', { dateStyle: 'long' })}
        </time>
      </p>

      <h3 className="text-2xl lg:text-3xl">{title}</h3>
      <span className="text-dn-color/70 mb-4 font-bold"></span>
    </section>

    <section>
      <p className="group-hover:text-dn-color">{description}</p>
      <ul className="mt-4 flex flex-row-reverse flex-wrap gap-2">
        {tags?.map(tag => (
          <li
            key={tag}
            className="shadow-dn-border rounded-sm p-2 text-sm shadow-[0_0_0_1px]"
          >
            {tag}
          </li>
        ))}
      </ul>
    </section>
  </article>
)

export default Posts
