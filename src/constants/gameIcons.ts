import type { Component } from 'vue'
import type { ChoiceType } from '../types/game.types'
import RockSvg from '../components/svg/RockSvg.vue'
import PaperSvg from '../components/svg/PaperSvg.vue'
import ScissorsSvg from '../components/svg/ScissorsSvg.vue'
import LizardSvg from '../components/svg/LizardSvg.vue'
import SpockSvg from '../components/svg/SpockSvg.vue'

export const GAME_ICON_MAP: Record<ChoiceType, Component> = {
  rock: RockSvg,
  paper: PaperSvg,
  scissors: ScissorsSvg,
  lizard: LizardSvg,
  spock: SpockSvg,
}
