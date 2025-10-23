import { provide, inject, type InjectionKey, type ComputedRef, type Ref } from 'vue'
import type { ModalState } from './useModal'
import type { ErrorState } from '../types/error.types'

/**
 * Injection keys for provide/inject pattern
 * Using symbols ensures uniqueness and prevents naming conflicts
 */
export const MODAL_INJECTION_KEYS = {
  RULES: Symbol('rulesModal') as InjectionKey<ModalState>,
  LEADERBOARD: Symbol('leaderboardModal') as InjectionKey<ModalState>,
} as const

export const ERROR_INJECTION_KEY = Symbol('errorNotification') as InjectionKey<{
  currentError: ComputedRef<ErrorState | null>
  showNotification: ComputedRef<boolean> | Ref<boolean>
  closeNotification: () => void
}>

/**
 * Provides modal state to child components
 *
 * @param key - Injection key for the modal
 * @param modalState - Modal state to provide
 *
 * @example
 * const rulesModal = useModal()
 * provideModal(MODAL_INJECTION_KEYS.RULES, rulesModal)
 */
export const provideModal = (key: InjectionKey<ModalState>, modalState: ModalState): void => {
  provide(key, modalState)
}

/**
 * Injects modal state from parent component
 *
 * @param key - Injection key for the modal
 * @returns Modal state or throws error if not provided
 *
 * @example
 * const rulesModal = injectModal(MODAL_INJECTION_KEYS.RULES)
 * rulesModal.open()
 */
export const injectModal = (key: InjectionKey<ModalState>): ModalState => {
  const modalState = inject(key)

  if (!modalState) {
    throw new Error(`Modal state not provided for key: ${String(key)}`)
  }

  return modalState
}

/**
 * Provides error notification state to child components
 *
 * @param errorState - Error notification state to provide
 */
export const provideErrorNotification = (errorState: {
  currentError: ComputedRef<ErrorState | null>
  showNotification: ComputedRef<boolean> | Ref<boolean>
  closeNotification: () => void
}): void => {
  provide(ERROR_INJECTION_KEY, errorState)
}

/**
 * Injects error notification state from parent component
 *
 * @returns Error notification state or null if not provided
 */
export const injectErrorNotification = () => {
  return inject(ERROR_INJECTION_KEY, null)
}
