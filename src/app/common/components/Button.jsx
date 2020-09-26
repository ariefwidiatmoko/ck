import React from "react";

export const Button = ({
  type,
  disabled,
  style,
  className,
  loading,
  label,
  icon,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      style={style}
      className={loading ? `${className} is-loading` : className}
    >
      {label}
      <i className={`fas fa-${icon} icon`} />
    </button>
  );
};
