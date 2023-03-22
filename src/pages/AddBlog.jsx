import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import { uploadImg, deleteImg } from "../features/upload/uploadSlice";
import { createBlog, resetState } from "../features/blog/blogSlice";
import { getBlogCategories } from "../features/blogCategory/blogCategorySlice";

//Yup schema
let schema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
});

const AddBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(getBlogCategories());
  }, [dispatch]);

  const blogCategoryState = useSelector(
    (state) => state.blogCategory.categories
  );
  //console.log(blogCategoryState);
  const categoryList = blogCategoryState.map((item, i) => (
    <option key={i} value={item.title}>
      {item.title}
    </option>
  ));

  const imageState = useSelector((state) => state.upload.images);
  //console.log(imageState);
  const img = [];
  imageState.forEach((i) => img.push({ public_id: i.public_id, url: i.url }));
  //console.log(img);
  useEffect(() => {
    formik.values.images = img;
  }, [img]);

  const newBlog = useSelector((state) => state.blog);
  const { isLoading, isSuccess, isError, createdBlog } = newBlog;

  useEffect(() => {
    if (isSuccess && createdBlog) {
      toast.success("Blog Added Successfully!");
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isLoading, isSuccess, isError, createdBlog]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      images: [],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      //console.log(values);
      dispatch(createBlog(values));
      //alert(JSON.stringify(values));
      //toast.success("Product Added Successfully!");
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/blog-list");
      }, 3000);
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Add Blog</h3>

      <div className="">
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex flex-column gap-3"
        >
          {/* Title */}
          <CustomInput
            type="text"
            label="Enter Blog Title"
            name="title"
            onCh={formik.handleChange("title")}
            onBl={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>

          {/* Select Category */}
          <select
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
            className="form-select form-select-sm"
          >
            <option value="">Select Category</option>
            {categoryList}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>

          {/* Description */}
          <div>
            <ReactQuill
              theme="snow"
              name="description"
              onChange={formik.handleChange("description")}
              value={formik.values.description}
            />
          </div>
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>

          {/* Drop image files */}
          <div className="bg-white border-1 p-5 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>

          {/* Show images */}
          <div className="showimages d-flex flex-wrap gap-3">
            {imageState.map((item, i) => (
              <div key={i} className="position-relative">
                <button
                  type="button"
                  onClick={() => dispatch(deleteImg(i.public_id))}
                  className="btn-close position-absolute top-0 end-0 border-0 bg-white rounded-circle shadow-sm p-0 m-0 text-dark fs-5 fw-bold"
                  // style={{ top: "5px", right: "5px" }}
                ></button>
                <img src={item.url} alt="" className="img-fluid" width={200} />
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="btn btn-primary border-0 rounded-3 my-3"
          >
            Add Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
