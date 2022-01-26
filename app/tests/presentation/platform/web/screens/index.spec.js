import { Injectark } from '@knowark/injectarkjs'
import { FACTORIES } from 'factories'
import { setMainRoutes } from 'screens/index.js'

describe('Screens', () => {
  let main = null
  beforeEach(() => {
    main = document.createElement('main')
    main.appendChild(document.createElement('div'))
    document.body.appendChild(main)
  })

  afterEach(() => {
    main.remove()
    main = null
  })

  it("navigates to the application's screens", async () => {
    const config = {}
    const factory = FACTORIES.check(config)
    const injector = new Injectark({ factory })
    const router = injector.resolve('Router')

    main.addEventListener('resolve', (event) => {
      const resource = event.detail.resource
      event.detail[resource] = injector.resolve(resource)
    })

    setMainRoutes(main, injector, '/')

    const testTable = [
      { path: '/', tagName: 'APP-ROOT' }
    ]

    for (const record of testTable) {
      await router.navigate(record.path)
      expect(main.firstChild.tagName).toEqual(record.tagName)
    }
  })
})
