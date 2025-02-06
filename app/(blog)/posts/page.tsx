import {
  getContent,
  getContentID,
  parseFrontmatter,
  readContentDirectory
} from '@/lib/markdown-content'
import { NodeContext } from '@effect/platform-node'
import clsx from 'clsx'
import { Chunk, Effect, ManagedRuntime, Order, pipe, Stream } from 'effect'
import Link from 'next/link'
import { PostScheme } from '../postScheme.ts'

async function Posts() {
  const runtime = ManagedRuntime.make(NodeContext.layer)

  const postsOrder = Order.mapInput(
    Order.reverse(Order.Date),
    (post: { data: PostScheme }) => post.data.pubDate
  )
  const getPost = pipe(
    readContentDirectory('app/(blog)/content'),
    Stream.flatMap(filename =>
      Stream.zipWith(
        getContentID(filename),
        Effect.flatMap(getContent(filename), parseFrontmatter(PostScheme)),
        (id, data) => ({ id, data })
      )
    )
  )

  const posts = await getPost.pipe(
    Stream.runCollect,
    Effect.map(Chunk.sort(postsOrder)),
    runtime.runPromise
  )

  return (
    <div className="border-ds-border mx-auto h-full w-full max-w-screen-xl md:border-x">
      <div className="flex gap-4 p-4 align-middle">
        <h1 className="text-xl font-semibold lg:text-2xl">All blog posts</h1>
      </div>

      <ul className="grid grid-cols-1 grid-rows-1 gap-[1px] md:grid-cols-2 lg:grid-cols-3">
        {Chunk.toArray(posts).map(({ id, data }) => (
          <li key={id}>
            <Link href={`/${id}`} about="">
              <ArticleCard {...data} />{' '}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ArticleCard({ title, description, pubDate, tags }: PostScheme) {
  const formattedDatePubDate = new Intl.DateTimeFormat(navigator.language, {
    dateStyle: 'long'
  }).format(pubDate)

  return (
    <article
      className={clsx(
        'grid h-full min-h-70 grid-cols-1 grid-rows-[auto_1fr] gap-5 break-words lg:min-h-90',
        'hover:bg-ds-border/40 shadow-ds-border group p-4 shadow-[0_0_0_1px] lg:p-6'
      )}
    >
      <section>
        <h3 className="mb-2 text-xl lg:text-3xl">{title}</h3>
        <span className="text-ds-text/70 mb-4 font-bold">
          {formattedDatePubDate}
        </span>
      </section>

      <section>
        <p className="group-hover:text-ds-text">{description}</p>
        <ul className="mt-4 flex flex-row-reverse flex-wrap gap-2">
          {tags?.map(tag => (
            <li
              key={tag}
              className="shadow-ds-border rounded-sm p-2 text-sm shadow-[0_0_0_1px]"
            >
              {tag}
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}

export default Posts
