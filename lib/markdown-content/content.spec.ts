import { NodeContext } from '@effect/platform-node'
import { describe, expect, it } from '@effect/vitest'
import { Chunk, Effect, Stream } from 'effect'
import { getContent } from './stream.ts'

describe('content loader test-suite', () => {
  const content = getContent('lib/markdown-content/mocks').pipe(
    Stream.runCollect,
    Effect.map(Chunk.toReadonlyArray),
    Effect.map(e => expect(e).toBeInstanceOf(Array)),
    Effect.provide(NodeContext.layer)
  )
  it.effect('should load a list of articles', () => content)
})
