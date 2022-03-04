import http from "./http";

const apiEndPoint = "list.php";

const getList = async () => {
  return await http.get(apiEndPoint);
};

// const createRow = async (data) => {
//   const response = await http.post(data);
//   console.log(response);
//   return response;
// };

// const updateRow = async (data) => {
//   const response = await http.put(data);
//   console.log(response);
//   return response;
// };

// const deleteROw = async (id) => {
//   const response = await http.delete(id);
//   console.log(response);
//   return response;
// };

const reorder = async () => {
  return await http.get("reorder.php");
};

const getFormData = async () => {
  return await http.get("get_form.php?id=67");
};

const submitForm = async (data) => {
  return await http.get("/submit_form.php");
};

export default {
  getList,
  // createRow,
  // updateRow,
  // deleteROw,
  reorder,
  getFormData,
  submitForm,
};
