import { defineStore } from 'pinia'
import type { ChoiceType, GameResultType } from '../types/game.types'
import type { ChoiceAPI, RuleAPI } from '../types/api.types'
import { api } from '../api/api'

export const useGameStore = defineStore('gameStore', {
  state: () => ({
    userChoice: null as ChoiceType | null,
    houseChoice: null as ChoiceType | null,
    gameResult: null as GameResultType | null,
    choices: [] as ChoiceAPI[],
    rules: [] as RuleAPI[],
  }),

  actions: {
    async fetchChoices() {
      const { data } = await api.get('/choices')
      this.choices = data
    },

    async fetchRules() {
      const { data } = await api.get('/rules')
      this.rules = data
    },

    async getResults(userChoice: ChoiceType, houseChoice: ChoiceType) {
      if (userChoice === houseChoice) {
        return 'tie'
      }

      const rule = this.rules.find(
        (rule) => rule.winner === userChoice && rule.loser === houseChoice,
      )

      const result = rule ? 'win' : 'lose'

      console.log('Result of the game:', result + ' - ' + userChoice + ' vs ' + houseChoice)
      return result
    },

    async savedGame(userChoice: ChoiceType, houseChoice: ChoiceType, result: GameResultType) {
      await api.post('/games', {
        playerId: Date.now().toString(),
        playerChoice: userChoice,
        houseChoice: houseChoice,
        result: result,
        timestamp: new Date().toISOString(),
      })
      console.log('Game saved:', {
        playerChoice: userChoice,
        houseChoice: houseChoice,
        result: result,
      })
    },

    async playAgain() {
      this.userChoice = null
      this.houseChoice = null
      this.gameResult = null
      console.log('Play Again called')
    },
  },
})
