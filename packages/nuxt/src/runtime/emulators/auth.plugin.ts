import { connectAuthEmulator, getAuth } from 'firebase/auth'
import type { FirebaseApp } from 'firebase/app'
import { logger } from '../logging'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'

/**
 * Setups the auth Emulators
 */
export default defineNuxtPlugin((nuxtApp) => {
  const firebaseApp = nuxtApp.$firebaseApp as FirebaseApp
  if (connectedEmulators.has(firebaseApp)) {
    return
  }

  const {
    public: { vuefire },
  } = useRuntimeConfig()

  const host = vuefire?.emulators?.auth?.host
  const port = vuefire?.emulators?.auth?.port

  if (!host || !port) {
    return
  }

  connectAuthEmulator(getAuth(firebaseApp), `http://${host}:${port}`)
  logger.info(`Auth emulator connected to http://${host}:${port}`)
  connectedEmulators.set(firebaseApp, true)
})

const connectedEmulators = new WeakMap<FirebaseApp, unknown>()
