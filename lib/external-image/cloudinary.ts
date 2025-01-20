import { CloudinaryImage } from '@cloudinary/url-gen'
import { scale } from '@cloudinary/url-gen/actions/resize'
import { FetchHttpClient, FileSystem, HttpClient } from '@effect/platform'
import { NodeContext } from '@effect/platform-node'
import { SystemError } from '@effect/platform/Error'
import { Config, Effect, Layer } from 'effect'
import { createHash } from 'node:crypto'
import sharp from 'sharp'

export interface ImageType {
  publicID: string
  width?: number | string | undefined
  height?: number | string | undefined
}

const hashFilename = (filename: string) =>
  createHash('md5', { autoDestroy: true }).update(filename).digest('base64url')

export const readMetadata = (b: ArrayBuffer) =>
  Effect.promise(() => sharp(b).metadata())

export const fetchImage = Effect.fn(function* ({
  publicID,
  width,
  height
}: ImageType) {
  const cloudName = yield* Config.string('CLOUDINARY_CLOUD_NAME')
  const client = yield* HttpClient.HttpClient
  const image = new CloudinaryImage(publicID, { cloudName })
    .format('webp')
    .resize(scale(width, height))
    .toURL()

  return yield* Effect.flatMap(
    client.get(image),
    response => response.arrayBuffer
  )
})

export const cacheImage = Effect.fn(function* (
  filename: string,
  buffer: Uint8Array
) {
  const fs = yield* FileSystem.FileSystem
  const filePath = `cached/${hashFilename(`${filename}`)}`
  const writeImage = fs.writeFile(`public/${filePath}`, buffer)

  const handlerSystemError = (err: SystemError) =>
    Effect.if(err.reason === 'NotFound' && err.method === 'writeFile', {
      onTrue: () => fs.makeDirectory(`public/cached`, { recursive: true }),
      onFalse: () => Effect.die(err)
    })
  yield* Effect.catchTag(writeImage, 'SystemError', err =>
    Effect.flatMap(handlerSystemError(err), () => writeImage)
  )
  return filePath
})

export const cloudinaryLayer = Layer.mergeAll(
  NodeContext.layer,
  FetchHttpClient.layer
)
