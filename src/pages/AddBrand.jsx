import { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createBrand,
  getBrandById,
  resetState,
  updateBrand,
} from "../features/brand/brandSlice";

//Yup schema
let schema = yup.object({
  title: yup.string().required("Brand name is required"),
});

const AddBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newBrand = useSelector((state) => state.brand);
  const {
    isLoading,
    isSuccess,
    isError,
    createdBrand,
    brandName,
    updatedBrand,
  } = newBrand;

  const location = useLocation();
  //console.log(location);
  const getBrandId = location.pathname.split("/")[3];
  console.log(getBrandId);

  useEffect(() => {
    if (getBrandId) {
      dispatch(getBrandById(getBrandId));
    } else {
      dispatch(resetState());
    }
  }, [getBrandId, dispatch]);

  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success("Brand Added Successfully!");
    }
    if (isSuccess && updatedBrand) {
      toast.success("Brand Updated Successfully!");
      navigate("/admin/brand-list");
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isLoading, isSuccess, isError, createdBrand, updatedBrand, navigate]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || "",
    },
    validationSchema: schema,

    onSubmit: (values) => {
      //console.log(values);
      if (getBrandId) {
        dispatch(updateBrand({ id: getBrandId, data: values }));
        dispatch(resetState());
      } else {
        dispatch(createBrand(values));
        //alert(JSON.stringify(values));
        formik.resetForm();

        setTimeout(() => {
          dispatch(resetState());
          //navigate("/admin/brand-list");
        }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">{getBrandById ? "Edit" : "Add"} Brand</h3>
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
          <button
            className="btn btn-primary border-0 rounded-3 my-4"
            type="submit"
          >
            {getBrandById ? "Edit" : "Add"} Brand
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
