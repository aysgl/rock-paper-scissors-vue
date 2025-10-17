<script setup lang="ts">
import { ref } from 'vue'
import PaperSvg from './svg/PaperSvg.vue'
import RockSvg from './svg/RockSvg.vue'
import ScissorsSvg from './svg/ScissorsSvg.vue'
import TriangleSvg from './svg/TriangleSvg.vue'

type Choice = 'paper' | 'scissors' | 'rock'

const userChoice = ref<Choice | null>(null)
const houseChoice = ref<Choice | null>(null)
const result = ref<string>('')

function getRandom() {
  const choices = ['paper', 'scissors', 'rock']
  return choices[Math.floor(Math.random() * choices.length)] as Choice
}

function playAgain() {
  userChoice.value = null
  houseChoice.value = null
  result.value = ''
}

function handlePick(choice: Choice | null) {
  userChoice.value = choice
  houseChoice.value = getRandom()

  const interval = setInterval(() => {
    houseChoice.value = getRandom()
  }, 400)

  setTimeout(() => {
    clearInterval(interval)
    houseChoice.value = getRandom()
    if (userChoice.value === houseChoice.value) {
      result.value = 'tie'
    } else if (
      (userChoice.value === 'rock' && houseChoice.value === 'scissors') ||
      (userChoice.value === 'paper' && houseChoice.value === 'rock') ||
      (userChoice.value === 'scissors' && houseChoice.value === 'paper')
    ) {
      result.value = 'win'
    } else {
      result.value = 'lose'
    }
  }, 1000)
}
</script>

<template>
  <div class="rps">
    <Transition name="fade" mode="out-in">
      <!-- Step 1: Pick -->
      <div v-if="!userChoice" key="step1" class="rps-one">
        <div class="rps-one-triangle">
          <TriangleSvg />
        </div>

        <div class="rps-one-item paper" @click="handlePick('paper')">
          <PaperSvg />
        </div>
        <div class="rps-one-item scissors" @click="handlePick('scissors')">
          <ScissorsSvg />
        </div>
        <div class="rps-one-item rock" @click="handlePick('rock')">
          <RockSvg />
        </div>
      </div>

      <!-- Step 2: Result -->
      <div v-else key="step2" class="rps-two">
        <!-- You Picked -->
        <div class="slide-in-right">
          <h2 class="rps-title">You Picked</h2>
          <span style="font-size: 12px">{{ userChoice }}</span>
          <div :class="['rps-two-item', userChoice, result === 'win' ? 'active' : '']">
            <component
              :is="
                {
                  scissors: ScissorsSvg,
                  paper: PaperSvg,
                  rock: RockSvg,
                }[userChoice as Choice]
              "
            />
          </div>
        </div>

        <!-- Result -->
        <div class="rps-center">
          <div v-if="result">
            <h1 class="rps-lead">
              {{ result === 'win' ? 'You Win' : result === 'lose' ? 'You Lose' : 'Tie' }}
            </h1>

            <button class="rps-button" @click="playAgain">Play Again</button>
          </div>
        </div>

        <!-- The House Picked -->
        <div class="slide-in-left">
          <h2 class="rps-title">The House Picked</h2>
          <span style="font-size: 12px">{{ houseChoice }}</span>
          <div :class="['rps-two-item', houseChoice, result === 'lose' ? 'active' : '']">
            <component
              :is="
                {
                  scissors: ScissorsSvg,
                  paper: PaperSvg,
                  rock: RockSvg,
                }[houseChoice as Choice]
              "
            />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
