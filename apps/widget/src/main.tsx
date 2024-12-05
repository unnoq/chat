import { render } from 'solid-js/web'
import { Comp } from './Comp'
import classes from './main.module.css'

const CONTAINER_ID = '__unnoq_chat_widget_container__'

if (typeof document !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById(CONTAINER_ID)!
    const root = container.shadowRoot!

    const widget = document.createElement('div')

    root.appendChild(widget)

    render(() => <div class={classes.container}><Comp /></div>, widget)
  })
}
