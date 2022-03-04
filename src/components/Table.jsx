import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import { DragDropContext } from "react-beautiful-dnd";

const Table = ({
  columns,
  sortColumn,
  setSortColumn,
  data,
  onDragEnd,
  handleClick,
}) => {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-md sm:rounded-lg">
            <DragDropContext onDragEnd={onDragEnd}>
              <table className="min-w-full">
                <TableHeader
                  columns={columns}
                  sortColumn={sortColumn}
                  setSortColumn={setSortColumn}
                />
                <TableBody
                  data={data}
                  columns={columns}
                  handleClick={handleClick}
                />
              </table>
            </DragDropContext>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
