import Image from '@/app/components/Image.tsx'
import { render } from '@/lib/markdown-content/render.ts'
import { NodeContext } from '@effect/platform-node'
import { Chunk, Effect, ManagedRuntime, pipe, Stream } from 'effect'
import { getArticles } from '../utils.ts'

const runtime = ManagedRuntime.make(NodeContext.layer)

export function generateStaticParams() {
  const articles = Stream.runCollect(
    Stream.map(getArticles, _ => ({ article: _.id }))
  )
  return runtime.runPromise(articles).then(Chunk.toArray)
}

async function Article(props: { params: Promise<{ article: string }> }) {
  const { article } = await props.params
  const { data, Content } = await Effect.gen(function* () {
    const { data, content } = yield* pipe(
      Stream.runCollect(Stream.filter(getArticles, _ => _.id === article)),
      Effect.flatMap(Chunk.get(0))
    )
    return { data, Content: yield* render(content) }
  }).pipe(runtime.runPromise)

  return (
    <main>
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
      <div className="prose lg:prose-lg mx-auto my-8 px-4">
        <h1>{data.title}</h1>
        <p className="text-ds-text/40 text-xl font-semibold">
          {data.description}
        </p>
        <Content components={{ img: Image }} />
      </div>
    </main>
  )
}

export const dynamicParams = false
export default Article
