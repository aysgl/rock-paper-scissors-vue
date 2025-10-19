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

          // Save game
          await gameStore.savedGame(
            gameStore.userChoice as ChoiceType,
            gameStore.houseChoice as ChoiceType,
            gameStore.gameResult as GameResultType,
          )

          // Update score
          await scoreStore.updateScoreBoard(gameStore.gameResult as GameResultType)
        })
        .catch((error) => {
          console.error('Error getting results:', error)
        })
    }, 2000)
  }

  function getResultText(result?: string): string {
    if (!result) return ''
    if (result === 'win') return 'You Win'
    if (result === 'lose') return 'You Lose'
    return 'Tie'
  }

  return { handlePick, getRandom, getResultText }
}
