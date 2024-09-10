import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'
import { LoaderFunctionArgs, json } from '@remix-run/cloudflare'
import { syncDrupalPreviewRoutes } from 'drupal-decoupled'

import NavigationEvents from '~/components/helpers/NavigationEvents'

import './tailwind.css'
import './preview.css'
import { useEffect } from 'react'

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

export function useClientNavigationLinks() {
  useEffect(() => {
    const controller = new AbortController()
    document.addEventListener(
      'click',
      (event) => {
        // exit early if we're not in an iframe
        if (window.location === window.parent.location) {
          return
        }

        const target = (event.target as Partial<HTMLElement>).closest?.('a')
        if (!target) {
          return
        }

        const url = new URL(target.href, location.origin)
        if (
          url.origin === window.location.origin &&
          // Ignore clicks with modifiers
          !event.ctrlKey &&
          !event.metaKey &&
          !event.shiftKey &&
          // Ignore right clicks
          event.button === 0 &&
          // Ignore if `target="_blank"`
          [null, undefined, '', 'self'].includes(target.target) &&
          !target.hasAttribute('download')
        ) {
          console.log(
            'Treating anchor as <Link> and navigating to:',
            url.pathname
          )
          event.preventDefault()
          syncDrupalPreviewRoutes(url.pathname)
        }
      },
      { signal: controller.signal }
    )

    return () => controller.abort()
  })
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
