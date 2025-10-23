import { ref, computed, type Ref, type ComputedRef } from 'vue'

export interface ModalState {
  isOpen: Ref<boolean>
  open: () => void
  close: () => void
  toggle: () => void
}

export interface ModalOptions {
  initialState?: boolean
  onOpen?: () => void
  onClose?: () => void
}

/**
 * Composable for managing modal state
 * Provides reactive modal state and control methods
 *
 * @param options - Configuration options for the modal
 * @returns Modal state and control methods
 *
 * @example
 * const rulesModal = useModal({
 *   onOpen: () => console.log('Rules modal opened'),
 *   onClose: () => console.log('Rules modal closed')
 * })
 */
export const useModal = (options: ModalOptions = {}): ModalState => {
  const { initialState = false, onOpen, onClose } = options

  const isOpen = ref(initialState)

  const open = () => {
    isOpen.value = true
    onOpen?.()
  }

  const close = () => {
    isOpen.value = false
    onClose?.()
  }

  const toggle = () => {
    if (isOpen.value) {
      close()
    } else {
      open()
    }
  }

  return {
    isOpen,
    open,
    close,
    toggle,
  }
}

/**
 * Composable for managing multiple modals with state
 * Useful when you need to track additional data with modal state
 *
 * @example
 * const { modalState, openModal, closeModal, modalData } = useModalWithData<UserData>()
 */
export const useModalWithData = <T = unknown>() => {
  const isOpen = ref(false)
  const data = ref<T | null>(null) as Ref<T | null>

  const openModal = (modalData?: T) => {
    isOpen.value = true
    if (modalData !== undefined) {
      data.value = modalData
    }
  }

  const closeModal = () => {
    isOpen.value = false
    data.value = null
  }

  const hasData = computed(() => data.value !== null)

  return {
    modalState: isOpen,
    openModal,
    closeModal,
    modalData: data as ComputedRef<T | null>,
    hasData,
  }
}
