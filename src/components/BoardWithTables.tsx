import { useState, useEffect, FC } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

interface Table {
  id: string;
  name: string;
  key: string;
}

const BoardWithTables: FC = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const [newTableName, setNewTableName] = useState<string>("");
  const [newTableKey, setNewTableKey] = useState<string>("");
  const [showAddTableInputs, setShowAddTableInputs] = useState<boolean>(false);

  useEffect(() => {
    const savedTables = localStorage.getItem("tables");
    if (savedTables) {
      setTables(JSON.parse(savedTables));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tables", JSON.stringify(tables));
  }, [tables]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const updatedTables = [...tables];
    const [movedTable] = updatedTables.splice(source.index, 1);
    updatedTables.splice(destination.index, 0, movedTable);
    setTables(updatedTables);
  };

  const handleAddTable = () => {
    if (newTableName.trim() === "" || newTableKey.trim() === "") return;

    const newTable: Table = {
      id: `table${tables.length + 1}`,
      name: newTableName,
      key: newTableKey,
    };

    setTables([...tables, newTable]);
    setNewTableName("");
    setNewTableKey("");
    setShowAddTableInputs(false);
  };

  const handleDeleteTable = (tableId: string) => {
    const updatedTables = tables.filter((table) => table.id !== tableId);
    setTables(updatedTables);
  };

  const handleEditTable = (tableId: string, newName: string, newKey: string) => {
    const updatedTables = tables.map((table) =>
      table.id === tableId ? { ...table, name: newName, key: newKey } : table
    );
    setTables(updatedTables);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board">
        <Droppable droppableId="board" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="table-board"
            >
              {tables.map((table, index) => (
                <Draggable key={table.id} draggableId={table.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="table"
                    >  
                      <div className="text">
                        <span>Ustun nomi</span>
                        <input
                          type="text"
                          value={table.name}
                          onChange={(e) => handleEditTable(table.id, e.target.value, table.key)}
                        />
                      </div>
                      <div className="text">
                        <span>Key</span>
                        <input
                          type="text"
                          value={table.key}
                          onChange={(e) => handleEditTable(table.id, table.name, e.target.value)}
                        />
                      </div>
                      <button className="delete" onClick={() => handleDeleteTable(table.id)}>
                        <RiDeleteBinLine />
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        {showAddTableInputs ? (
          <div className="add-table">
            <input
              type="text"
              placeholder="Table Name"
              value={newTableName}
              onChange={(e) => setNewTableName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Table Key"
              value={newTableKey}
              onChange={(e) => setNewTableKey(e.target.value)}
            />
            <button className="add" onClick={handleAddTable}>
              <CiCirclePlus className="icon" /> Add Table
            </button>
          </div>
        ) : (
          <button className="add" onClick={() => setShowAddTableInputs(true)}>
            <CiCirclePlus className="icon" /> Add Table
          </button>
        )}
      </div>
    </DragDropContext>
  );
};

export default BoardWithTables;
