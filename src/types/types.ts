export enum StorageName {
  Players = 'players',
  Winners = 'winners',
  Prizes = 'prizes'
}

export interface Player {
  id: string;
  name: string;
}

export interface Winner extends Player {
  prize: string;
}