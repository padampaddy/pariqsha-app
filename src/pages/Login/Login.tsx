import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../assets/images/pariqsha.png";
import GeneralLayout from "../../layouts/General";
import modalSlice from "../../redux/slices/modal-slice";
import { loginAction } from "../../redux/slices/user-slice";
import { RootState } from "../../redux/store";
import * as Validation from "../../Utils/validation";
import ForgotPass from "./ForgetPass";

const Login = () => {
  const initialData = {
    email: "",
    password: "",
    emptyErr: "",
  };

  const { loading } = useSelector((state: RootState) => state.user);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [data, setData] = useState(initialData);
  const [errData, seterrData] = useState(initialData);
  const dispatch = useDispatch();
  const [passwordShown, setPasswordShown] = useState(false);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (data.email === "" || data.password === "") {
      seterrData({ ...errData, emptyErr: "All fields are required" });
      return;
    }
    dispatch(loginAction({ email: data.email, password: data.password }));
  };

  const handleInputChange = (
    e: React.SyntheticEvent<HTMLInputElement, Event>
  ) => {
    const { name, value } = e.target as HTMLInputElement;
    setData({ ...data, [name]: value });

    switch (name) {
      case "email": {
        if (Validation.validateEmail(value)) {
          seterrData({ ...errData, email: "" });
        } else {
          seterrData({ ...errData, email: "Please Enter A Valid Email" });
        }
        break;
      }
      case "password": {
        if (Validation.validatePassword(value)) {
          seterrData({ ...errData, password: "" });
        } else {
          seterrData({ ...errData, password: "Please Enter A Valid Password" });
        }
        break;
      }
    }
  };

  return (
    <GeneralLayout>
      <div className="mx-auto">
        <div className="md:w-1/3 md:py-16 py-8 m-auto text-center">
          <div className="mb-8">
            <img
              src={logo}
              className="md:h-20 md:w-20 h-10 w-10 mx-auto"
              alt="pariqsha logo"
            />
            <h1 className="md:text-md text-sm font-bold mt-4 text-center">
              Hi, Welcome to Pariqsha
            </h1>
            <h1 className="text-black font-extrabold md:text-3xl text-2xl leading-8 md:mt-4 mt-2">
              Quiz App
            </h1>
            <p className="text-gray-400 text-sm md:text-lg md:font-semibold  md:pt-2 ">
              Login to continue
            </p>
          </div>

          <form
            // onSubmit={(e) => {
            //   e.preventDefault();
            //   dispatch(loginAction({ email, password }));
            // }}
            onSubmit={(e) => handleSubmit(e)}
            className="bg-white group-hover:rounded px-8 md:pt-4 md:pb-8 rounded-lg flex flex-col"
          >
            <div className="md:my-4 my-1 text-left">
              <label className="signup-screen-label" htmlFor="">
                Email
              </label>
              <input
                className="signup-screen-input"
                // onChange={(e) => setEmail(e.target.value)}
                onChange={(e) => handleInputChange(e)}
                value={data.email}
                id="email"
                name="email"
                autoComplete=""
                type="text"
                placeholder="john@doe.com"
              />
              <small style={{ color: "red" }}>{errData.email || ""}</small>
            </div>

            <div className="mb-0 text-left">
              <label className="signup-screen-label" htmlFor="">
                Password
              </label>
              <div className="flex items-center signup-screen-input">
                <input
                  className="outline-none flex-grow"
                  // onChange={(e) => setPassword(e.target.value)}
                  onChange={(e) => handleInputChange(e)}
                  value={data.password || ""}
                  autoComplete=""
                  type={passwordShown ? "text" : "password"}
                  placeholder="*******"
                  id="password"
                  name="password"
                />
                <div role="button" className="flex-grow-0" onClick={() => setPasswordShown(!passwordShown)}>
                  {passwordShown ? (
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                      clipRule="evenodd"
                    />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                  </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    
                  )}
                </div>
              </div>
              <small style={{ color: "red" }}>{errData.password}</small>
            </div>

            <button
              type="button"
              onClick={() => {
                dispatch(
                  modalSlice.actions.showModal({
                    title: "Forgot Password",
                    body: <ForgotPass />,
                  })
                );
              }}
              className="underline hover:text-blue-darker text-right focus:outline-none text-gray-400 md:text-md text-sm md:my-4 mt-3 mb-4"
            >
              Forgot Password?
            </button>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="button md:mt-6 mt-3 self-end hover:bg-white-100 text-white w-full font-medium md:py-4 py-3 focus:outline-none  rounded-full common-btn md:text-lg"
              >
                {loading === "pending"
                  ? "Logging In..."
                  : loading === "succeeded"
                  ? "Login Successful"
                  : "Login"}
              </button>
            </div>
            <small style={{ color: "red", marginTop: "10px" }}>
              {errData.emptyErr}
            </small>

            <Link
              to="/signup"
              className="underline md:text-md text-sm text-gray-400 text-center mt-4"
            >
              Create your account? Signup
            </Link>
          </form>
        </div>
      </div>
    </GeneralLayout>
  );
};
export default Login;
