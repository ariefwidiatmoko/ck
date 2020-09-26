import React from "react";

const RadioInput = ({ input, width, type, label }) => {
  return (
    <div className="field">
      <div class="control">
        <label class="radio custom-check">
          <input {...input} type={type} />{' '}
          {label}
        </label>
      </div>
    </div>
  );
};

export default RadioInput;
