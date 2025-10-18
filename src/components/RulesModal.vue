<script setup lang="ts">
import { ref } from 'vue'
import RulesSvg from './svg/RulesSvg.vue'

const isOpen = ref(false)
</script>

<template>
  <div class="rules">
    <button class="rules__button" @click="isOpen = true">Rules</button>

    <Transition name="fade">
      <div v-if="isOpen" class="rules__overlay">
        <div class="rules__content">
          <div class="rules__header">
            <h2 class="rules__title">Rules</h2>
            <button class="rules__close rules__close--header" @click="isOpen = false">×</button>
          </div>

          <div class="rules__diagram">
            <RulesSvg />
          </div>

          <div class="rules__footer">
            <button class="rules__close rules__close--footer" @click="isOpen = false">×</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
