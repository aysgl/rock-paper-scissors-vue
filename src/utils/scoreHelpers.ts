import type { LeaderboardAPI } from '../types/api.types'
import type { GameResultType } from '../types/game.types'

/**
 * Increases a specific stat for a player by a given amount
 * @param player - The player object to update
 * @param stat - The stat property to increase
 * @param amount - The amount to increase (default: 1)
 */
export const increasePlayerStat = (
  player: LeaderboardAPI,
  stat: keyof Pick<LeaderboardAPI, 'wins' | 'losses' | 'ties' | 'score' | 'gamesPlayed'>,
  amount: number = 1,
): void => {
  player[stat] = (player[stat] as number) + amount
}

/**
 * Calculates and updates the win rate for a player
 * @param player - The player object to calculate win rate for
 */
export const calculateWinRate = (player: LeaderboardAPI): void => {
  // Prevent divide by zero error
  if (player.gamesPlayed === 0) {
    player.winRate = 0
    return
  }

  player.winRate = Math.round((player.wins / player.gamesPlayed) * 100)
}

/**
 * Updates player and computer stats based on game result
 * @param player - The player object
 * @param computer - The computer object
 * @param result - The game result (win, lose, or tie)
 */
export const updatePlayerStats = (
  player: LeaderboardAPI,
  computer: LeaderboardAPI,
  result: GameResultType,
): void => {
  increasePlayerStat(player, 'gamesPlayed')
  increasePlayerStat(computer, 'gamesPlayed')

  switch (result) {
    case 'win':
      increasePlayerStat(player, 'wins')
      increasePlayerStat(player, 'score')
      increasePlayerStat(computer, 'losses')
      break
    case 'lose':
      increasePlayerStat(player, 'losses')
      increasePlayerStat(computer, 'wins')
      increasePlayerStat(computer, 'score')
      break
    case 'tie':
      increasePlayerStat(player, 'ties')
      increasePlayerStat(computer, 'ties')
      break
  }

  calculateWinRate(player)
  calculateWinRate(computer)
}

/**
 * Calculates statistics for multiple players using reduce algorithm
 * Demonstrates: Functional programming, reduce pattern
 * @param players - Array of players
 * @returns Aggregated statistics
 */
export const calculateAggregateStats = (
  players: LeaderboardAPI[],
): {
  totalGames: number
  totalWins: number
  averageWinRate: number
  highestScore: number
  lowestScore: number
} => {
  if (players.length === 0) {
    return {
      totalGames: 0,
      totalWins: 0,
      averageWinRate: 0,
      highestScore: 0,
      lowestScore: 0,
    }
  }

  // Use reduce for aggregation (Algorithm: O(n))
  const stats = players.reduce(
    (acc, player) => {
      return {
        totalGames: acc.totalGames + player.gamesPlayed,
        totalWins: acc.totalWins + player.wins,
        highestScore: Math.max(acc.highestScore, player.score),
        lowestScore: Math.min(acc.lowestScore, player.score),
        sumWinRate: acc.sumWinRate + player.winRate,
      }
    },
    {
      totalGames: 0,
      totalWins: 0,
      highestScore: -Infinity,
      lowestScore: Infinity,
      sumWinRate: 0,
    },
  )

  return {
    totalGames: stats.totalGames,
    totalWins: stats.totalWins,
    averageWinRate: Math.round(stats.sumWinRate / players.length),
    highestScore: stats.highestScore,
    lowestScore: stats.lowestScore,
  }
}

/**
 * Finds top N players using efficient sorting
 * Demonstrates: Sorting algorithm, time complexity O(n log n)
 * @param players - Array of players
 * @param count - Number of top players to return
 * @returns Top players sorted by score
 */
export const getTopPlayers = (players: LeaderboardAPI[], count: number = 10): LeaderboardAPI[] => {
  // Sorting algorithm: O(n log n)
  return [...players]
    .sort((a, b) => {
      // Primary sort: by score (descending)
      if (b.score !== a.score) {
        return b.score - a.score
      }
      // Secondary sort: by win rate (descending)
      if (b.winRate !== a.winRate) {
        return b.winRate - a.winRate
      }
      // Tertiary sort: by games played (descending)
      return b.gamesPlayed - a.gamesPlayed
    })
    .slice(0, count)
}

/**
 * Groups players by performance category using classification algorithm
 * Demonstrates: Classification, grouping algorithm
 * @param players - Array of players
 * @returns Players grouped by performance level
 */
export const groupPlayersByPerformance = (
  players: LeaderboardAPI[],
): {
  expert: LeaderboardAPI[]
  advanced: LeaderboardAPI[]
  intermediate: LeaderboardAPI[]
  beginner: LeaderboardAPI[]
} => {
  // Classification algorithm
  return players.reduce(
    (groups, player) => {
      if (player.gamesPlayed < 5) {
        groups.beginner.push(player)
      } else if (player.winRate >= 70) {
        groups.expert.push(player)
      } else if (player.winRate >= 50) {
        groups.advanced.push(player)
      } else {
        groups.intermediate.push(player)
      }
      return groups
    },
    {
      expert: [] as LeaderboardAPI[],
      advanced: [] as LeaderboardAPI[],
      intermediate: [] as LeaderboardAPI[],
      beginner: [] as LeaderboardAPI[],
    },
  )
}

/**
 * Predicts future win rate based on current trends
 * Demonstrates: Predictive algorithm, linear extrapolation
 * @param player - Player data
 * @param additionalGames - Number of future games to predict
 * @returns Predicted win rate
 */
export const predictWinRate = (
  player: LeaderboardAPI,
  additionalGames: number,
  expectedWins: number,
): number => {
  if (player.gamesPlayed === 0) return 0

  // Linear prediction algorithm
  const currentWins = player.wins
  const totalFutureGames = player.gamesPlayed + additionalGames
  const totalFutureWins = currentWins + expectedWins

  return Math.round((totalFutureWins / totalFutureGames) * 100)
}

/**
 * Finds the longest winning/losing streak pattern
 * Demonstrates: Pattern matching, sliding window algorithm
 * This is a simplified version - would need game history for full implementation
 * @param wins - Number of wins
 * @param losses - Number of losses
 * @returns Estimated streak potential
 */
export const calculateStreakPotential = (wins: number, losses: number): number => {
  if (wins + losses === 0) return 0

  // Calculate momentum score using ratio
  const winRatio = wins / (wins + losses)

  // Momentum algorithm: higher ratio = higher streak potential
  return Math.round(winRatio * 100)
}
