import { FileSystem, Path } from '@effect/platform'
import { compile, run } from '@mdx-js/mdx'
import { Effect, Option, pipe, Schema, Stream } from 'effect'
import * as jsxRuntime from 'react/jsx-runtime'
import { Plugin } from 'unified'
import yaml from 'yaml'

export type ContentOpts<A, I> = {
  source: string
  schema: Option.Option<Schema.Schema<A, I>>
  plugins: Option.Option<Readonly<Plugin>[]>
}

const frontmatterRegx = /^---\n([\s\S]*?)\n---\n/

const frontmatter =
  (content: string) =>
  <A, I>(schema: Schema.Schema<A, I>) => {
    const match = content.match(frontmatterRegx)
    return !match
      ? Effect.fail(new Error('frontmatter not found'))
      : Schema.decode(schema)(yaml.parse(match[1]))
  }

const compileToJsx = (content: string, plugins?: Readonly<Plugin>[]) =>
  pipe(
    Effect.promise(() =>
      compile(content.replace(frontmatterRegx, ''), {
        outputFormat: 'function-body',
        rehypePlugins: plugins
      })
    ),
    Effect.flatMap(compiled =>
      Effect.promise(() => run(compiled, jsxRuntime).then(_ => _.default))
    )
  )

export const make = Effect.fn(function* <A = undefined, I = undefined>(
  options: ContentOpts<A, I>
) {
  const fs = yield* FileSystem.FileSystem
  const path = yield* Path.Path
  const file = yield* fs.readFileString(options.source, 'utf8')
  const plugins = Option.isNone(options.plugins) ? [] : options.plugins.value

  return {
    id: path.parse(options.source).name,
    data: yield* Option.map(options.schema, frontmatter(file)),
    component: compileToJsx(file, plugins)
  }
})

export const collection = <A, I>(options: ContentOpts<A, I>) =>
  Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem
    const path = yield* Path.Path

    return pipe(
      Stream.fromIterable(yield* fs.readDirectory(options.source)),
      Stream.filter(file => /\.(mdx|md)$/.test(path.extname(file))),
      Stream.map(file => path.join(options.source, file)),
      Stream.mapEffect(file => make({ ...options, source: file }))
    )
  }).pipe(_ => Stream.flatten(_))
