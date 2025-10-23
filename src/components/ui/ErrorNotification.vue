<script setup lang="ts">
import { computed } from 'vue'
import { injectErrorNotification } from '../../composables/useProvideInject'

// Inject error notification state from parent
const errorState = injectErrorNotification()

// Fallback if no error state is provided
const isVisible = computed(() => {
  if (!errorState) return false
  return errorState.showNotification.value && errorState.currentError.value?.hasError
})

const error = computed(() => errorState?.currentError.value ?? null)

const handleClose = () => {
  errorState?.closeNotification()
}
</script>

<template>
  <Transition name="error-notification">
    <div v-if="isVisible" class="error-notification" role="alert">
      <div class="error-notification__content">
        <div class="error-notification__message">
          <strong>Error</strong>
          <p>{{ error?.message }}</p>
          <span v-if="error?.code" class="error-notification__code">Code: {{ error.code }}</span>
        </div>
        <button class="error-notification__close" @click="handleClose" aria-label="Close error">
          ✕
        </button>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.error-notification {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  max-width: 400px;
  animation: slideIn 0.3s ease-out;

  @media (max-width: 768px) {
    top: 10px;
    right: 10px;
    left: 10px;
    max-width: none;
  }

  &__content {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 16px;
    background: #ff4444;
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &__icon {
    font-size: 24px;
    flex-shrink: 0;
  }

  &__message {
    flex: 1;

    strong {
      display: block;
      font-size: 16px;
      margin-bottom: 4px;
    }

    p {
      font-size: 14px;
      margin: 0;
      line-height: 1.4;
    }
  }

  &__code {
    display: block;
    font-size: 12px;
    opacity: 0.8;
    margin-top: 4px;
  }

  &__close {
    background: transparent;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
    padding: 0;
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    opacity: 0.8;
    transition: opacity 0.2s;

    &:hover {
      opacity: 1;
    }
  }
}

// Transition animations
.error-notification-enter-active,
.error-notification-leave-active {
  transition: all 0.3s ease;
}

.error-notification-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.error-notification-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
