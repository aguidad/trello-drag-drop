import classNames from "classnames";
import React, { memo } from "react";
import { useDrag, useDrop } from "react-dnd";
import { MdOutlineSignalCellularAlt } from "react-icons/md";
import { IMove, User, Users } from "../types";
import { FaStar } from "react-icons/fa";

interface Props {
  user: User;
  id: number;
  listId: keyof Users;
  moveUser: (props: IMove) => void;
}

const Card: React.FC<Props> = memo(({ user, id, listId, moveUser }) => {
  const isNew = user.status === "New";

  const [{ isDragging }, dragRef] = useDrag({
    type: "CARD",
    item: { id, listId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, dropRef] = useDrop({
    accept: "CARD",
    hover: (item: { id: number; listId: keyof Users }) => {
      if (item.id !== id || item.listId !== listId) {
        moveUser({ from: item.id, to: id, fromColumn: item.listId, toColumn: listId });
        item.id = id;
        item.listId = listId;
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={(node) => dragRef(dropRef(node))}
      className={classNames({
        "h-44 w-full card shadow-2xl my-5": true,
        "bg-white": !isDragging,
        "border-dashed border-2 border-gray-400 bg-transparent": isDragging,
        "bg-blue-50": isOver && !isDragging,
      })}
    >
      {!isDragging && (
        <div className="card-body relative">
          <div className="flex gap-x-5">
            <div className="flex flex-col justify-center items-center gap-y-3">
              <div className="avatar">
                <div className="mask mask-squircle w-16 h-16">
                  <img src={user.image} className="object-cover w-full h-full" alt={user.name} />
                </div>
              </div>
              <span className="bg-base-200 rounded-xl font-semibold p-2 text-sm flex justify-center items-center gap-x-2">
                {`${user.rating}.0`} <FaStar className="text-warning" />
              </span>
            </div>

            <div className="flex flex-col gap-y-3">
              <div className="flex items-center gap-x-2">
                <MdOutlineSignalCellularAlt
                  className={classNames("text-xl", {
                    "text-error": user.presence === "idle",
                    "text-warning": user.presence === "offline",
                    "text-success": user.presence === "online",
                  })}
                />
                <h2 className="card-title">{user.name}</h2>
              </div>
              <p className="text-gray-400">{user.location}</p>
              <p className="text-gray-400">{user.contact_number}</p>
            </div>
          </div>
          <div
            className={classNames({
              absolute: true,
              "top-4 right-4": isNew,
              "bottom-4 right-4": !isNew,
            })}
          >
            <div
              className={classNames({
                "p-2 px-4 rounded-xl": true,
                "bg-primary text-white": !isNew,
                "bg-base-200 text-primary": isNew,
              })}
            >
              {user.status}
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default Card;
