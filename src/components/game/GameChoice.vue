<script setup lang="ts">
import type { ChoiceType } from '../../types/game.types'
import PaperSvg from '../svg/PaperSvg.vue'
import RockSvg from '../svg/RockSvg.vue'
import ScissorsSvg from '../svg/ScissorsSvg.vue'
import TriangleSvg from '../svg/TriangleSvg.vue'

const emit = defineEmits<{
  pick: [choice: ChoiceType]
}>()

function handlePick(choice: ChoiceType) {
  console.log('picked choice', choice)
  emit('pick', choice)
}
</script>

<template>
  <div class="game__one">
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
</template>
