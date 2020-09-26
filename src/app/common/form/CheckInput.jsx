import React from "react";

const CheckInput = ({
  input: { onChange, ...input },
  width,
  checked, 
  type,
  label,
  meta: { touched, error }
}) => {
  return (
    <div className="field">
      <div className="control">
        <label className="custom-checkbox">
          {label}
          <input
            type={type}
            checked={checked}
            onChange={value => onChange(value)}
          />
          <span className="checkmark" />
        </label>
      </div>
      {touched && error && <p className="help is-danger">{error}</p>}
    </div>
  );
};

export default CheckInput;
