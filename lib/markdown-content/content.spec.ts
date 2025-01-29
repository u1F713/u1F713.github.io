import { FileSystem } from '@effect/platform'
import { NodeContext } from '@effect/platform-node'
import { describe, expect, it } from '@effect/vitest'
import { Chunk, Effect, pipe, Schema, Stream } from 'effect'
import { compileContent, parseFrontmatter } from './render.ts'
import { getContent } from './stream.ts'

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

  it.effect('collection', () =>
    pipe(
      getContent('lib/markdown-content/mocks/'),
      Stream.flatMap(([id, conteny]) =>
        Effect.zipWith(
          parseFrontmatter(schema)(conteny),
          compileContent(conteny),
          (data, Content) => ({ id, data, Content }),
          { concurrent: true }
        )
      ),
      Stream.runCollect,
      Effect.map(Chunk.toReadonlyArray),
      Effect.provide(NodeContext.layer)
    )
  )

  it.effect('should compile', () => compileContent(filePath))
})
