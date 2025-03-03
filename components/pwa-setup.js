"use client"

import { useEffect } from "react"

export default function PWASetup() {
  useEffect(() => {
    // Register service worker
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("Service Worker registered with scope:", registration.scope)
          })
          .catch((error) => {
            console.error("Service Worker registration failed:", error)
          })
      })
    }

    // Handle beforeinstallprompt event for custom install button
    let deferredPrompt

    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault()
      // Stash the event so it can be triggered later
      deferredPrompt = e

      // Optionally, show your own install button
      // This could be implemented in a component that uses this stored event
      console.log("App can be installed, showing install button")
    })

    // Add to window object so other components can access it
    window.deferredPrompt = deferredPrompt

    // Handle app installed event
    window.addEventListener("appinstalled", () => {
      console.log("App was installed")
      // Clear the deferredPrompt
      deferredPrompt = null
    })
  }, [])

  return null
}

