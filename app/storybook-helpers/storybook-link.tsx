import {
  MouseEventHandler,
  ReactNode,
  RefObject,
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

type LinkActionContextType = {
  eventBoundaryRef: RefObject<HTMLDivElement>
}
const LinkActionContext = createContext<LinkActionContextType | undefined>(
  undefined
)
const useLinkActionContext = () => {
  const context = useContext(LinkActionContext)
  if (!context)
    throw new Error(
      'useLinkActionContext must be used within LinkActionProvider'
    )
  return context
}

type StorybookLinkProps = {
  className?: string
  children: ReactNode
}
export const buildLink = ({ href }: { href: string }) => {
  return forwardRef<HTMLAnchorElement, StorybookLinkProps>(function MockLink(
    { className, children }: StorybookLinkProps,
    ref
  ) {
    const { eventBoundaryRef } = useLinkActionContext()
    const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
      e.preventDefault()
      eventBoundaryRef.current?.dispatchEvent(
        new CustomEvent('would-navigate', { detail: href })
      )
    }

    return (
      <a href={href} ref={ref} onClick={handleClick} className={className}>
        {children}
      </a>
    )
  })
}

type LinkActionWrapperProps = {
  onWouldNavigate?: (event: CustomEvent['detail']) => void
  children: ReactNode
}
export const LinkActionWrapper = ({
  onWouldNavigate,
  children,
}: LinkActionWrapperProps) => {
  const [state, setState] = useState<'loading' | 'ready'>('loading')
  const eventBoundaryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const eventBoundary = eventBoundaryRef.current
    const handleWouldNavigate = (e: Event) => {
      if (e instanceof CustomEvent) {
        onWouldNavigate?.(e.detail)
      }
    }

    if (eventBoundary) {
      eventBoundary.addEventListener('would-navigate', handleWouldNavigate)
      setState('ready')
      return () => {
        eventBoundary.removeEventListener('would-navigate', handleWouldNavigate)
      }
    }
  }, [onWouldNavigate])

  return (
    <LinkActionContext.Provider value={{ eventBoundaryRef }}>
      <div ref={eventBoundaryRef}>
        {state === 'ready' ? children : <div>Loading&hellip;</div>}
      </div>
    </LinkActionContext.Provider>
  )
}
