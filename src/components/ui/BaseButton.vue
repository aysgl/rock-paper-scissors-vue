<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'outline',
  size: 'md',
  disabled: false,
})

defineEmits<{
  click: []
}>()
</script>

<template>
  <button
    :class="['button', `button--${variant}`, `button--${size}`]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>
