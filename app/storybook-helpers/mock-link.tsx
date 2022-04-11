import { ReactNode, forwardRef } from 'react'

type MockLinkProps = {
  to: string
  children: ReactNode
}
const MockLink = forwardRef<HTMLAnchorElement, MockLinkProps>(
  ({ to, children }: MockLinkProps, ref) => {
    return (
      <a
        href={to}
        ref={ref}
        onClick={(e) => {
          e.preventDefault()
        }}
      >
        {children}
      </a>
    )
  }
)
MockLink.displayName = 'MockLink'

export default MockLink
