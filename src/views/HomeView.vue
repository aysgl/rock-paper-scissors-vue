<script setup lang="ts">
import GameBoard from '../components/game/GameBoard.vue'
import RulesModal from '../components/ui/RulesModal.vue'
import ScoreBoard from '../components/ui/ScoreBoard.vue'
</script>

<template>
  <main class="welcome">
    <ScoreBoard />
    <GameBoard />
    <RulesModal />
  </main>
</template>
