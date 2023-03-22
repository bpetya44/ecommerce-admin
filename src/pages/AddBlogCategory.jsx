import { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  createBlogCategory,
  resetState,
} from "../features/blogCategory/blogCategorySlice";

//Yup schema
let schema = yup.object({
  title: yup.string().required("Blog category is required"),
});

const AddBlogCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newBlogCategory = useSelector((state) => state.blogCategory);
  const { isLoading, isSuccess, isError, createdBlogCategory } =
    newBlogCategory;

  useEffect(() => {
    if (isSuccess && createdBlogCategory) {
      toast.success("Blog Category Added Successfully!");
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isLoading, isSuccess, isError, createdBlogCategory]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,

    onSubmit: (values) => {
      //console.log(values);
      dispatch(createBlogCategory(values));
      //alert(JSON.stringify(values));
      formik.resetForm();

      setTimeout(() => {
        dispatch(resetState());
        //navigate("/admin/blog-category-list");
      }, 3000);
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Add Blog Category</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Blog Category"
            name="title"
            onCh={formik.handleChange("title")}
            onBl={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button className="btn btn-primary border-0 rounded-3 my-4">
            Add Blog Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCategory;
