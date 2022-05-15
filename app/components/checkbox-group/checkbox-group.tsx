import { ReactNode, createContext, useContext } from 'react'

type CheckboxGroupContextType = {
  name: string
}

const CheckboxGroupContext = createContext<
  CheckboxGroupContextType | undefined
>(undefined)
CheckboxGroupContext.displayName = 'CheckboxGroupContext'

export function useCheckboxGroup() {
  return useContext(CheckboxGroupContext)
}

type Props = CheckboxGroupContextType & { children: ReactNode }
export function CheckboxGroup({ name, children }: Props): JSX.Element {
  const contextValue = { name }
  return (
    <fieldset>
      <CheckboxGroupContext.Provider value={contextValue}>
        {children}
      </CheckboxGroupContext.Provider>
    </fieldset>
  )
}
