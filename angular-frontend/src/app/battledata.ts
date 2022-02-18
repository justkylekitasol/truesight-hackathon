export interface IBattleData {
  id: number,
  team: string,
  playerId: string,
  opponent: string,
  position: string,
  champion: string,
  kills: number,
  deaths: number,
  assists: number,
  creepScore: number,
  goldEarned: number,
  result: string,
  fraud: boolean
}
