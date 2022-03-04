import React, { useState, useEffect } from "react";
import InputFields from "../components/InputFields";
import Loader from "../components/Loader";
import listService from "../service/listService";
import { toast } from "react-toastify";

const GetForm = () => {
  const [loader, setLoader] = useState(false);

  const [data, setData] = useState({});

  const getForm = async () => {
    const { data } = await listService.getFormData();

    setData(data.data.fields[0]);
  };

  useEffect(() => {
    getForm();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    setLoader(true);

    setTimeout(async () => {
      try {
        const { data: submittedData } = await listService.submitForm(data);
        console.log(submittedData);
        if (submittedData) toast.success("Updated successfully");
      } catch (error) {
        toast.error(error);
      }

      setLoader(false);
    }, 1000);
  };

  const createValidation = (validation) => {
    if (!validation) return null;

    let validate = {};

    let textSplit = validation.split("|");

    if (textSplit[0].includes("int")) validate["pattern"] = "[0-9]*";
    if (textSplit[0].includes("only_letters"))
      validate["pattern"] = "[a-zA-Z]+[ ]?[a-zA-Z]+";
    if (textSplit[0].includes("email"))
      validate["pattern"] =
        "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$";
    if (textSplit[0].includes("only_letter_number"))
      validate["pattern"] = "[A-Za-z0-9]*";

    if (textSplit.length > 1) {
      if (textSplit[1].includes("max"))
        validate["max"] = textSplit[1].split(":")[1];

      if (textSplit[1].includes("min"))
        validate["min"] = textSplit[1].split(":")[1];
    }

    return validate;
  };

  return (
    <div className="w-full max-w-xs">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-gray-100"
        onSubmit={handleSubmit}
      >
        {Object.keys(data)?.map((key) => (
          <div className="mb-4" key={key}>
            <InputFields
              name={key}
              label={data[key].title}
              type={data[key].type}
              placeholder={data[key].title}
              value={data[key].value}
              validate={createValidation(data[key].validate)}
              options={data[key].options ? data[key].options : []}
              defaultValue={data[key].value || data[key].default}
              data={data[key].repeater_fields ? data[key].repeater_fields : []}
              onChange={(e) => {
                return setData({
                  ...data,
                  [e.target.name]: {
                    ...data[e.target.name],
                    value: e.target.value,
                  },
                });
              }}
              required={data[key].required}
            />
          </div>
        ))}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loader}
          >
            {loader && <Loader />}
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default GetForm;
