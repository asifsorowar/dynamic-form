import React from "react";

const Radio = ({
  name,
  label,
  options,
  onChange,
  defaultValue,
  type,
  value,
}) => {
  return (
    <>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <div className="flex justify-center first:ml-0">
        {options?.map((option) => (
          <div className="form-check form-check-inline ml-2" key={option.key}>
            <input
              className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              name={name}
              type={type}
              id={option.key}
              value={option.key}
              checked={defaultValue === option.key || value === option.key}
              onChange={onChange}
            />
            <label
              className="form-check-label inline-block text-gray-800"
              htmlFor={option.key}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default Radio;
