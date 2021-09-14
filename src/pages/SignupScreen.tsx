import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/images/pariqsha.png";
import { APPLICATION_ID } from "../Constants";
import { signupAction } from "../redux/slices/user-slice";
import { RootState } from "../redux/store";
import GeneralLayout from "../layouts/General";
import * as Validation from "../Utils/validation";

function SignupScreen() {

  const initialData = {
    email: "",
    password: "",
    cpassword:"",
    emptyErr: "",
  };

  const { loading } = useSelector((state: RootState) => state.user);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [cPassword, setCPassword] = useState("");
  const [data, setData] = useState(initialData);
  const [errData, seterrData] = useState(initialData);
  const dispatch = useDispatch();

  const handleSubmit = (e: { preventDefault: () => void; }) =>{
    e.preventDefault();
            if (data.cpassword !== data.password) {
              return;
            }
            dispatch(
              signupAction({
                registration: {
                  applicationId: APPLICATION_ID,
                },
                user: {
                  email: data.email,
                  password: data.password,
                },
              })
            );

    if (data.email === "" || data.password === "" || data.cpassword ==="") {
      seterrData({ ...errData, emptyErr: "All fields are required" });
      return;
    }

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
      case "cpassword" : {
        if(data.cpassword === data.password) {
          seterrData({...errData, cpassword:""});
        }else{
          seterrData({ ...errData, cpassword: "Please Enter The Same Password" });
        }
      }
    }
  };

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
          onSubmit={(e) => handleSubmit(e)}
          className="bg-white group-hover:rounded px-8 md:pt-4 md:pb-8 rounded-lg flex flex-col"
        >
          <p className="text-gray-600 text-sm md:text-lg md:font-semibold font-medium md:pt-2 invisible md:visible">
            Signup to continue
          </p>
          <div className="md:my-4 my-1 text-left">
            <label className="signup-screen-label" htmlFor="">
              Email
            </label>
            <input
              className="signup-screen-input"
              onChange={(e) => handleInputChange(e)}
              value={data.email}
              id="email"
              name="email"
              autoFocus
              type="text"
              autoComplete="new-password"
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
              onChange={(e) => handleInputChange(e)}
              value={data.password || ""}
              type="password"
              id="password"
              name="password"
              autoComplete="new-password"
              placeholder="*******"
            />
            <small style={{ color: "red" }}>{errData.password || ""}</small>
          </div>

          <div className="mb-0 text-left">
            <label className="signup-screen-label" htmlFor="">
              Confirm Password
            </label>
            <input
              className="signup-screen-input"
              onChange={(e) => handleInputChange(e)}
              value={data.cpassword || ""}
              type="cpassword"
              id="cpassword"
              name="cpassword"
              autoComplete="new-password"
              placeholder="*******"
            />
            <small style={{ color: "red" }}>{errData.cpassword}</small>
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
          <small style={{ color: "red" }}>{errData.emptyErr}</small>

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
