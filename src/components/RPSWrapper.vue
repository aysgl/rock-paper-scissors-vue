<script setup lang="ts">
import PaperSvg from './svg/PaperSvg.vue'
import RockSvg from './svg/RockSvg.vue'
import ScissorsSvg from './svg/ScissorsSvg.vue'
import TriangleSvg from './svg/TriangleSvg.vue'
</script>

<template>
  <div class="rps-wrapper">
    <div class="rps-wrapper-triangle">
      <TriangleSvg />
    </div>

    <div class="rps-wrapper-item paper">
      <PaperSvg />
    </div>
    <div class="rps-wrapper-item scissors">
      <ScissorsSvg />
    </div>
    <div class="rps-wrapper-item rock">
      <RockSvg />
    </div>
  </div>
</template>
