<script setup lang="ts">
import RulesSvg from '../svg/RulesSvg.vue'
import BaseButton from './BaseButton.vue'
import BaseModal from './BaseModal.vue'
import { injectModal, MODAL_INJECTION_KEYS } from '../../composables/useProvideInject'

const rulesModal = injectModal(MODAL_INJECTION_KEYS.RULES)
</script>

<template>
  <div class="rules">
    <BaseButton variant="outline" size="sm" class="rules__button" @click="rulesModal.open">
      Rules
    </BaseButton>

    <BaseModal
      :isOpen="rulesModal.isOpen.value"
      size="medium"
      title="Rules"
      @close="rulesModal.close"
    >
      <div class="rules__diagram">
        <RulesSvg />
      </div>
    </BaseModal>
  </div>
</template>
