import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/images/pariqsha.png";
import { APPLICATION_ID } from "../Constants";
import GeneralLayout from "../layouts/General";
import { signupAction } from "../redux/slices/user-slice";
import { RootState } from "../redux/store";

export default function Signup() {
  const { loading } = useSelector((state: RootState) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
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
            Already registered?
            <Link
              className="text-blue-400 hover:text-blue-600 ml-1"
              to="/signin"
            >
              Sign in here...
            </Link>
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (cPassword !== password) {
                return;
              }
              dispatch(
                signupAction({
                  registration: {
                    applicationId: APPLICATION_ID,
                  },
                  user: {
                    email,
                    password,
                  },
                })
              );
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
                Enter a Password
              </label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                autoComplete="new-password"
                placeholder="*******"
              />
              <label className="text-left text-xs text-gray-500" htmlFor="">
                Confirm your Password
              </label>
              <input
                type="password"
                onChange={(e) => setCPassword(e.target.value)}
                className="input"
                autoComplete="new-password"
                placeholder="*******"
              />
              <label className="inline-flex items-center">
                <input type="checkbox" />
                <span className="ml-2 text-gray-600">
                  I agree to terms &amp; conditions
                </span>
              </label>
              <button className="button mt-3 self-end">
                {" "}
                {loading === "pending"
                  ? "Signing up..."
                  : loading === "succeeded"
                  ? "Signed up Successful"
                  : "Signup"}
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </GeneralLayout>
  );
}
