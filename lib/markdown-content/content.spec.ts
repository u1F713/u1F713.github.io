import { FileSystem } from '@effect/platform'
import { NodeContext } from '@effect/platform-node'
import { describe, expect, it } from '@effect/vitest'
import { Effect, pipe, Schema } from 'effect'
import { compileContent, parseFrontmatter } from './compiler.ts'

describe('compiler test-suite', () => {
  const schema = Schema.Struct({
    foo: Schema.String,
    bar: Schema.String
  })

  const filePath = 'lib/markdown-content/mocks/content.md'

  it.effect('should be parse', () =>
    pipe(
      FileSystem.FileSystem,
      Effect.flatMap(fs => fs.readFileString(filePath, 'utf8')),
      Effect.flatMap(parseFrontmatter(schema)),
      Effect.map(_ => expect(_).toStrictEqual({ foo: 'foo', bar: 'bar' })),
      Effect.provide(NodeContext.layer)
    )
  )

  it.effect('should compile', () => compileContent(filePath))
})
