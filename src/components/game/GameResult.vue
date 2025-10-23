<script setup lang="ts">
import BaseButton from '../ui/BaseButton.vue'
import GamePlayer from './GamePlayer.vue'
import { useGame } from '../../composables/useGame'
import { useGameStore } from '../../store/gameStore'

const gameStore = useGameStore()
const { getResultText } = useGame()
</script>

<template>
  <div :class="['game__two', gameStore.gameResult ? 'game__two--expanded' : '']">
    <!-- You Picked -->
    <div class="game__slide-left">
      <GamePlayer :choice="gameStore.userChoice!" player-type="user" />
    </div>

    <!-- Result -->
    <div class="game__center">
      <Transition name="fade">
        <div v-if="gameStore.gameResult">
          <h1 class="game__lead">{{ getResultText(gameStore.gameResult) }}</h1>
          <BaseButton variant="primary" size="md" @click="gameStore.playAgain">
            Play Again
          </BaseButton>
        </div>
      </Transition>
    </div>

    <!-- The House Picked -->
    <div class="game__slide-right">
      <GamePlayer :choice="gameStore.houseChoice!" player-type="house" />
    </div>
  </div>
</template>
