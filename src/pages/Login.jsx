import React from "react";
import { Link } from "react-router-dom";
import CustomInput from "../components/CustomInput";

const Login = () => {
  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-3">
        <h3 className="text-center">Login</h3>
        <p className="text-center">Login to your account to continue</p>
        <form action="">
          <CustomInput type="text" id="email" label="Email" />
          <CustomInput type="password" id="pass" label="Password" />

          <Link
            to={"/admin"}
            className="btn border-0 px-3 py-2 w-100 rounded-3"
            style={{ background: "#ffd333" }}
            type="submit"
          >
            Login
          </Link>

          <div className="my-3 text-center">
            <Link to={"/forgot-password"}>Forgot Password?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
