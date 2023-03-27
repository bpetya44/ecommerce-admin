import { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import {
  createCategory,
  getCategoryById,
  resetState,
  updateCategory,
} from "../features/category/categorySlice";

//Yup schema
let schema = yup.object({
  title: yup.string().required("Category name is required"),
});

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newCategory = useSelector((state) => state.category);
  const {
    isLoading,
    isSuccess,
    isError,
    createdCategory,
    categoryName,
    updatedCategory,
  } = newCategory;

  const location = useLocation();
  //console.log(location);
  const getCategoryId = location.pathname.split("/")[3];
  //console.log(getCategoryId);

  useEffect(() => {
    if (getCategoryId) {
      dispatch(getCategoryById(getCategoryId));
    } else {
      dispatch(resetState());
    }
  }, [getCategoryId, dispatch]);

  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success("Category is added Successfully!");
      //navigate("/admin/category-list");
    }
    if (isSuccess && updatedCategory) {
      toast.success("Category is updated Successfully!");
      navigate("/admin/category-list");
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [
    isLoading,
    isSuccess,
    isError,
    createdCategory,
    updatedCategory,
    navigate,
  ]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      //console.log(values);
      if (getCategoryId) {
        dispatch(updateCategory({ id: getCategoryId, data: values }));
        dispatch(resetState());
      } else {
        dispatch(createCategory(values));
        //alert(JSON.stringify(values));
        formik.resetForm();

        setTimeout(() => {
          dispatch(resetState());
          //navigate("/admin/category-list");
        }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">{getCategoryId ? "Edit" : "Add"} Category</h3>
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
          <button
            className="btn btn-primary border-0 rounded-3 my-4"
            type="submit"
          >
            {getCategoryId ? "Edit" : "Add"} Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
