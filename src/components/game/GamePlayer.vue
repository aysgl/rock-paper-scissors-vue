<script setup lang="ts">
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
</script>

<template>
  <div class="game__player">
    <div :class="['game__item', `game__item--${choice}`, { active: isWinner }]">
      <component :is="GAME_ICON_MAP[choice]" color="#3B4262" />
    </div>
    <h2 class="game__title">{{ label }}</h2>
    <span style="font-size: 12px">{{ choice }}</span>
  </div>
</template>
