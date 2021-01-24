import React from 'react';

const TextInput = ({
  input,
  name,
  type,
  className,
  disabled,
  readOnly,
  autoFocus,
  placeholder,
  label,
  style,
}) => (
  <div className='field'>
    <label className='label' htmlFor={name}>
      {label}
    </label>
    <div className={className + ' control'}>
      <input
        {...input}
        autoFocus={autoFocus}
        className='input is-size-6'
        id={name}
        readOnly={readOnly}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        style={style}
      />
    </div>
  </div>
);

export default TextInput;
