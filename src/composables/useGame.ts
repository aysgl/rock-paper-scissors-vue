import { useGameStore } from '../store/gameStore'
import { useScoreStore } from '../store/scoreStore'
import type { ChoiceAPI } from '../types/api.types'
import type { ChoiceType, GameResultType } from '../types/game.types'

export const useGame = () => {
  const gameStore = useGameStore()
  const scoreStore = useScoreStore()

  function getRandom(): ChoiceType {
    const choices = gameStore?.choices.map((c: ChoiceAPI) => c?.id)
    return choices?.[Math.floor(Math.random() * choices.length)] as ChoiceType
  }

  function handlePick(choice: ChoiceType) {
    gameStore.userChoice = choice

    const interval = setInterval(() => {
      gameStore.houseChoice = getRandom()
    }, 100)

    setTimeout(() => {
      clearInterval(interval)
      gameStore.houseChoice = getRandom()

      gameStore
        .getResults(gameStore.userChoice as ChoiceType, gameStore.houseChoice as ChoiceType)
        .then(async (result) => {
          gameStore.gameResult = result as GameResultType

          try {
            // Save game (non-blocking if fails)
            await gameStore.savedGame(
              gameStore.userChoice as ChoiceType,
              gameStore.houseChoice as ChoiceType,
              gameStore.gameResult as GameResultType,
            )

            // Update score
            await scoreStore.updateScoreBoard(gameStore.gameResult as GameResultType)
          } catch (error) {
            console.error('Error during game flow:', error)
            // Error is already handled by stores, just log here
          }
        })
        .catch((error) => {
          console.error('Error getting results:', error)
          // Reset game state on error
          gameStore.userChoice = null
          gameStore.houseChoice = null
          gameStore.gameResult = null
        })
    }, 2000)
  }

  function getResultText(result?: GameResultType): string {
    switch (result) {
      case 'win':
        return 'You Win'
      case 'lose':
        return 'You Lose'
      case 'tie':
        return 'Tie'
      default:
        return ''
    }
  }

  return { handlePick, getRandom, getResultText }
}
