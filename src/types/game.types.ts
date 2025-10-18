export type ChoiceType = 'paper' | 'scissors' | 'rock'
export type GameResultType = 'win' | 'lose' | 'tie'
export type GameState = 'idle' | 'playing' | 'animating' | 'result'

export interface Player {
  choice: ChoiceType | null
  score: number
}

export interface GameStatistics {
  gamesPlayed: number
  wins: number
  losses: number
  ties: number
  winRate: number
}

export interface GameConfig {
  animationInterval: number
  animationDuration: number
  choices: readonly ChoiceType[]
}
