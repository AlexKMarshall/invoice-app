import { ReactNode, useLayoutEffect } from 'react'

export const surface = (Story: any) => (
  <Surface>
    <Story />
  </Surface>
)

function Surface({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    const body = document.querySelector('body')
    body?.classList.add('surface4')

    return () => {
      body?.classList.remove('surface4')
    }
  }, [])

  return <>{children}</>
}
