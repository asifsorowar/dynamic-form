import React, { useState } from "react";
import Input from "./Input";
import MinusIcon from "./MinusIcon";
import PlusIcon from "./PlusIcon";

const Repeater = ({ label, data, value, onChange, name }) => {
  let [state, setState] = useState(setInitialState);

  function setInitialState() {
    let newState = { ...data };
    Object.keys(newState).forEach((key) => {
      newState = { ...newState, [key]: "" };
    });
    return newState;
  }

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

  const handleSubmit = () => {
    for (let key in state)
      if (!state[key]) {
        alert(`${key} can not be empty `);
        return;
      }

    let newValue = [...value];
    newValue.push(state);

    onChange({ target: { name: name, value: newValue } });

    let newState = { ...state };
    Object.keys(state).forEach((key) => {
      newState = { ...newState, [key]: "" };
    });
    setState(newState);
  };

  const handleRemove = (val) => {
    let newValue = [...value];
    let index = newValue.findIndex((item) => item === val);
    newValue.splice(index, 1);

    onChange({ target: { name: name, value: newValue } });
  };

  return (
    <div>
      <h1 className="block text-gray-700 text-sm font-bold mb-2">{label}</h1>
      <div className="flex justify-between items-center">
        {Object.keys(data)?.map((key) => (
          <div key={key}>
            <Input
              name={key}
              label={data[key].title}
              type={data[key].type}
              placeholder={data[key].title}
              value={state[key]}
              validate={createValidation(data[key].validate)}
              options={data[key].options ? data[key].options : []}
              defaultValue={data[key].value || data[key].default}
              // required={data[key].required}
              onChange={(e) => {
                return setState({
                  ...state,
                  [e.target.name]: e.target.value,
                });
              }}
            />
          </div>
        ))}
        <button type="button" onClick={handleSubmit}>
          <PlusIcon />
        </button>
      </div>
      {value?.map((val, index) => (
        <div key={index} className="flex justify-between">
          <div className="flex flex-1">
            {Object.keys(val).map((key) => (
              <span className="inline-block ml-5" key={key}>
                {val[key]}
              </span>
            ))}
          </div>
          <MinusIcon onClick={() => handleRemove(val)} />
        </div>
      ))}
    </div>
  );
};

export default Repeater;
