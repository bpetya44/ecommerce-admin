import React from "react";

const CustomInput = (props) => {
  const { type, label, placeholder, i_id, i_class } = props;
  return (
    <div className="form-floating mb-3">
      <input
        type={type}
        className={`form-control ${i_class ? i_class : ""}`}
        id={i_id}
        placeholder={placeholder}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};

export default CustomInput;
