export interface User {
  id: number;
  name: string;
  location: string;
  contact_number: string;
  rating: 1 | 2 | 3 | 4 | 5;
  status: "New" | "Followed";
  presence: "online" | "offline" | "idle";
  image: string;
}

export interface Users {
  applied: User[];
  short: User[];
  interview: User[];
}

export interface IMove {
  from: number;
  to: number;
  fromColumn: keyof Users;
  toColumn: keyof Users;
}

export type Action = { type: "MOVE_DIFFERENT_COLUMN" | "MOVE_SAME_COLUMN" } & IMove;
