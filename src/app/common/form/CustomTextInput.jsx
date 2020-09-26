import React from "react";

const CustomTextInput = ({
  input,
  width,
  type,
  icon,
  disabled,
  placeholder,
  label,
  meta: { touched, error }
}) => {
  return (
    <div className="field">
      <label className="label is-size-7">{label}</label>
      <div className="control has-icons-left">
        <input
          {...input}
          className={touched && !!error ? "input is-danger is-small is-rounded" : "input is-small is-rounded"}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
        />
        <span className="icon is-small is-left">
            <i className={`fas fa-${icon}`} />
        </span>
      </div>
      {touched && error && <p className="help is-danger">{error}</p>}
    </div>
  );
};

export default CustomTextInput;
