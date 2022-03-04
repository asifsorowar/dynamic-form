import React from "react";
import Select from "./Select";
import Radio from "./Radio";
import Input from "./Input";
import Repeater from "./Repeater";

const InputFields = ({
  label,
  name,
  value,
  onChange,
  type,
  placeholder,
  required = false,
  disabled = false,
  validate,
  options,
  data,
  defaultValue,
}) => {
  return (
    <>
      {type === "textarea" && (
        <>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor={name}
          >
            {label}
          </label>

          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            pattern={validate?.pattern ? validate["pattern"] : null}
            max={validate?.max ? validate["max"] : null}
            min={validate?.min ? validate["min"] : null}
          />
        </>
      )}
      {type === "hidden" && (
        <Input
          label={label}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          validate={validate}
        />
      )}
      {(type === "text" || type === "email" || type === "password") && (
        <Input
          label={label}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          validate={validate}
        />
      )}
      {type === "select" && (
        <Select
          label={label}
          options={options}
          value={value}
          name={name}
          required={required}
          onChange={onChange}
        />
      )}
      {type === "radio" && (
        <Radio
          type={type}
          label={label}
          options={options}
          value={value}
          name={name}
          defaultValue={defaultValue}
          onChange={onChange}
        />
      )}
      {type === "repeater" && (
        <Repeater
          data={data}
          label={label}
          value={value}
          onChange={onChange}
          name={name}
        />
      )}
    </>
  );
};

export default InputFields;
