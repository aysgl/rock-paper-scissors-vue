<script setup lang="ts">
import { computed } from 'vue'
import type { ChoiceType } from '../../types/game.types'
import { GAME_ICON_MAP } from '../../constants/gameIcons'
import { useGameStore } from '../../store/gameStore'

type PlayerType = 'user' | 'house'

interface Props {
  choice: ChoiceType
  playerType: PlayerType
}

const { choice, playerType } = defineProps<Props>()

const gameStore = useGameStore()

const isWinner = computed(() => {
  if (!gameStore.gameResult || gameStore.gameResult === 'tie') return false
  return playerType === 'user' ? gameStore.gameResult === 'win' : gameStore.gameResult === 'lose'
})
</script>

<template>
  <div class="game__player">
    <div :class="['game__item', `game__item--${choice}`, { active: isWinner }]">
      <component :is="GAME_ICON_MAP[choice]" />
    </div>
    <h2 class="game__title">{{ playerType === 'user' ? 'You Picked' : 'The House Picked' }}</h2>
    <span>{{ choice }}</span>
  </div>
</template>
