import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import modalSlice from "../redux/slices/modal-slice";
import { loginAction } from "../redux/slices/user-slice";
import { RootState } from "../redux/store";
import ForgotPass from "./ForgetPass";

function Login() {
  const { loading } = useSelector((state: RootState) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  return (
    <div className="wrapper-login-screen container mx-auto">
      <div className="md:w-1/3 py-16 m-auto text-center">
        <div className="mb-8">
          <img
            className="inline object-cover w-20 h-20 mr-2 rounded-lg"
            src="https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt="Profile image"
          />
          <h1 className="text-black font-extrabold text-3xl leading-8 mt-4">
            Quiz App
          </h1>
          <p className="text-gray-400 font-medium text-md pt-2 ">
            Login to continue
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(loginAction({ email, password }));
          }}
          className="bg-white group-hover:rounded px-8 pt-6 pb-8 mb-4 flex flex-col"
        >
          <div className="mb-4">
            <label className="signup-screen-label" htmlFor="">
              Username
            </label>
            <input
              className="signup-screen-input"
              onChange={(e) => setEmail(e.target.value)}
              autoComplete=""
              type="text"
              placeholder="Enter Username"
            />
          </div>

          <div className="mb-0">
            <label className="signup-screen-label" htmlFor="">
              Password
            </label>
            <input
              className="signup-screen-input"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete=""
              type="password"
              placeholder="Enter Password"
            />
          </div>

          <button
            onClick={() => {
              dispatch(
                modalSlice.actions.showModal({
                  title: "Forgot Password",
                  body: <ForgotPass />,
                })
              );
            }}
            className="text-right text-gray-400 text-md underline hover:text-blue-darker mb-6 focus:outline-none "
          >
            Forgot Password?
          </button>

          <div className="flex items-center justify-between">
            <button className="button mt-3 self-end hover:bg-white-100 text-white w-full font-medium py-4 px-4 focus:outline-none  rounded-full common-btn">
              {loading === "pending"
                ? "Logging In..."
                : loading === "succeeded"
                ? "Login Successful"
                : "Login"}
            </button>
          </div>

          <Link
            to="/signup"
            className="underline text-md text-gray-400 text-center mt-4"
          >
            Create your account/Signup
          </Link>
        </form>
      </div>
      {/* 
            <button className="hover:bg-blue-dark text-white w-full h-14 font-medium px-4  fixed left-0 bottom-0 focus:outline-none " type="button" style={{ backgroundColor: "#427AD6" }}>
                Login with Facebook
            </button> */}
    </div>
  );
}
export default Login;
