import React, { useState, useEffect } from "react";
import { useStateValue } from "../reducer/provider";
import { useNavigate, useParams } from "react-router-dom";
import { types } from "../reducer/reducer";
import InputFields from "../components/InputFields";
import Loader from "../components/Loader";
import listService from "../service/listService";
import { toast } from "react-toastify";

const CreateForm = () => {
  const [state, dispatch] = useStateValue();
  const [loader, setLoader] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.id === "new")
      return dispatch({
        type: types.set_selectedRow,
        selectedRow: {},
      });
  }, [params.id]);

  console.log(state.selectedRow);

  const [name, setName] = useState(state.selectedRow?.name || "");
  const [feedBackMessage, setFeedBackMessage] = useState(
    state.selectedRow?.message || ""
  );
  const [submissionDate, setSubmissionDate] = useState(
    state.selectedRow?.created_at || new Date().toISOString().split("T")[0]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    setTimeout(async () => {
      try {
        const { data: submittedData } = await listService.submitForm({
          name,
          feedBackMessage,
          submissionDate,
        });
        console.log(submittedData);
        setLoader(false);

        if (submittedData) toast.success("Updated successfully");

        return navigate("/");
      } catch (error) {
        toast.error(error);
        setLoader(false);
      }
    }, 1000);
  };

  return (
    <div className="w-full max-w-xs">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-gray-100"
        onSubmit={handleSubmit}
      >
        {state.selectedRow?.id && (
          <div className="mb-4">
            <InputFields
              label="ID"
              name="id"
              placeholder="ID"
              type="text"
              value={state.selectedRow?.id}
              disabled={state.selectedRow?.id}
            />
          </div>
        )}
        <div className="mb-4">
          <InputFields
            label="Name"
            name="name"
            validate={{ pattern: "[a-zA-Z]+[ ]?[a-zA-Z]+" }}
            placeholder="Full Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required={true}
            disabled={state.selectedRow?.name}
          />
        </div>
        <div className="mb-4">
          <InputFields
            label="Feedback Message"
            name="feedBackMessage"
            placeholder="Feedback Message"
            type="textarea"
            value={feedBackMessage}
            onChange={(e) => setFeedBackMessage(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <InputFields
            label="Submission Date"
            name="submissionDate"
            placeholder="Submission Date"
            type="text"
            value={submissionDate}
            disabled
            onChange={(e) => setSubmissionDate(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 bg-white hover:bg-blue-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
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

export default CreateForm;
