import React from "react";
import Multiselect from "react-widgets/lib/Multiselect";
import "react-widgets/dist/css/react-widgets.css";

const MultiSelectInput = ({
  input,
  label,
  placeholder,
  style,
  meta: { touched, error },
  ...rest
}) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className={touched && !!error ? "control is-danger" : "control"}>
        <Multiselect
          placeholder={placeholder}
          {...input}
          value={input.value || []}
          onBlur={() => input.onBlur()}
          style={style}
          {...rest}
        />
      </div>
      {touched && error && <p className="help is-danger">{error}</p>}
    </div>
  );
};

export default MultiSelectInput;
