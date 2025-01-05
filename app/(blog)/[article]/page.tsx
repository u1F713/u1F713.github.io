import Image from '@/app/components/Image.tsx'
import {
  getCollection,
  getEntry,
  render
} from '@/lib/markdown-content/render.ts'
import { Path } from '@effect/platform'
import { NodeContext } from '@effect/platform-node'
import { Effect, ManagedRuntime, pipe } from 'effect'
import { ArticleScheme } from '../article-scheme.ts'

const dirPath = 'app/(blog)/content'
const runtime = ManagedRuntime.make(NodeContext.layer)

export const generateStaticParams = (() => {
  const articles = pipe(
    getCollection(ArticleScheme)(dirPath),
    Effect.map(c => c.map(({ id }) => ({ article: id })))
  )
  return () => runtime.runPromise(articles)
})()

async function Article(props: { params: Promise<{ article: string }> }) {
  const { article } = await props.params

  const { data, Content } = await Effect.gen(function* () {
    const path = yield* Path.Path
    const filePath = path.join(dirPath, `${article}.md`)
    const { data, content } = yield* getEntry(ArticleScheme)(filePath)

    return { data, Content: yield* render(content) }
  }).pipe(runtime.runPromise)

  return (
    <main>
      {data.image && (
        <Image
          className="mx-auto w-full max-w-screen-md object-cover"
          priority={true}
          loading="eager"
          src={data.image}
          alt={data.title}
        />
      )}
      <div className="prose lg:prose-lg dark:prose-invert mx-auto my-8 px-4 lg:my-16">
        <h1>{data.title}</h1>
        <p className="text-xl font-semibold opacity-50">{data.description}</p>
        <Content components={{ img: Image }} />
      </div>
    </main>
  )
}

export const dynamicParams = false
export default Article
