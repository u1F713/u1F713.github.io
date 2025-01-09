import { Cloudinary } from '@cloudinary/url-gen'
import { Delivery, Resize } from '@cloudinary/url-gen/actions'
import { auto } from '@cloudinary/url-gen/qualifiers/format'
import { Config, Effect, pipe } from 'effect'
import NextImage from 'next/image'
import sharp from 'sharp'

const getCloudinaryImage = Effect.fn(function* (
  src: string,
  width?: number | string,
  height?: number | string
) {
  const url = yield* Config.string('CLOUDINARY_CLOUD_NAME').pipe(
    Effect.map(cloudName => new Cloudinary({ cloud: { cloudName } })),
    Effect.map(cloud =>
      cloud
        .image(src)
        .delivery(Delivery.format(auto()))
        .resize(height ? Resize.scale().height(height) : Resize.auto())
        .resize(width ? Resize.scale().width(width) : Resize.auto())
        .toURL()
    )
  )
  const meta = yield* pipe(
    Effect.promise(() => fetch(url)),
    Effect.flatMap(res => Effect.promise(() => res.blob())),
    Effect.flatMap(blob => Effect.promise(() => blob.arrayBuffer())),
    Effect.flatMap(buffer => Effect.promise(() => sharp(buffer).metadata()))
  )
  return { url, ...meta }
})

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string
  alt: string
  priority?: boolean
  loading?: 'eager' | 'lazy'
}

async function Image({ src, alt, ...props }: ImageProps) {
  const { url, width, height } = await Effect.runPromise(
    getCloudinaryImage(src, props.width, props.height)
  )
  if (!width || !height) {
    throw new Error('Failed to read image metadata')
  }
  return (
    <NextImage {...props} src={url} alt={alt} width={width} height={height} />
  )
}
export default Image
