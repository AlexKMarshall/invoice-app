import { MouseEventHandler, ReactNode, forwardRef } from 'react'

type StorybookLinkProps = {
  className?: string
  children: ReactNode
}
export const buildLink = ({ href }: { href: string }) => {
  return forwardRef<HTMLAnchorElement, StorybookLinkProps>(function MockLink(
    { className, children }: StorybookLinkProps,
    ref
  ) {
    const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
      e.preventDefault()
      console.log(`Clicked link to ${e.currentTarget.href}`)
    }

    return (
      <a href={href} ref={ref} onClick={handleClick} className={className}>
        {children}
      </a>
    )
  })
}
