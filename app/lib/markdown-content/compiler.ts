import { compile, run } from '@mdx-js/mdx'
import { Effect, Schema } from 'effect'
import * as jsxRuntime from 'react/jsx-runtime'
import { Plugin } from 'unified'
import yaml from 'yaml'

const frontmatterRegx = /^---\n([\s\S]*?)\n---\n/

export const parseFrontmatter =
  <A, I>(schema: Schema.Schema<A, I>) =>
  (content: string) => {
    const match = content.match(frontmatterRegx)
    return !match
      ? Effect.fail(new Error('frontmatter not found'))
      : Schema.decode(schema)(yaml.parse(match[1]))
  }

export const compileContent = Effect.fn(function* (
  content: Readonly<string>,
  plugins?: Readonly<Plugin>[]
) {
  const compiled = yield* Effect.promise(() =>
    compile(content.replace(frontmatterRegx, ''), {
      outputFormat: 'function-body',
      rehypePlugins: plugins
    })
  )
  return yield* Effect.map(
    Effect.promise(() => run(compiled, jsxRuntime)),
    ({ default: Content }) => Content
  )
})
