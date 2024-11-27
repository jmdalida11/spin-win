import { Player, Winner } from "../types/types";

export const loadPlayers = (): Player[] => {
  const playersString = localStorage.getItem('players');
  return playersString === null ? [] : JSON.parse(playersString);
}

export const loadWinners = (): Winner[] => {
  const winnersString = localStorage.getItem('winners');
  return winnersString === null ? [] : JSON.parse(winnersString);
}

export const randomNumber = (n: number): number => {
  return Math.floor(Math.random() * n);
}