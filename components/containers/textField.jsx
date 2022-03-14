import React, { memo } from 'react';

function TextField({
  value,
  onChange,
  disabled,
  id,
  placeholder,
  onBlur,
  type,
}) {
  return (
    <input
      id={id}
      type={type}
      autoComplete="off"
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      onChange={(e) => onChange(e.target.value, id)}
      onBlur={() => onBlur(id)}
    />
  );
}

export default memo(
  TextField,
  (prevProps, nextProps) => prevProps.value === nextProps.value
);
