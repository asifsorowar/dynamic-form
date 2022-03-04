import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

import { types } from "./reducer/reducer";
import { useStateValue } from "./reducer/provider";
import listService from "./service/listService";

import GetForm from "./screen/GetForm";
import List from "./screen/List";
import CreateForm from "./screen/CreateForm";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [state, dispatch] = useStateValue();

  async function getData() {
    try {
      let { data } = await listService.getList();
      dispatch({
        type: types.set_all_rows,
        rows: data.data.rows,
      });

      let columns = data.data.headers[0];
      dispatch({
        type: types.set_headers,
        headers: columns,
      });

      let fistColumn = columns[Object.keys(data.data.headers[0])[0]];
      fistColumn.order = "asc";
      fistColumn.path = Object.keys(data.data.headers[0])[0];
      fistColumn.content = (item) => {
        return (
          <Link
            to={`/create/${item.id}`}
            className="hover:text-blue-800 text-blue-600 dark:text-blue-500"
          >
            {item[Object.keys(item)[0]]}
          </Link>
        );
      };

      dispatch({
        type: types.set_sortColumn,
        sortColumn: fistColumn,
      });
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className="p-9 pb-0 flex justify-center items-start">
        <Routes>
          <Route path="/" exact element={<List />} />
          <Route path="/get-form" exact element={<GetForm />} />
          <Route path="/create/:id" exact element={<CreateForm />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
