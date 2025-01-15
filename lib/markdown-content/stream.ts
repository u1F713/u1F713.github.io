import { FileSystem, Path } from '@effect/platform'
import { Effect, pipe, Stream } from 'effect'

export const getContent = (directoryPath: string) =>
  pipe(
    Stream.fromIterableEffect(
      Effect.flatMap(FileSystem.FileSystem, fs =>
        fs.readDirectory(directoryPath)
      )
    ),
    Stream.filterEffect(f =>
      Effect.map(Path.Path, path => /\.(mdx|md)$/.test(path.extname(f)))
    ),
    Stream.mapEffect(f =>
      Effect.map(Path.Path, path => path.join(directoryPath, f))
    )
  )
