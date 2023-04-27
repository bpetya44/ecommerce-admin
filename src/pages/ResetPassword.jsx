import React from "react";
import CustomInput from "../components/CustomInput";

const ResetPassword = () => {
  return (
    <div className="py-5" style={{ background: "#C4FFB2", minHeight: "100vh" }}>
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-3">
        <h3 className="text-center fs-4 mb-4">Reset Password</h3>
        <p className="text-center">Enter your new password</p>
        <form action="">
          <CustomInput type="password" id="pass" label="New Password" />
          <CustomInput type="password" id="pass" label="Confirm New Password" />

          <button
            className="btn border-0 px-3 py-2 w-100 rounded-3"
            style={{ background: "#B7E3CC" }}
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
