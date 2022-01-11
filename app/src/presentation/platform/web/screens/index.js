export function setMainRoutes (mainComponent, injector, prefix='/') {
  const router = injector.resolve('Router')
  router.addRoutes(prefix, [
    {
      path: '/',
      action: async () => {
        await import('./base/index.js')
        const component = document.createElement('app-root')
        setMainComponent(mainComponent, component)
      }
    },
  ])
}

function setMainComponent (mainComponent, screenComponent) {
  while (mainComponent.firstChild) mainComponent.firstChild.remove()
  mainComponent.appendChild(screenComponent)
}

