import React from "react";

const CustomInput = (props) => {
  const { type, label, placeholder, i_id, i_class, name, val, onCh, onBl } =
    props;
  return (
    <div className="form-floating mt-3">
      <input
        type={type}
        className={`form-control form-control-sm ${i_class ? i_class : ""}`}
        id={i_id}
        placeholder={placeholder}
        name={name}
        value={val}
        onChange={onCh}
        onBlur={onBl}
      />
      <label htmlFor={label} className="form-label">
        {label}
      </label>
    </div>
  );
};

export default CustomInput;
