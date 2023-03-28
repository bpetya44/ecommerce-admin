import { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import {
  createColor,
  resetState,
  getColorById,
  updateColor,
} from "../features/color/colorSlice";

//Yup schema
let schema = yup.object({
  title: yup.string().required("Color is required"),
});

const AddColorCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newColor = useSelector((state) => state.color);
  const {
    isLoading,
    isSuccess,
    isError,
    createdColor,
    colorName,
    updatedColor,
  } = newColor;

  const location = useLocation();
  //console.log(location);
  const getColorId = location.pathname.split("/")[3];
  // console.log(getColorId);

  useEffect(() => {
    if (getColorId) {
      dispatch(getColorById(getColorId));
    } else {
      dispatch(resetState());
    }
  }, [getColorId, dispatch]);

  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success("Color is added Successfully!");
    }
    if (isSuccess && updatedColor) {
      toast.success("Color is updated Successfully!");
      navigate("/admin/color-list");
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isLoading, isSuccess, isError, createdColor, updatedColor, navigate]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: colorName || "",
    },
    validationSchema: schema,

    onSubmit: (values) => {
      //console.log(values);
      if (getColorId) {
        dispatch(updateColor({ id: getColorId, data: values }));
        dispatch(resetState());
      } else {
        dispatch(createColor(values));
        //alert(JSON.stringify(values));
        formik.resetForm();

        setTimeout(() => {
          dispatch(resetState());
          //navigate("/admin/color-list");
        }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getColorId ? "Edit" : "Add"} Product Color
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="color"
            label="Choose Color"
            name="title"
            onCh={formik.handleChange("title")}
            onBl={formik.handleBlur("title")}
            val={formik.values.title}
            i_id="color"
            //i_class="form-control-color"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button className="btn btn-primary border-0 rounded-3 my-4">
            {getColorId ? "Edit" : "Add"} Color
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColorCategory;
