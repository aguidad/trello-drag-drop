import classNames from "classnames";
import React, { memo } from "react";
import { useDrop } from "react-dnd";
import Card from "src/components/Card";
import Header from "src/components/Header";
import useUsers from "src/store/users";
import { User, Users } from "../types";

interface ColumnProps {
  users: User[];
  listId: keyof Users;
}

const Column: React.FC<ColumnProps> = memo(({ users, listId }) => {
  const moveUser = useUsers((store) => store.moveUser);

  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: "CARD",
    drop: (item: { id: number; listId: keyof Users }) => {
      if (users.length === 0) {
        moveUser({ from: item.id, to: 0, fromColumn: item.listId, toColumn: listId });
        item.listId = listId;
        item.id = 0;
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div
      ref={dropRef}
      className={classNames(
        "bg-[#cbd5e0]  custom-scrollbar rounded-xl p-2 border border-gray-200",
        "max-lg:flex-shrink-0",
        "w-full lg:w-1/3",
        {
          "bg-blue-50": isOver && canDrop && !users.length,
        }
      )}
    >
      <Header size={users.length} id={listId} />
      {users.length ? (
        users.map((user, index) => {
          return <Card key={user.id} id={index} user={user} listId={listId} moveUser={moveUser} />;
        })
      ) : (
        <div className="p-4 text-center text-gray-400 justify-center items-center flex h-full">Drop here...</div>
      )}
    </div>
  );
});

export default Column;
