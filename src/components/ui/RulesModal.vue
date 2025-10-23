<script setup lang="ts">
import RulesSvg from '../svg/RulesSvg.vue'
import BaseButton from './BaseButton.vue'
import BaseModal from './BaseModal.vue'
import { injectModal, MODAL_INJECTION_KEYS } from '../../composables/useProvideInject'

// Props
interface Props {
  isOpen: boolean
}

defineProps<Props>()

// Inject modal state from parent
const rulesModal = injectModal(MODAL_INJECTION_KEYS.RULES)
</script>

<template>
  <div class="rules">
    <BaseButton variant="outline" size="sm" class="rules__button" @click="rulesModal.open">
      Rules
    </BaseButton>

    <BaseModal :isOpen="isOpen" size="medium" title="Rules" @close="rulesModal.close">
      <div class="rules__diagram">
        <RulesSvg />
      </div>
    </BaseModal>
  </div>
</template>
