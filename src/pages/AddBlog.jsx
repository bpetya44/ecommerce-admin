import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useNavigate, useLocation } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import { uploadImg, deleteImg } from "../features/upload/uploadSlice";
import {
  createBlog,
  resetState,
  getBlogById,
  updateBlog,
} from "../features/blog/blogSlice";
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

  const location = useLocation();
  const getBlogId = location.pathname.split("/")[3];

  useEffect(() => {
    if (getBlogById) {
      dispatch(getBlogById(getBlogId));
      img.push(blogImages);
    } else {
      dispatch(resetState());
    }
  }, [getBlogId, dispatch]);

  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogCategories());
  }, [dispatch]);

  const blogCategoryState = useSelector(
    (state) => state?.blogCategory?.categories
  );
  //console.log(blogCategoryState);
  const categoryList = blogCategoryState?.map((item, i) => (
    <option key={i} value={item.title}>
      {item.title}
    </option>
  ));

  const newBlog = useSelector((state) => state?.blog);
  const {
    isLoading,
    isSuccess,
    isError,
    createdBlog,
    blogName,
    blogDescription,
    blogCategory,
    blogImages,
    updatedBlog,
  } = newBlog;

  useEffect(() => {
    if (isSuccess && createdBlog) {
      toast.success("Blog Added Successfully!");
    }
    if (isSuccess && updatedBlog) {
      toast.success("Blog Updated Successfully!");
      navigate("/admin/blog-list");
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isLoading, isSuccess, isError, createdBlog, updatedBlog, navigate]);

  const imageState = useSelector((state) => state?.upload?.images);
  //console.log(`imageState: ${imageState}`);
  const img = [];
  imageState.forEach((i) => img.push({ public_id: i.public_id, url: i.url }));
  //console.log(img);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogName || "",
      description: blogDescription || "",
      category: blogCategory || "",
      images: [],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      //console.log(values);
      if (getBlogId) {
        dispatch(updateBlog({ id: getBlogId, data: values }));
        dispatch(resetState());
      } else {
        dispatch(createBlog(values));
        //alert(JSON.stringify(values));
        //toast.success("Product Added Successfully!");
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
          //navigate("/admin/blog-list");
        }, 300);
      }
    },
  });

  useEffect(() => {
    formik.values.images = img;
  }, [blogImages]);

  return (
    <div>
      <h3 className="mb-4 title">{getBlogId ? "Edit" : "Add"} Blog</h3>

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
            {imageState.length === 0 && (
              <div className="text-center">
                <p>No image uploaded</p>
              </div>
            )}

            {imageState.length > 0 &&
              imageState.map((item, i) => (
                <div key={i} className="position-relative">
                  <button
                    type="button"
                    onClick={() => dispatch(deleteImg(item.public_id))}
                    className="btn-close position-absolute top-0 end-0 border-0 bg-white rounded-circle shadow-sm p-0 m-0 text-dark fs-5 fw-bold"
                    // style={{ top: "5px", right: "5px" }}
                  ></button>
                  <img
                    src={item.url}
                    alt=""
                    className="img-fluid"
                    width={200}
                  />
                </div>
              ))}
          </div>

          <button
            type="submit"
            className="btn btn-primary border-0 rounded-3 my-3"
          >
            {getBlogId ? "Edit" : "Add"} Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
