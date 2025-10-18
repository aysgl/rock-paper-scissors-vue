<script setup lang="ts">
import type { ChoiceType } from '../../types/game.types'
import PaperSvg from '../svg/PaperSvg.vue'
import RockSvg from '../svg/RockSvg.vue'
import ScissorsSvg from '../svg/ScissorsSvg.vue'

interface Props {
  choice: ChoiceType
  label: string
  isWinner?: boolean
}

withDefaults(defineProps<Props>(), {
  isWinner: false,
})

const iconMap = {
  paper: PaperSvg,
  scissors: ScissorsSvg,
  rock: RockSvg,
}
</script>

<template>
  <div class="game__player">
    <div :class="['game__item', `game__item--${choice}`, { active: isWinner }]">
      <component :is="iconMap[choice]" color="#3B4262" />
    </div>
    <h2 class="game__title">{{ label }}</h2>
    <span style="font-size: 12px">{{ choice }}</span>
  </div>
</template>
