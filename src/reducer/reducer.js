export const initialState = {
  allRows: [],
  rows: [],
  headers: {},
  selectedRow: {},
  sortColumn: {},
};

export const types = {
  set_all_rows: "SET_ALL_ROWS",
  set_rows: "SET_ROWS",
  set_selectedRow: "SET_SELECTED_ROW",
  set_headers: "SET_HEADERS",
  set_sortColumn: "SET_SORT_COLUMN",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case types.set_all_rows:
      return { ...state, allRows: action.rows };

    case types.set_rows:
      return { ...state, rows: action.rows };

    case types.set_selectedRow:
      return { ...state, selectedRow: action.selectedRow };

    case types.set_headers:
      return { ...state, headers: action.headers };

    case types.set_sortColumn:
      return { ...state, sortColumn: action.sortColumn };

    default:
      return state;
  }
};
