export enum StorageName {
  Players = 'players',
  Winners = 'winners'
}

export interface Player {
  id: string;
  name: string;
}

export interface Winner extends Player {
  prize: string;
}