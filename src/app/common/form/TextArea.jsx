import React from "react";

const TextArea = ({
  input,
  width,
  rows,
  type,
  placeholder,
  label,
  style,
  meta: { touched, error }
}) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <textarea
          className={touched && !!error ? "textarea is-danger" : "textarea"}
          rows={rows}
          {...input}
          type={type}
          placeholder={placeholder}
          style={style}
        />
      </div>
      {touched && error && <p className="help is-danger">{error}</p>}
    </div>
  );
};

export default TextArea;
