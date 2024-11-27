export interface Player {
  id: string;
  name: string;
  department: string;
}

export interface Winner extends Player {
  prize: string;
}