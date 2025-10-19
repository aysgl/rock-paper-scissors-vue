<script setup lang="ts">
import type { ChoiceType } from '../../types/game.types'
import TriangleSvg from '../svg/TriangleSvg.vue'
import { useGameStore } from '../../store/gameStore'
import { GAME_ICON_MAP } from '../../constants/gameIcons'

const gameStore = useGameStore()

const emit = defineEmits<{
  pick: [choice: ChoiceType]
}>()

function handlePick(choice: ChoiceType) {
  emit('pick', choice)
}
</script>

<template>
  <div class="game__one">
    <div class="game__triangle">
      <TriangleSvg />
    </div>

    <!-- Dynamic rendering from database -->
    <div
      v-for="choice in gameStore.choices"
      :key="choice.id"
      :class="['game__item', `game__item--${choice.id}`]"
      @click="handlePick(choice.id as ChoiceType)"
    >
      <component :is="GAME_ICON_MAP[choice.id as ChoiceType]" color="#3B4262" />
    </div>
  </div>
</template>
