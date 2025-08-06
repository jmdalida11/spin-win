import { Player, StorageName, Winner } from "../types/types";

export const loadPlayers = (): Player[] => {
  const playersString = localStorage.getItem(StorageName.Players);
  return playersString === null ? [] : JSON.parse(playersString);
}

export const loadWinners = (): Winner[] => {
  const winnersString = localStorage.getItem(StorageName.Winners);
  return winnersString === null ? [] : JSON.parse(winnersString);
}

export const loadPrizes = (): string[] => {
  const prizesString = localStorage.getItem(StorageName.Prizes);
  return prizesString === null ? [] : JSON.parse(prizesString);
}

export const loadWheelColor = (): string => {
  const colorString = localStorage.getItem(StorageName.WheelColor);
  return colorString ?? '#3498db';
}

export const randomNumber = (n: number): number => {
  return Math.floor(Math.random() * n);
}