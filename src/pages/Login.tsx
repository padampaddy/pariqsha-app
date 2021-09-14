import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/images/pariqsha.png";
import GeneralLayout from "../layouts/General";
import modalSlice from "../redux/slices/modal-slice";
import { loginAction } from "../redux/slices/user-slice";
import { RootState } from "../redux/store";
import ForgotPass from "./ForgetPass";
import * as Validation from "../Utils/validation";

const Login=() =>{

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

  const handleSubmit = (e: { preventDefault: () => void; }) =>{
    e.preventDefault();

    if (data.email === "" || data.password === "") {
      seterrData({ ...errData, emptyErr: "All fields are required" });
      return;
    }
    dispatch(loginAction({ email: data.email, password:data.password }));

  }

  const handleInputChange = (e:React.SyntheticEvent<HTMLInputElement, Event>) => {
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
        <img src={logo} className="md:h-20 md:w-20 h-10 w-10 mx-auto" alt="pariqsha logo" />
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
          onSubmit={(e)=>handleSubmit(e)}
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
            <input
              className="signup-screen-input"
              // onChange={(e) => setPassword(e.target.value)}
              onChange={(e) => handleInputChange(e)}
              value={data.password || ""}
              autoComplete=""
              type="password"
              placeholder="*******"
              id="password"
              name="password"
            />
             <small style={{ color: "red" }}>{errData.password}</small>
          </div>

          <button type="button"
            onClick={() => {
              dispatch(
                modalSlice.actions.showModal({
                  title: "Forgot Password",
                  body: <ForgotPass/>,
                })
              );
            }}
            className="text-right text-gray-400 md:text-md text-sm underline hover:text-blue-darker md:my-4 mt-3 mb-4 focus:outline-none "
          >
            Forgot Password?
          </button>

          <div className="flex items-center justify-between">
            <button type="submit" className="button md:mt-6 mt-3 self-end hover:bg-white-100 text-white w-full font-medium md:py-4 py-3 focus:outline-none  rounded-full common-btn md:text-lg">
              {loading === "pending"
                ? "Logging In..."
                : loading === "succeeded"
                ? "Login Successful"
                : "Login"}
            </button>
          </div>
          <small style={{ color: "red", marginTop: "10px" }}>{errData.emptyErr}</small>

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
}
export default Login;
