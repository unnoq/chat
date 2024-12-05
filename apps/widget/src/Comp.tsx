import { createSignal } from 'solid-js'

export function Comp() {
  const [open, setOpen] = createSignal(false)

  return (
    <div>
      <button onClick={() => setOpen(!open())}>{open() ? 'Close' : 'Open'}</button>
      {open() && <div>Hello world</div>}
    </div>
  )
}
