import { FileSystem, Path } from '@effect/platform'
import { Effect, pipe, Stream } from 'effect'

export const readContentDirectory = (dirPath: string) =>
  Stream.Do.pipe(
    Stream.bind('fs', () => FileSystem.FileSystem),
    Stream.bind('path', () => Path.Path),
    Stream.flatMap(({ fs, path }) =>
      pipe(
        Stream.fromIterableEffect(fs.readDirectory(dirPath)),
        Stream.filter(file => /\.(mdx|md)$/.test(path.extname(file))),
        Stream.map(file => path.join(dirPath, file))
      )
    )
  )

export const getContentID = (filePath: string) =>
  Effect.map(Path.Path, path => path.parse(filePath).name)

export const getContent = (filePath: string) =>
  Effect.flatMap(FileSystem.FileSystem, fs =>
    fs.readFileString(filePath, 'utf8')
  )
