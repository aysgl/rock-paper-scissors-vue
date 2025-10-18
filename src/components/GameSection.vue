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
  }, 100)

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
  }, 2000)
}
</script>

<template>
  <div class="game">
    <Transition name="fade" mode="out-in">
      <!-- Step 1: Pick -->
      <div v-if="!userChoice" key="step1" class="game__one">
        <div class="game__triangle">
          <TriangleSvg />
        </div>

        <div class="game__item game__item--paper" @click="handlePick('paper')">
          <PaperSvg color="#3B4262" />
        </div>
        <div class="game__item game__item--scissors" @click="handlePick('scissors')">
          <ScissorsSvg color="#3B4262" />
        </div>
        <div class="game__item game__item--rock" @click="handlePick('rock')">
          <RockSvg color="#3B4262" />
        </div>
      </div>

      <!-- Step 2: Result -->
      <div v-else key="step2" :class="['game__two', result ? 'game__two--expanded' : '']">
        <!-- You Picked -->
        <div class="game__slide-left">
          <div
            :class="['game__item', `game__item--${userChoice}`, result === 'win' ? 'active' : '']"
          >
            <component
              :color="`#3B4262`"
              :is="
                {
                  scissors: ScissorsSvg,
                  paper: PaperSvg,
                  rock: RockSvg,
                }[userChoice as Choice]
              "
            />
          </div>
          <h2 class="game__title">You Picked</h2>
          <span style="font-size: 12px">{{ userChoice }}</span>
        </div>

        <!-- Result -->
        <div class="game__center">
          <Transition name="fade">
            <div v-if="result">
              <h1 class="game__lead">
                {{ result === 'win' ? 'You Win' : result === 'lose' ? 'You Lose' : 'Tie' }}
              </h1>

              <button class="game__button" @click="playAgain">Play Again</button>
            </div>
          </Transition>
        </div>

        <!-- The House Picked -->
        <div class="game__slide-right">
          <div
            :class="['game__item', `game__item--${houseChoice}`, result === 'lose' ? 'active' : '']"
          >
            <component
              :color="`#3B4262`"
              :is="
                {
                  scissors: ScissorsSvg,
                  paper: PaperSvg,
                  rock: RockSvg,
                }[houseChoice as Choice]
              "
            />
          </div>
          <h2 class="game__title">The House Picked</h2>
          <span style="font-size: 12px">{{ houseChoice }}</span>
        </div>
      </div>
    </Transition>
  </div>
</template>
