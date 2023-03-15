import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getCategories } from "../features/category/categorySlice";
import Multiselect from "react-widgets/Multiselect";
import "react-widgets/styles.css";
import { getColors } from "../features/color/colorSlice";
import Dropzone from "react-dropzone";
import { uploadImg } from "../features/upload/uploadSlice";

//Yup schema
let schema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  price: yup.number().required("Price is required"),
  brand: yup.string().required("Brand is required"),
  category: yup.string().required("Category is required"),
  color: yup.array().required("Color is required"),
  quantity: yup.number().required("Quantity is required"),
});

const AddProduct = () => {
  const dispatch = useDispatch();

  const [color, setColor] = useState([]);

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
    formik.values.color = color;
  }, []);

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
  const colors = [];
  colorState.forEach((item, i) => colors.push({ color: item.title, id: i }));
  //console.log(colors);

  const imageState = useSelector((state) => state.upload.images);
  //console.log(imageState);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      color: [],
      quantity: "",
    },
    validationSchema: schema,

    onSubmit: (values) => {
      //console.log(values);
      //dispatch(login(values));
      alert(JSON.stringify(values, null, 2));
    },
  });

  const [desc, setDesc] = useState("");
  const handleDesc = (e) => {
    setDesc(e);
  };

  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex flex-column gap-3"
        >
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
            {formik.touched.title && formik.errors.title ? (
              <div>{formik.errors.title}</div>
            ) : null}
          </div>

          {/* Description */}
          <div className="">
            <ReactQuill
              theme="snow"
              name="description"
              onChange={formik.handleChange("description")}
              value={formik.values.description}
            />
          </div>
          <div className="error">
            {formik.touched.description && formik.errors.description ? (
              <div>{formik.errors.description}</div>
            ) : null}
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
            {formik.touched.price && formik.errors.price ? (
              <div>{formik.errors.price}</div>
            ) : null}
          </div>

          {/* Select Brand */}
          <select
            name="brand"
            onChange={formik.handleChange("brand")}
            onBlur={formik.handleBlur("brand")}
            value={formik.values.brand}
            className="form-control py-3 mb-3"
          >
            <option value="">Select Brand</option>
            {brandList}
          </select>
          <div className="error">
            {formik.touched.brand && formik.errors.brand ? (
              <div>{formik.errors.brand}</div>
            ) : null}
          </div>

          {/* Select Category */}
          <select
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
            className="form-control py-3 mb-3"
          >
            <option value="">Select Category</option>
            {categoryList}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category ? (
              <div>{formik.errors.category}</div>
            ) : null}
          </div>

          {/* Select Color */}
          <Multiselect
            name="color"
            dataKey="id"
            textField="color"
            defaultValue={[0]}
            data={colors}
            onChange={() => {
              setColor(formik.values.color);
            }}
          />
          <div className="error">
            {formik.touched.color && formik.errors.color ? (
              <div>{formik.errors.color}</div>
            ) : null}
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
            {formik.touched.quantity && formik.errors.quantity ? (
              <div>{formik.errors.quantity}</div>
            ) : null}
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
                  className="btn-close position-absolute top-0 end-0 border-0 bg-white rounded-circle shadow-sm p-0 m-0 text-dark fs-5 fw-bold"
                  // style={{ top: "5px", right: "5px" }}
                ></button>
                <img src={item.url} alt="" className="img-fluid" width={200} />
              </div>
            ))}
          </div>

          <button className="btn btn-primary border-0 rounded-3 my-4">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
