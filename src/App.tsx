import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Column from "src/components/Column";
import useUsers from "./store/users";

const App: React.FC = () => {
  const { short, interview, applied } = useUsers((store) => store);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col lg:flex-row gap-8 p-5">
        <Column users={applied} listId="applied" />
        <Column users={short} listId="short" />
        <Column users={interview} listId="interview" />
      </div>
    </DndProvider>
  );
};

export default App;
