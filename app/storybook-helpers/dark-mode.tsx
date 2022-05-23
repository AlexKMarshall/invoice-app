import { ReactNode, useLayoutEffect } from 'react'

export const darkMode = (Story: any) => (
  <DarkMode>
    <Story />
  </DarkMode>
)

function DarkMode({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    const body = document.querySelector('body')
    body?.setAttribute('data-theme', 'dark')
    body?.classList.add('dark')

    return () => {
      body?.removeAttribute('data-theme')
      body?.classList.remove('dark')
    }
  }, [])

  return <>{children}</>
}
