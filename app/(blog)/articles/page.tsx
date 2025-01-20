import { NodeContext } from '@effect/platform-node'
import clsx from 'clsx'
import { Chunk, ManagedRuntime, Order, Stream } from 'effect'
import Link from 'next/link'
import { ArticleScheme } from '../article-scheme.ts'
import { getArticles } from '../utils.ts'

async function Articles() {
  const runtime = ManagedRuntime.make(NodeContext.layer)
  const entries = await runtime.runPromise(Stream.runCollect(getArticles))
  const sortedEntries = Chunk.sort(
    entries,
    Order.mapInput(
      Order.reverse(Order.Date),
      (article: { data: ArticleScheme }) => article.data.pubDate
    )
  ).pipe(Chunk.toReadonlyArray)

  return (
    <>
      <h1 className="p-4 pt-18 pb-9 text-xl font-semibold lg:p-6 lg:text-2xl">
        All blog posts
      </h1>

      <ul className="grid grid-cols-1 grid-rows-1 gap-[1px] md:grid-cols-2 lg:grid-cols-3">
        {sortedEntries.map(({ data, id }) => (
          <li key={id}>
            <Link href={`/${id}`} about="">
              <ArticleCard {...data} />{' '}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

function ArticleCard({ title, description, pubDate, tags }: ArticleScheme) {
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

export default Articles
