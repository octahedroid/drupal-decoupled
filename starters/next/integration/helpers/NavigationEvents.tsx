'use client'

import { syncDrupalPreviewRoutes } from 'drupal-decoupled'
import { useEffect } from 'react'

export default function NavigationEvents() {
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
          [null, undefined, '', '_self'].includes(target.target) &&
          !target.hasAttribute('download')
        ) {
          event.preventDefault()
          syncDrupalPreviewRoutes(url.pathname)
        }
      },
      { signal: controller.signal }
    )

    return () => controller.abort()
  })

  return <></>
}
