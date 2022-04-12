import { MouseEventHandler, ReactNode, forwardRef } from 'react'

type MockLinkProps = {
  to: string
  children: ReactNode
}
const MockLink = forwardRef<HTMLAnchorElement, MockLinkProps>(
  ({ to, children }: MockLinkProps, ref) => {
    const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
      e.preventDefault()
      console.log(`Clicked link to ${e.currentTarget.href}`)
    }

    return (
      <a href={to} ref={ref} onClick={handleClick}>
        {children}
      </a>
    )
  }
)
MockLink.displayName = 'MockLink'

export default MockLink
