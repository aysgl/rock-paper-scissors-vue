<script setup lang="ts">
import PaperSvg from './svg/PaperSvg.vue'
import RockSvg from './svg/RockSvg.vue'
import ScissorsSvg from './svg/ScissorsSvg.vue'
</script>

<template>
  <div class="rps-wrapper">
    <div class="rps-wrapper-item">
      <RockSvg />
    </div>
    <div class="rps-wrapper-item">
      <PaperSvg />
    </div>
    <div class="rps-wrapper-item">
      <ScissorsSvg />
    </div>
  </div>
</template>
