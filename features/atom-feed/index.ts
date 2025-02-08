import { Effect, Schema } from 'effect'
import { type XmlBuilderOptions, XMLBuilder } from 'fast-xml-parser'

const AtomOptions = Schema.Struct({
  title: Schema.String,
  subtitle: Schema.String,
  links: Schema.Struct({ canonical: Schema.String, self: Schema.String }),
  author: Schema.Struct({ name: Schema.String, email: Schema.String }),
  entries: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      title: Schema.String,
      link: Schema.String,
      content: Schema.String,
      updated: Schema.DateFromSelf
    })
  )
})
type AtomOptions = typeof AtomOptions.Type

export const generateAtomFeed = Effect.fn(function* (opt: AtomOptions) {
  const builderOptions: XmlBuilderOptions = {
    suppressEmptyNode: true,
    processEntities: false,
    ignoreAttributes: false,
    attributeNamePrefix: '_'
  }
  const builder = new XMLBuilder(builderOptions)
  const data = yield* Schema.decode(AtomOptions)(opt)

  return builder.build({
    '?xml': { _version: '1.0', _encoding: 'UTF-8' },

    feed: {
      _xmlns: 'http://www.w3.org/2005/Atom',
      title: data.title,
      subtitle: data.subtitle,
      link: [
        { _href: data.links.self, _rel: 'self' },
        { _href: data.links.canonical }
      ],
      updated: data.entries[0].updated,
      author: data.author,
      entry: data.entries.map(entry => ({
        id: entry.id,
        title: entry.title,
        link: { _href: entry.link },
        updated: entry.updated,
        content: { _type: 'text/html', '#text': `${entry.content}\n` }
      }))
    }
  })
})
