import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getCategories } from "../features/category/categorySlice";
import { Select } from "antd";
import { getColors } from "../features/color/colorSlice";
import Dropzone from "react-dropzone";
import { uploadImg, deleteImg } from "../features/upload/uploadSlice";
import { createProduct, resetState } from "../features/product/productSlice";

//Yup schema
let schema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  price: yup.number().required("Price is required"),
  brand: yup.string().required("Brand is required"),
  color: yup
    .array()
    .min(1, "Pick at least one color")
    .required("Color is required"),
  category: yup.string().required("Category is required"),
  tags: yup.string().required("Tag is required"),
  quantity: yup.number().required("Quantity is required"),
});

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [color, setColor] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
  }, [dispatch]);

  const brandState = useSelector((state) => state.brand.brands);
  //console.log(brandState);
  const brandList = brandState.map((item, i) => (
    <option key={i} value={item.title}>
      {item.title}
    </option>
  ));

  const categoryState = useSelector((state) => state.category.categories);
  //console.log(categoryState);
  const categoryList = categoryState.map((item, i) => (
    <option key={i} value={item.title}>
      {item.title}
    </option>
  ));

  const colorState = useSelector((state) => state.color.colors);
  //console.log(colorState);
  const colorOption = [];
  colorState.forEach((item) =>
    colorOption.push({ label: item.title, value: item._id })
  );
  //console.log(colorOption);

  const imageState = useSelector((state) => state.upload.images);
  //console.log(imageState);
  const img = [];
  imageState.forEach((i) => img.push({ public_id: i.public_id, url: i.url }));
  //console.log(img);

  useEffect(() => {
    formik.values.color = color ? color : " ";
    formik.values.images = img;
  }, [color, img]);

  const newProduct = useSelector((state) => state.product);
  const { isLoading, isSuccess, isError, createdProduct } = newProduct;

  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Added Successfully!");
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isLoading, isSuccess, isError, createdProduct]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      tags: "",
      color: "",
      quantity: "",
      images: [],
    },
    validationSchema: schema,

    onSubmit: (values) => {
      //console.log(values);
      dispatch(createProduct(values));
      //alert(JSON.stringify(values));
      //toast.success("Product Added Successfully!");
      formik.resetForm();
      setColor(null);
      setTimeout(() => {
        navigate("/admin/product-list");
      }, 3000);
    },
  });

  const handleColor = (e) => {
    setColor(e);
    console.log(e);
  };

  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>

      <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-3">
        {/* Title */}
        <CustomInput
          type="text"
          label="Enter Product Title"
          name="title"
          onCh={formik.handleChange("title")}
          onBl={formik.handleBlur("title")}
          val={formik.values.title}
        />
        <div className="error">
          {formik.touched.title && formik.errors.title}
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

        {/* Price */}
        <CustomInput
          type="number"
          label="Enter Product Price"
          name="price"
          onCh={formik.handleChange("price")}
          onBl={formik.handleBlur("price")}
          val={formik.values.price}
        />
        <div className="error">
          {formik.touched.price && formik.errors.price}
        </div>

        {/* Select Brand */}
        <select
          name="brand"
          onChange={formik.handleChange("brand")}
          onBlur={formik.handleBlur("brand")}
          value={formik.values.brand}
          className="form-select form-select-sm"
        >
          <option value="">Select Brand</option>
          {brandList}
        </select>
        <div className="error">
          {formik.touched.brand && formik.errors.brand}
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

        {/* Select Tags */}
        <select
          name="tags"
          onChange={formik.handleChange("tags")}
          onBlur={formik.handleBlur("tags")}
          value={formik.values.tags}
          className="form-select form-select-sm"
        >
          <option value="" disabled>
            Select Tags
          </option>
          <option value="featured">Featured</option>
          <option value="popular">Popular</option>
          <option value="special">Special</option>
        </select>
        <div className="error">
          {formik.touched.tags && formik.errors.categortags}
        </div>

        {/* Select Color */}
        <Select
          mode="multiple"
          allowClear
          className="w-100 text-dark"
          placeholder="Select Color"
          defaultValue={color}
          onChange={(i) => handleColor(i)}
          options={colorOption}
        />
        <div className="error">
          {formik.touched.color && formik.errors.color}
        </div>

        {/* Enter Quantity */}
        <CustomInput
          type="number"
          label="Enter Quantity"
          name="quantity"
          onCh={formik.handleChange("quantity")}
          onBl={formik.handleBlur("quantity")}
          val={formik.values.quantity}
        />
        <div className="error">
          {formik.touched.quantity && formik.errors.quantity}
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
                  <p>Drag 'n' drop some files here, or click to select files</p>
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
                onClick={() => dispatch(deleteImg(item.public_id))}
                className="btn-close position-absolute top-0 end-0 border-0 bg-white rounded-circle shadow-sm p-0 m-0 text-dark fs-5 fw-bold"
                // style={{ top: "5px", right: "5px" }}
              ></button>
              <img src={item.url} alt="" className="img-fluid" width={200} />
            </div>
          ))}
        </div>

        <button
          className="btn btn-primary border-0 rounded-3 my-4"
          type="submit"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
