import React from "react";

const SelectInput = ({
  input,
  label,
  type,
  placeholder,
  multiple,
  options,
  fullwidth,
  disabled,
  style,
  meta: { touched, error }
}) => {
  return (
    <div className="field">
      <label className="label" htmlFor={input.name}>{label}</label>
      <div className={touched && !!error ? "control is-danger is-expanded" : "control is-expanded"}>
        <div className={fullwidth === true ? "select is-fullwidth": "select"}>
          <select id={input.name} value={input.value} onChange={input.onChange} placeholder={placeholder} multiple={multiple} disabled={disabled} style={style}>
            <option value="">Pilih {label}</option>
            {options &&
              options.map(item => (
                <option key={item.key} value={item.value} style={style}>{item.text}</option>
              ))}
          </select>
        </div>
        {touched && error && <p className="help is-danger">{error}</p>}
      </div>
    </div>
  );
};

export default SelectInput;
