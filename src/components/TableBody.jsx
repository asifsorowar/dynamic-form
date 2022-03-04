import React from "react";
import _ from "lodash";
import { Draggable, Droppable } from "react-beautiful-dnd";

const TableBody = ({ data, columns, handleClick }) => {
  const renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

  return (
    <Droppable droppableId="tbody">
      {(provided) => (
        <tbody {...provided.droppableProps} ref={provided.innerRef}>
          {data?.map((item, index) => (
            <Draggable
              key={item.id.toString()}
              draggableId={item.id.toString()}
              index={index}
            >
              {(provided) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  {Object.keys(columns)?.map((column) => (
                    <td
                      className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      key={column + item.id}
                      onClick={
                        columns[column].content ? () => handleClick(item) : null
                      }
                    >
                      {renderCell(item, { ...columns[column], path: column })}
                    </td>
                  ))}
                </tr>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </tbody>
      )}
    </Droppable>
  );
};

export default TableBody;
