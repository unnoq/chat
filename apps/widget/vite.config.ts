import { defineConfig } from 'vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import solid from 'vite-plugin-solid'

declare const window: any
declare const document: any

export default defineConfig({
  plugins: [solid(), cssInjectedByJsPlugin({
    injectCodeFunction: function injectCode(cssCode, options) {
      if (typeof document === 'undefined') {
        return
      }

      const CONTAINER_ID = '__unnoq_chat_widget_container__'

      window.addEventListener('DOMContentLoaded', () => {
        const container = document.getElementById(CONTAINER_ID) ?? (() => {
          const container = document.createElement('div')

          container.id = CONTAINER_ID
          container.style.position = 'fixed'
          container.style.bottom = '20px'
          container.style.right = '20px'
          container.style.zIndex = '9999'

          document.body.appendChild(container)

          return container
        })()

        const shadowContainer = container.attachShadow({ mode: 'open' })

        const styleElement = document.createElement('style')

        for (const attribute in options.attributes) {
          styleElement.setAttribute(attribute, options.attributes[attribute])
        }

        styleElement.appendChild(document.createTextNode(cssCode))

        shadowContainer.appendChild(styleElement)
      })
    },
    dev: {
      enableDev: true,
      removeStyleCodeFunction: function removeStyleCode(_id: string) {
        // The 'id' corresponds to the value of the 'data-vite-dev-id' attribute found on the style element. This attribute is visible even when the development mode of this plugin is not activated.
      },
    },
  })],
  build: {
    lib: {
      entry: {
        main: './src/main.tsx',
      },
      formats: ['es'],
    },
  },
})
