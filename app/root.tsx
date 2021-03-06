import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
} from 'remix'
import type { LinksFunction, LoaderFunction, MetaFunction } from 'remix'

import { getUser } from './session.server'
import sassStylesheetUrl from './styles/sass-output/main.css'
import tailwindStylesheetUrl from './styles/tailwind.css'

export const links: LinksFunction = () => {
  return [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Spartan:wght@500;700&display=swap',
    },
    { rel: 'stylesheet', href: tailwindStylesheetUrl },
    { rel: 'stylesheet', href: sassStylesheetUrl },
  ]
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Remix Notes',
  viewport: 'width=device-width,initial-scale=1',
})

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>
}

export const loader: LoaderFunction = async ({ request }) => {
  return json<LoaderData>({
    user: await getUser(request),
  })
}

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full surface4">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
