import { defineStore } from 'pinia'
import type { ChoiceType, GameResultType } from '../types/game.types'
import type { ChoiceAPI, RuleAPI } from '../types/api.types'
import type { ErrorState } from '../types/error.types'
import { api } from '../api/api'
import { handleError } from '../utils/errorHandler'

export const useGameStore = defineStore('gameStore', {
  state: () => ({
    userChoice: null as ChoiceType | null,
    houseChoice: null as ChoiceType | null,
    gameResult: null as GameResultType | null,
    choices: [] as ChoiceAPI[],
    rules: [] as RuleAPI[],
    isLoading: false,
    error: null as ErrorState | null,
  }),

  actions: {
    async fetchChoices() {
      this.isLoading = true
      this.error = null

      try {
        const { data } = await api.get('/choices')
        this.choices = data
      } catch (error) {
        const apiError = handleError('fetchChoices', error, true)
        this.error = {
          hasError: true,
          message: apiError.message,
          code: apiError.code,
        }
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async fetchRules() {
      this.isLoading = true
      this.error = null

      try {
        const { data } = await api.get('/rules')
        this.rules = data
      } catch (error) {
        const apiError = handleError('fetchRules', error, true)
        this.error = {
          hasError: true,
          message: apiError.message,
          code: apiError.code,
        }
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async getResults(userChoice: ChoiceType, houseChoice: ChoiceType) {
      if (userChoice === houseChoice) {
        return 'tie'
      }

      const rule = this.rules.find(
        (rule) => rule.winner === userChoice && rule.loser === houseChoice,
      )

      const result = rule ? 'win' : 'lose'

      console.log(`Result of the game: ${result} - ${userChoice} vs ${houseChoice}`)
      return result
    },

    async savedGame(userChoice: ChoiceType, houseChoice: ChoiceType, result: GameResultType) {
      try {
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
      } catch (error) {
        // Log error but don't throw - game saving failure shouldn't block gameplay
        handleError('savedGame', error, false)
      }
    },

    async playAgain() {
      this.userChoice = null
      this.houseChoice = null
      this.gameResult = null
      console.log('Play Again called')
    },
  },
})
