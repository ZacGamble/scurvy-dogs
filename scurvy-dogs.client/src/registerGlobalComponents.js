export function registerGlobalComponents(root) {
  // https://webpack.js.org/guides/dependency-management/#require-context
  // @ts-ignore
  const components = import.meta.globEager('./components/*.vue')
  Object.entries(components).forEach(([fileName, component]) => {
    const componentName = component.name || fileName
      .substr(fileName.lastIndexOf('/') + 1)
      .replace(/\.\w+$/, '')
    // Register component on this Vue instance
    root.component(componentName, component.default)
  })
}
