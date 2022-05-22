import { EventHandler, SyntheticEvent } from 'react'

export const callAllEventHandlers =
  <E extends SyntheticEvent>(...handlers: Array<EventHandler<E> | undefined>) =>
  (event: E) => {
    handlers.forEach((handler) => handler?.(event))
  }
