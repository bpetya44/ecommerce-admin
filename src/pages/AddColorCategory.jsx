import { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createColor } from "../features/color/colorSlice";

//Yup schema
let schema = yup.object({
  title: yup.string().required("Color is required"),
});

const AddColorCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newColor = useSelector((state) => state.color);
  const { isLoading, isSuccess, isError, createdColor } = newColor;

  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success("Color is added Successfully!");
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isLoading, isSuccess, isError, createdColor]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      //console.log(values);
      dispatch(createColor(values));
      //alert(JSON.stringify(values));
      formik.resetForm();

      setTimeout(() => {
        navigate("/admin/color-list");
      }, 3000);
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Add Product Color</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="color"
            label="Enter Product Color"
            name="title"
            onCh={formik.handleChange("title")}
            onBl={formik.handleBlur("title")}
            val={formik.values.title}
            id="color"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button className="btn btn-primary border-0 rounded-3 my-4">
            Add Color
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColorCategory;
