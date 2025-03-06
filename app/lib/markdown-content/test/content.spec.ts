import { NodeContext } from '@effect/platform-node'
import { describe, it } from '@effect/vitest'
import { Effect, Option, Schema } from 'effect'
import { Content, Rehype } from '../index.ts'

describe('compiler test-suite', () => {
  const schema = Schema.Struct({
    foo: Schema.String,
    bar: Schema.String
  })

  const source = 'app/lib/markdown-content/mocks/content.md'

  it.effect('should compile', () =>
    Content.make({
      source,
      plugins: Option.some([...Rehype.plugins]),
      schema: Option.some(schema)
    }).pipe(Effect.provide(NodeContext.layer))
  )
})
