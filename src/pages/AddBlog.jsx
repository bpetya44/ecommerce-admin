import React from "react";
import CustomInput from "../components/CustomInput";
import RichTextEditor from "react-rte";
import { useState } from "react";

const AddBlog = () => {
  const [desc, setDesc] = useState(RichTextEditor.createEmptyValue());
  const handleDescription = (value) => {
    setDesc(value);
  };

  return (
    <div>
      <h3 className="mb-4">Add Blog</h3>
      <div className="">
        <form action="">
          <CustomInput type="text" label="Title" placeholder="Enter Title" />
          <select name="" id="">
            <option value="">Select Category</option>
          </select>
          <RichTextEditor
            value={desc}
            onChange={(e) => {
              handleDescription(e);
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
