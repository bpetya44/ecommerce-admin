import { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createBrand } from "../features/brand/brandSlice";

//Yup schema
let schema = yup.object({
  title: yup.string().required("Brand name is required"),
});

const AddBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newBrand = useSelector((state) => state.brand);
  const { isLoading, isSuccess, isError, createdBrand } = newBrand;

  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success("Brand Added Successfully!");
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isLoading, isSuccess, isError, createdBrand]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,

    onSubmit: (values) => {
      //console.log(values);
      dispatch(createBrand(values));
      //alert(JSON.stringify(values));
      formik.resetForm();

      setTimeout(() => {
        navigate("/admin/brand-list");
      }, 3000);
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Add Brand</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          {/* Title */}
          <CustomInput
            type="text"
            label="Enter Brand"
            name="title"
            onCh={formik.handleChange("title")}
            onBl={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button className="btn btn-primary border-0 rounded-3 my-4">
            Add Brand
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
