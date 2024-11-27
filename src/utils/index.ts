import { Player } from "../types/types";

export const loadPlayers = (): Player[] => {
  const playersString = localStorage.getItem('players');
  return playersString === null ? [] : JSON.parse(playersString);
}

export const randomNumber = (n: number): number => {
  return Math.floor(Math.random() * n);
}