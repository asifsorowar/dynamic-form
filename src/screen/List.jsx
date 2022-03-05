import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import Table from "../components/Table";
import { useStateValue } from "../reducer/provider";
import { types } from "../reducer/reducer";
import listService from "../service/listService";
import _ from "lodash";

const List = () => {
  const [state, dispatch] = useStateValue();
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const sortedList = _.orderBy(
      state.allRows,
      [state.sortColumn.path],
      [state.sortColumn.order]
    );
    dispatch({
      type: types.set_rows,
      rows: sortedList,
    });
  }, [state.sortColumn]);

  useEffect(() => {
    let newRows = [...state.allRows];
    let columns = { ...state.headers };

    let filteredRows = newRows.filter((row) => {
      for (let column in columns) {
        let isMatched = row[column]
          ?.toString()
          .toLowerCase()
          .startsWith(searchValue.toLowerCase());

        if (columns[column].searchable && isMatched) return true;
      }
    });

    dispatch({
      type: types.set_rows,
      rows: filteredRows,
    });
  }, [searchValue]);

  const handleDragResult = async (result) => {
    let newRows = [...state.rows];
    let sourceIndex = result.source.index;
    let destinationIndex = result.destination.index;

    let source = newRows.splice(sourceIndex, 1)[0];
    newRows.splice(destinationIndex, 0, source);

    dispatch({
      type: types.set_rows,
      rows: newRows,
    });

    let { data: reorder } = await listService.reorder();
    console.log("reorder success", reorder);
  };

  return (
    <div>
      <div className="text-left">
        <h1>List:</h1>
        <div className="mt-3">
          <Search
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <Table
            columns={state.headers}
            sortColumn={state.sortColumn}
            data={state.rows}
            handleClick={(item) =>
              dispatch({
                type: types.set_selectedRow,
                selectedRow: item,
              })
            }
            onDragEnd={handleDragResult}
            setSortColumn={(column) =>
              dispatch({
                type: types.set_sortColumn,
                sortColumn: column,
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default List;
