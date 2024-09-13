import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'
import { LoaderFunctionArgs, json } from '@remix-run/cloudflare'

import NavigationEvents from '~/components/helpers/NavigationEvents'

import './tailwind.css'
import './preview.css'

export const loader = async ({ context }: LoaderFunctionArgs) => {
  return json(
    {
      environment: context.cloudflare.env.ENVIRONMENT,
    },
    { status: 200 }
  )
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  const { environment } = useLoaderData<typeof loader>()

  return (
    <>
      <Outlet />
      {environment === 'preview' && <NavigationEvents />}
    </>
  )
}
