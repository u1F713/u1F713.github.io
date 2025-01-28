import { FileSystem, Path } from '@effect/platform'
import { compile, run } from '@mdx-js/mdx'
import { Effect, pipe, Schema } from 'effect'
import * as jsxRuntime from 'react/jsx-runtime'
import { Plugin } from 'unified'
import yaml from 'yaml'

const readFile = Effect.fn(function* (filePath: string) {
  const fs = yield* FileSystem.FileSystem
  const file = yield* fs.readFileString(filePath, 'utf8')
  const match = file.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)?.slice(1)

  return Array.isArray(match) === false
    ? yield* Effect.fail(new Error())
    : { frontmatter: yaml.parse(match[0]), content: match[1] }
})

export const getEntry = <A, I>(schema: Schema.Schema<A, I>) =>
  Effect.fn(function* (filePath: string) {
    const path = yield* Path.Path
    const { frontmatter, content } = yield* readFile(filePath)

    return {
      content,
      id: path.parse(filePath).name,
      data: yield* Schema.decode(schema)(frontmatter)
    }
  })

export const render = (
  content: Readonly<string>,
  plugins?: Readonly<Plugin>[]
) =>
  pipe(
    Effect.promise(() =>
      compile(content, {
        outputFormat: 'function-body',
        rehypePlugins: plugins
      })
    ),
    Effect.flatMap(compiled =>
      Effect.promise(() => run(compiled, jsxRuntime).then(_ => _.default))
    )
  )
