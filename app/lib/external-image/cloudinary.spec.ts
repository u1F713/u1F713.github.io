import { describe, it } from '@effect/vitest'
import { Effect, pipe } from 'effect'
import { cacheImage, cloudinaryLayer, fetchImage } from './cloudinary.ts'

describe('cloudinary image loader test-suite', () => {
  const task = pipe(
    fetchImage({ publicID: 'sample', width: 300 }),
    Effect.flatMap(b => cacheImage('sample', new Uint8Array(b))),
    Effect.provide(cloudinaryLayer),
    Effect.scoped
  )
  it.effect('should write file in public folder', () => task)
})
