import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { forgotPassword } from "../api/user-api";
import logo from "../assets/images/pariqsha.png";
import GeneralLayout from "../layouts/General";
import modalSlice from "../redux/slices/modal-slice";
import { loginAction } from "../redux/slices/user-slice";
import { RootState } from "../redux/store";

const ForgotPasswordBody = () => {
  const [email, setEmail] = useState("");
  return (
    <>
      <div className="mt-2 text-left text-sm text-gray-500">
        <form>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full p-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              inputMode="email"
              type="email"
              placeholder="Enter Email Address..."
            />
          </div>
        </form>
      </div>
      <div className="bg-gray-50 flex justify-end py-3 sm:px-6">
        <button
          className="w-50 px-4 bg-blue-600 py-2 text-white rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          type="button"
          onClick={() => {
            forgotPassword(email);
          }}
        >
          Reset Password
        </button>
      </div>
    </>
  );
};

export default function Signin() {
  const { loading } = useSelector((state: RootState) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  return (
    <GeneralLayout>
      <div className="max-w-md pt-8 mx-auto">
        <img src={logo} className="h-20 w-20 mx-auto" alt="pariqsha logo" />
        <h1 className="text-md font-bold mt-4 text-center">
          Hi, Welcome to Pariqsha
        </h1>
        <div className="flex shadow bg-white mt-4 p-8 rounded m-auto text-center flex-col align-middle justify-center">
          <p className="my-4 text-gray-500">
            New here?
            <Link
              className="text-blue-400 hover:text-blue-600 ml-1"
              to="/signup"
            >
              Sign up now...
            </Link>
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(loginAction({ email, password }));
            }}
          >
            <fieldset className="flex my-3 rounded flex-col max-w-lg mx-auto">
              <label className="text-left text-xs text-gray-500" htmlFor="">
                Email
              </label>
              <input
                autoFocus
                type="text"
                className="input"
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="new-password"
                placeholder="john@doe.com"
              />
              <label className="text-left text-xs text-gray-500" htmlFor="">
                Password
              </label>
              <input
                type="password"
                className="input"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                placeholder="*******"
              />
              <button
                type="button"
                onClick={() => {
                  dispatch(
                    modalSlice.actions.showModal({
                      title: "Forgot Password",
                      body: <ForgotPasswordBody />,
                    })
                  );
                }}
                className="text-blue-300 text-sm hover:text-blue-500 focus:outline-none mb-3 self-end"
              >
                Forgot Your Password? Click here...
              </button>
              <button className="button mt-3 self-end">
                {loading === "pending"
                  ? "Logging In..."
                  : loading === "succeeded"
                  ? "Login Successful"
                  : "Login"}
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </GeneralLayout>
  );
}
