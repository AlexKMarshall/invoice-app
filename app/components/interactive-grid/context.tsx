import {
  Dispatch,
  RefObject,
  SetStateAction,
  createContext,
  useContext,
} from 'react'

import { Coordinates } from '~/lib/matrix'

type GridContextValue = {
  rovingFocusStop: Coordinates
  setRovingFocusStop: Dispatch<SetStateAction<Coordinates>>
  registerRef: (
    ref: RefObject<HTMLButtonElement>,
    coordinates: Coordinates
  ) => void
}

const GridContext = createContext<GridContextValue | undefined>(undefined)
GridContext.displayName = 'GridContext'
export const Provider = GridContext.Provider

export const useGridContext = () => {
  const context = useContext(GridContext)
  if (!context)
    throw new Error('useGridContext must be used within a GridProvider')
  return context
}
