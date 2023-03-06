import React from "react";
import CustomInput from "../components/CustomInput";

const AddColorCategory = () => {
  return (
    <div>
      <h3 className="mb-4 title">Add Color Category</h3>
      <div>
        <form action="">
          <CustomInput type="color" label="Enter Color Category" />
          <button className="btn btn-primary border-0 rounded-3 my-4">
            Add Color Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColorCategory;
