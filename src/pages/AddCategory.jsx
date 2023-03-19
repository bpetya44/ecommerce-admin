import { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../features/category/categorySlice";

//Yup schema
let schema = yup.object({
  title: yup.string().required("Category name is required"),
});

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newCategory = useSelector((state) => state.category);
  const { isLoading, isSuccess, isError, createdCategory } = newCategory;

  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success("Category is added Successfully!");
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isLoading, isSuccess, isError, createdCategory]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      //console.log(values);
      dispatch(createCategory(values));
      //alert(JSON.stringify(values));
      formik.resetForm();

      setTimeout(() => {
        navigate("/admin/category-list");
      }, 3000);
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Add Category</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          {/* Title */}
          <CustomInput
            type="text"
            label="Enter Category"
            name="title"
            onCh={formik.handleChange("title")}
            onBl={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button className="btn btn-primary border-0 rounded-3 my-4">
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
