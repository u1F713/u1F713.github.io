import { describe, it } from '@effect/vitest'
import { generateAtomFeed } from '../index.ts'

describe('compiler test-suite', () => {
  it.effect('should compile', () =>
    generateAtomFeed({
      title: '',
      subtitle: '',
      author: { email: '', name: '' },
      links: { canonical: '', self: '' },
      entries: [
        {
          id: '',
          link: '',
          title: '',
          updated: new Date(),
          content: '<p>here</p>'
        }
      ]
    })
  )
})
