import React from "react";

const TextInput = ({
  input,
  type,
  className,
  disabled,
  readOnly,
  placeholder,
  label,
  style,
  meta: { touched, error },
}) => (
  <div className="field">
    <label className="label" htmlFor={input.name}>{label}</label>
    <div className={className + " control"}>
      <input
        {...input}
        className={
          touched && !!error
            ? "is-6 input is-danger is-size-6"
            : "input is-size-6"
        }
        id={input.name}
        readOnly={readOnly}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        style={style}
      />
    </div>
    {touched && error && <p className="help is-danger">{error}</p>}
  </div>
);

export default TextInput;
