import { getContent, parseFrontmatter } from '@/lib/markdown-content'
import { NodeContext } from '@effect/platform-node'
import clsx from 'clsx'
import { Chunk, Effect, ManagedRuntime, Order, pipe, Stream } from 'effect'
import NextImage from 'next/image'
import Link from 'next/link'
import atomSVG from '../assets/atom-feed.svg'
import { PostScheme } from '../postScheme.ts'

async function Posts() {
  const runtime = ManagedRuntime.make(NodeContext.layer)
  const order = Order.mapInput(
    Order.reverse(Order.Date),
    (posts: PostScheme) => posts.pubDate
  )
  const posts = await pipe(
    getContent('app/(blog)/content'),
    Stream.flatMap(([id, content]) =>
      Effect.map(parseFrontmatter(PostScheme)(content), data => ({
        ...data,
        id
      }))
    ),
    Stream.runCollect,
    Effect.map(Chunk.sort(order)),
    runtime.runPromise
  )

  return (
    <div className="border-ds-border mx-auto h-full w-full max-w-screen-xl md:border-x">
      <div className="flex gap-4 p-4 align-middle">
        <h1 className="text-xl font-semibold lg:text-2xl">All blog posts</h1>
        <a
          className="hover:bg-ds-border/80 group relative rounded-sm p-2"
          href="/atom.xml"
          target="_blank"
        >
          <NextImage width={16} src={atomSVG} alt="web feed" />
          <span
            className={clsx(
              'group-hover:bg-ds-border/80 pointer-events-none invisible absolute group-hover:visible',
              'rounded-sm p-1 text-xs whitespace-nowrap opacity-0 duration-120 group-hover:opacity-100',
              '-translate-x-[calc(50%-8px)] translate-y-2 group-hover:translate-y-1/2'
            )}
            role="dialog"
          >
            Web feed
          </span>
        </a>
      </div>

      <ul className="grid grid-cols-1 grid-rows-1 gap-[1px] md:grid-cols-2 lg:grid-cols-3">
        {Chunk.toArray(posts).map(({ id, ...data }) => (
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
