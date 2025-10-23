import { ref, watch } from 'vue'
import type { ErrorState } from '../types/error.types'

/**
 * Composable for managing error notifications
 * Automatically hides notifications after a timeout
 */
export const useErrorNotification = (
  errorState: () => ErrorState | null,
  autoHideDuration: number = 5000,
) => {
  const showNotification = ref(false)
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  // Watch for error changes
  watch(
    errorState,
    (newError) => {
      if (newError?.hasError) {
        showNotification.value = true

        // Clear existing timeout
        if (timeoutId) {
          clearTimeout(timeoutId)
        }

        // Auto-hide after duration
        timeoutId = setTimeout(() => {
          showNotification.value = false
        }, autoHideDuration)
      }
    },
    { immediate: true },
  )

  const closeNotification = () => {
    showNotification.value = false
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  return {
    showNotification,
    closeNotification,
  }
}
