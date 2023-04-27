import React from "react";
import { Link } from "react-router-dom";
import CustomInput from "../components/CustomInput";

const ForgotPassword = () => {
  return (
    <div className="py-5" style={{ background: "#C4FFB2", minHeight: "100vh" }}>
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-3">
        <h3 className="text-center fs-4 mb-4">Forgot Your Password?</h3>
        <p className="text-center">
          Enter your email to receive reset link in your inbox.
        </p>
        <form action="">
          <CustomInput type="text" id="email" label="Email" />

          <button
            className="btn border-0 px-3 py-2 w-100 rounded-3 my-2"
            style={{ background: "#B7E3CC" }}
            type="submit"
          >
            Send me a Link
          </button>
          <div className="text-center my-2">
            {" "}
            <Link to={"/"}>Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
