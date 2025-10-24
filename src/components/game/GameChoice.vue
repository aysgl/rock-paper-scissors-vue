<script setup lang="ts">
import type { ChoiceType } from '../../types/game.types'
import { useGameStore } from '../../store/gameStore'
import { useGame } from '../../composables/useGame'
import { GAME_ICON_MAP } from '../../constants/gameIcons'
import PentagonSvg from '../svg/PentagonSvg.vue'

const gameStore = useGameStore()
const { handlePick } = useGame()
</script>

<template>
  <div class="game__one">
    <div class="game__pentagon">
      <PentagonSvg />
    </div>

    <!-- Dynamic rendering from database -->
    <div
      v-for="choice in gameStore.choices"
      :key="choice.id"
      :class="['game__item', `game__item--${choice.id}`]"
      @click="handlePick(choice.id as ChoiceType)"
    >
      <component :is="GAME_ICON_MAP[choice.id as ChoiceType]" />
    </div>
  </div>
</template>
