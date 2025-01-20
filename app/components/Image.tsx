import {
  cacheImage,
  cloudinaryLayer,
  fetchImage,
  readMetadata
} from '@/lib/external-image'
import { Effect } from 'effect'
import NextImage from 'next/image'

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string
  alt: string
  priority?: boolean
  loading?: 'eager' | 'lazy'
}

async function Image({ src: publicID, width, height, ...props }: ImageProps) {
  const getCloudinaryImage = Effect.gen(function* () {
    const buffer = yield* fetchImage({ publicID, height, width })
    const metadata = yield* readMetadata(buffer)
    const url = yield* cacheImage(publicID, new Uint8Array(buffer))
    return { url, ...metadata }
  })
  const image = await Effect.runPromise(
    getCloudinaryImage.pipe(Effect.provide(cloudinaryLayer), Effect.scoped)
  )
  if (!image.width || !image.height) {
    throw new Error('Failed to read image metadata')
  }

  return (
    <NextImage
      {...props}
      width={image.width}
      height={image.height}
      src={`/${image.url}`}
    />
  )
}

export default Image
