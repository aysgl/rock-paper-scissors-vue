<script setup lang="ts">
import { computed } from 'vue'
import type { ChoiceType } from '../../types/game.types'
import { GAME_ICON_MAP } from '../../constants/gameIcons'

interface Props {
  choice: ChoiceType
  label: string
  isWinner?: boolean
}

withDefaults(defineProps<Props>(), {
  isWinner: false,
})

// Use CSS variable for icon color instead of hard-coded value
const iconColor = computed(() => {
  // Read from CSS variable or fallback
  return (
    getComputedStyle(document.documentElement).getPropertyValue('--rps-text-dark').trim() ||
    '#3B4262'
  )
})
</script>

<template>
  <div class="game__player">
    <div :class="['game__item', `game__item--${choice}`, { active: isWinner }]">
      <component :is="GAME_ICON_MAP[choice]" :color="iconColor" />
    </div>
    <h2 class="game__title">{{ label }}</h2>
    <span class="game__choice-label">{{ choice }}</span>
  </div>
</template>

<style lang="scss" scoped>
.game__choice-label {
  font-size: var(--font-xs);
  color: var(--rps-text-dark);
  text-transform: capitalize;
}
</style>
