<script setup lang="ts">
import { ref } from 'vue'
import RulesSvg from '../svg/RulesSvg.vue'
import BaseButton from './BaseButton.vue'
import BaseModal from './BaseModal.vue'

const isOpen = ref(false)
</script>

<template>
  <div class="rules">
    <BaseButton variant="outline" size="sm" class="rules__button" @click="isOpen = true">
      Rules
    </BaseButton>

    <BaseModal :isOpen="isOpen" size="medium" title="Rules" @close="isOpen = false">
      <div class="rules__diagram">
        <RulesSvg />
      </div>
    </BaseModal>
  </div>
</template>
