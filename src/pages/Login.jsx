import React, { useEffect } from "react";
import { Link, useNavigate, redirect } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";

//Yup schema
let schema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "admin@b.me",
      password: "petya",
    },
    validationSchema: schema,

    onSubmit: (values) => {
      //console.log(values);
      dispatch(login(values));
      //alert(JSON.stringify(values, null, 2));
    },
  });
  const authState = useSelector((state) => state);
  const { user, isLoading, isError, isSuccess, message } = authState.auth;
  //console.log(isSuccess);

  useEffect(() => {
    if (isSuccess) {
      navigate("admin");
    }
    if (isError) {
      //alert(message);
      navigate("");
    }
  }, [user, isLoading, isError, isSuccess, message, navigate]);

  return (
    <div className="py-5" style={{ background: "#C4FFB2", minHeight: "100vh" }}>
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-3">
        <h3 className="text-center">Login</h3>
        <p className="text-center">Login to your account to continue</p>

        <div className="error text-danger text-center">
          {isError ? <div>{message.message}</div> : null}
        </div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="email"
            id="email"
            label="Email"
            val={formik.values.email}
            onCh={formik.handleChange("email")}
            onBl={formik.handleBlur("email")}
          />

          <div className="error mb-3">
            {formik.touched.email && formik.errors.email ? (
              <div className="text-danger">{formik.errors.email}</div>
            ) : null}
          </div>

          <CustomInput
            type="password"
            name="password"
            id="pass"
            label="Password"
            val={formik.values.password}
            onCh={formik.handleChange("password")}
            onBl={formik.handleBlur("password")}
          />
          <div className="error mb-3">
            {formik.touched.password && formik.errors.password ? (
              <div className="text-danger ">{formik.errors.password}</div>
            ) : null}
          </div>

          <button
            className="btn border-0 px-3 py-2 w-100 rounded-3"
            style={{ background: "#B7E3CC" }}
            type="submit"
          >
            Login
          </button>

          {/* <div className="my-3 text-center">
            <Link to={"/forgot-password"}>Forgot Password?</Link>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default Login;
