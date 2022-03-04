import React from "react";

const TableHeader = ({ columns, sortColumn, setSortColumn }) => {
  const raiseSort = (title, path) => {
    let newSortColumn = { ...sortColumn };
    newSortColumn.path = path;
    if (newSortColumn.title === title)
      newSortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      newSortColumn.title = title;
      newSortColumn.order = "asc";
    }
    setSortColumn(newSortColumn);
  };

  const renderSortColumn = (column) => {
    if (column.title !== sortColumn.title) return null;

    if (sortColumn.order === "asc")
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      );

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-3 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        />
      </svg>
    );
  };

  return (
    <thead className="bg-gray-50 dark:bg-gray-700">
      <tr>
        {Object.keys(columns)?.map((column) => (
          <th
            scope="col"
            className={
              "py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400" +
              `${columns[column].searchable ? " cursor-pointer" : ""}`
            }
            onClick={() =>
              columns[column].searchable
                ? raiseSort(columns[column].title, column)
                : null
            }
            key={column}
          >
            <div className="flex justify-center items-center">
              {columns[column].title}{" "}
              {columns[column].searchable && renderSortColumn(columns[column])}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
