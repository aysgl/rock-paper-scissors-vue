<script setup lang="ts">
interface Props {
  isOpen: boolean
  size?: 'medium' | 'large'
  title?: string
}

withDefaults(defineProps<Props>(), {
  size: 'medium',
})

const emit = defineEmits<{
  close: []
}>()

const closeModal = () => {
  emit('close')
}
</script>

<template>
  <Transition name="modal">
    <div v-if="isOpen" class="modal-wrapper">
      <!-- Backdrop -->
      <div class="modal__backdrop" @click="closeModal"></div>

      <!-- Modal -->
      <div class="modal__container">
        <div class="modal__panel" :class="`modal__panel--${size}`">
          <!-- Header -->
          <div class="modal__header">
            <h2 v-if="title" class="modal__title">{{ title }}</h2>
            <slot name="header" />
            <button class="modal__close modal__close--header" @click="closeModal">×</button>
          </div>

          <!-- Content -->
          <div class="modal__content">
            <slot />
          </div>

          <!-- Footer -->
          <div class="modal__footer">
            <slot name="footer">
              <button class="modal__close modal__close--footer" @click="closeModal">×</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
