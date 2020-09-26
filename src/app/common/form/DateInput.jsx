import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.min.css";
import "./customDatePickerWidth.css";

const DateInput = ({
  input: { value, onChange, onBlur, name },
  width,
  defaultSelected,
  minDate,
  label,
  placeholder,
  fullwidth,
  meta: { touched, error },
  ...rest
}) => {
  return (
    <div className="field">
      <label className="label" htmlFor={name}>{label}</label>
      <div className={fullwidth === true ? "control customDatePickerWidth" : "control"}>
        <DatePicker
          {...rest}
          id={name}
          className="input"
          dateFormat="yyyy/MM/dd"
          placeholderText={placeholder}
          minDate={minDate}
          selected={value ? Date.parse(value) : Date.parse(defaultSelected)}
          onChange={(value) => onChange(value)}
          onBlur={(e, val) => onBlur(val)}
        />
      </div>
      {touched && error && <p className="help is-danger">{error}</p>}
    </div>
  );
};

export default DateInput;
