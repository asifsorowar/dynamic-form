import React from "react";

const Input = ({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  required,
  disabled,
  validate,
  form,
}) => {
  return (
    <>
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={name}
      >
        {label}
      </label>

      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        pattern={validate?.pattern ? validate["pattern"] : null}
        max={validate?.max ? validate["max"] : null}
        min={validate?.min ? validate["min"] : null}
        form={form}
      />
    </>
  );
};

export default Input;
