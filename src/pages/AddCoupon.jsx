import { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createCoupon, resetState } from "../features/coupon/couponSlice";

//Yup schema
let schema = yup.object({
  name: yup.string().required("Coupon name is required"),
  expiry: yup.date().required("Date is required"),
  discount: yup.number().required("Discount is required"),
});

const AddCoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newCoupon = useSelector((state) => state.coupon);
  const { isLoading, isSuccess, isError, createdCoupon } = newCoupon;

  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast.success("Coupon Added Successfully!");
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isLoading, isSuccess, isError, createdCoupon]);

  const formik = useFormik({
    initialValues: {
      name: "",
      expiry: "",
      discount: "",
    },
    validationSchema: schema,

    onSubmit: (values) => {
      //console.log(values);
      dispatch(createCoupon(values));
      //alert(JSON.stringify(values));
      formik.resetForm();

      setTimeout(() => {
        dispatch(resetState());
        // navigate("/admin/coupon-list");
      }, 3000);
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Add Coupon</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          {/* Coupon Name */}
          <CustomInput
            type="text"
            label="Enter Coupon Name"
            name="name"
            onCh={formik.handleChange("name")}
            onBl={formik.handleBlur("name")}
            val={formik.values.name}
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>

          {/* Expiry Date*/}
          <CustomInput
            type="date"
            label="Enter Expiry Date"
            name="expiry"
            onCh={formik.handleChange("expiry")}
            onBl={formik.handleBlur("expiry")}
            val={formik.values.expiry}
          />
          <div className="error">
            {formik.touched.expiry && formik.errors.expiry}
          </div>

          {/* Discount */}
          <CustomInput
            type="number"
            label="Enter Discount"
            name="discount"
            onCh={formik.handleChange("discount")}
            onBl={formik.handleBlur("discount")}
            val={formik.values.discount}
          />
          <div className="error">
            {formik.touched.discount && formik.errors.discount}
          </div>

          <button className="btn btn-primary border-0 rounded-3 my-4">
            Add Coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;
