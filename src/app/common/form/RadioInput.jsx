import React from 'react';

const RadioInput = ({ input, selectedVal, label, options }) => {
  const RenderRadio = ({ input, name, item, onChange, selectedVal }) => {
    return (
      <label className='radio'>
        <input
          className='mr-1'
          {...input}
          type='radio'
          value={item.value + ''}
          name={name}
          checked={item.value + '' === selectedVal + ''}
          onChange={(e) => onChange(e)}
        />
        {item.text}
      </label>
    );
  };
  return (
    <div className='mt-4'>
      <label
        className='has-text-weight-semibold'
        htmlFor='headerDetail'
      >
        {label}
      </label>
      <div className='field is-horizontal mt-1'>
        <div className='field-body'>
          <div className='control'>
            {options.map((item, index) => (
              <RenderRadio
                className='mr-1'
                type='radio'
                name={input.name}
                key={index + item.value}
                item={item}
                selectedVal={selectedVal}
                onChange={input.onChange}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadioInput;
