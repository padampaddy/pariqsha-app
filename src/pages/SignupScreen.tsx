import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/images/pariqsha.png";
import { APPLICATION_ID } from "../Constants";
import { signupAction } from "../redux/slices/user-slice";
import { RootState } from "../redux/store";
import GeneralLayout from "../layouts/General";

function SignupScreen() {
  const { loading } = useSelector((state: RootState) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const dispatch = useDispatch();

  return (
    <GeneralLayout>
    <div className=" mx-auto">
      <div className="md:w-1/3 md:py-16 py-8 m-auto text-center">
        <div className="mb-8">
        <img src={logo} className="md:h-20 md:w-20 h-10 w-10 mx-auto" alt="pariqsha logo" />
        <h1 className="md:text-md text-sm font-bold mt-4 text-center">
          Hi, Welcome to Pariqsha
        </h1>
          <h1 className="text-black font-extrabold md:text-3xl text-2xl leading-8 md:mt-4 mt-2">
            Quiz App
          </h1>
        </div>

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
          className="bg-white group-hover:rounded px-8 md:pt-4 md:pb-8 rounded-lg flex flex-col"
        >
          <p className="text-gray-600 text-sm md:text-lg md:font-semibold font-medium md:pt-2 invisible md:visible">
            Signup to continue
          </p>
          <div className="md:my-4 my-1">
            <label className="signup-screen-label" htmlFor="">
              Email
            </label>
            <input
              className="signup-screen-input"
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              type="text"
              autoComplete="new-password"
              placeholder="john@doe.com"
            />
          </div>

          <div className="mb-0">
            <label className="signup-screen-label" htmlFor="">
              Password
            </label>
            <input
              className="signup-screen-input"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="new-password"
              placeholder="*******"
            />
          </div>

          <div className="mb-0">
            <label className="signup-screen-label" htmlFor="">
              Confirm Password
            </label>
            <input
              className="signup-screen-input"
              onChange={(e) => setCPassword(e.target.value)}
              type="password"
              autoComplete="new-password"
              placeholder="*******"
            />
          </div> 

          <div className="flex items-center justify-between">
            <button className="button mt-4 md:mt-6 self-end hover:bg-white-100 text-white w-full font-medium md:py-4 md:text-lg py-3 focus:outline-none  rounded-full common-btn">
              {loading === "pending"
                ? "Signing up..."
                : loading === "succeeded"
                ? "Signed up Successful"
                : "Signup"}
            </button>
          </div>

          <Link
            to="/signin"
            className=" text-gray-400 md:text-md underline text-sm text-center mt-4"
          >
            Already have an account? Signin
          </Link>
        </form>
      </div>
      
    </div>
    </GeneralLayout>
  );
}
export default SignupScreen;
