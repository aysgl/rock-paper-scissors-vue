import type { ChoiceType, GameResultType } from './game.types'

/**
 * Choice API response
 */
export interface ChoiceAPI {
  id: ChoiceType
  name: string
}

/**
 * Rule API response
 */
export interface RuleAPI {
  id: string
  winner: ChoiceType
  loser: ChoiceType
  verb: string
}

/**
 * Game history API response
 */
export interface GameAPI {
  id: string
  playerId: string
  playerChoice: ChoiceType
  houseChoice: ChoiceType
  result: GameResultType
  timestamp: string
}

/**
 * Leaderboard entry API response
 */
export interface LeaderboardAPI {
  id: string
  username: string
  score: number
  gamesPlayed: number
  wins: number
  losses: number
  ties: number
  winRate: number
}
