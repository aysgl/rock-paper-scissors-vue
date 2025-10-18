<script setup lang="ts">
import type { ChoiceType, GameResultType } from '../../types/game.types'
import BaseButton from '../ui/BaseButton.vue'
import GamePlayer from './GamePlayer.vue'

interface Props {
  userChoice: ChoiceType
  houseChoice: ChoiceType
  result: GameResultType
  hasResult: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  playAgain: []
}>()

function getResultText(result: string): string {
  if (result === 'win') return 'You Win'
  if (result === 'lose') return 'You Lose'
  return 'Tie'
}
</script>

<template>
  <div :class="['game__two', hasResult ? 'game__two--expanded' : '']">
    <!-- You Picked -->
    <div class="game__slide-left">
      <GamePlayer :choice="userChoice" label="You Picked" :is-winner="result === 'win'" />
    </div>

    <!-- Result -->
    <div class="game__center">
      <Transition name="fade">
        <div v-if="hasResult">
          <h1 class="game__lead">{{ getResultText(result) }}</h1>
          <BaseButton variant="primary" size="md" @click="emit('playAgain')">Play Again</BaseButton>
        </div>
      </Transition>
    </div>

    <!-- The House Picked -->
    <div class="game__slide-right">
      <GamePlayer :choice="houseChoice" label="The House Picked" :is-winner="result === 'lose'" />
    </div>
  </div>
</template>
