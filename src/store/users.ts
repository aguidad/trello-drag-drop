import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import dummyData from "src/assets/dummy-data";
import { IMove, User } from "src/types";

interface UsersState {
  applied: User[];
  short: User[];
  interview: User[];
  moveUser: (props: IMove) => void;
}

const useUsers = create<UsersState>()(
  immer((set) => ({
    applied: dummyData.applied as User[],
    short: dummyData.short as User[],
    interview: dummyData.interview as User[],
    moveUser: ({ from, to, fromColumn, toColumn }: IMove) => {
      set((state) => {
        if (fromColumn === toColumn) {
          const column = state[fromColumn];
          const user = column[from];
          column.splice(from, 1);
          column.splice(to, 0, user);
        } else {
          const fromColumnArray = state[fromColumn];
          const toColumnArray = state[toColumn];
          const [user] = fromColumnArray.splice(from, 1);
          toColumnArray.splice(to, 0, user);
        }
      });
    },
  }))
);

export default useUsers;
