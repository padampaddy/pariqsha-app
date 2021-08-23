import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { APPLICATION_ID } from "../Constants";
import { signupAction } from "../redux/slices/user-slice";
import { RootState } from "../redux/store";

function SignupScreen() {

    const { loading } = useSelector((state: RootState) => state.user);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const dispatch = useDispatch();

    return (
        <div className="wrapper-login-screen container mx-auto">
            <div className="md:w-1/3 py-16 m-auto text-center">

                <div className="mb-8">
                    <img className="inline object-cover w-20 h-20 mr-2 rounded-lg" src="https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="Profile image" />
                    <h1 className="text-black font-extrabold text-3xl leading-8 mt-4">Quiz App</h1>
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
                    className="bg-white group-hover:rounded px-8 pt-6 pb-8 mb-4 flex flex-col">

                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2 text-left bottom-0 text-gray-400" htmlFor="">
                            Email
                        </label>
                        <input className="appearance-none  w-full py-2 text-grey-darker border-b-2 outline-none"
                            onChange={(e) => setEmail(e.target.value)} autoFocus 
                            type="text" autoComplete="new-password" placeholder="Email"
                        />
                    </div>

                    <div className="mb-0">
                        <label className="block text-gray-400 text-sm font-bold mb-2 text-left" htmlFor="">
                            Password
                        </label>
                        <input className="appearance-none  w-full py-2 text-gray-500 mb-3 border-b-2 outline-none"
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" autoComplete="new-password" placeholder="Enter your password"
                        />
                    </div>

                    <div className="mb-0">
                        <label className="block text-gray-400 text-sm font-bold mb-2 text-left" htmlFor="">
                            Confirm Password
                        </label>
                        <input className="appearance-none  w-full py-2 text-gray-500 mb-3 border-b-2 outline-none"
                            onChange={(e) => setCPassword(e.target.value)} 
                            type="password" autoComplete="new-password" placeholder="Re-Enter password"
                        />
                    </div>

                    <Link to="/signin" className="text-right text-gray-400 text-md underline  hover:text-blue-darker mb-6">
                        Already have an account? Signin
                    </Link>

                    <div className="flex items-center justify-between">
                        <button className="button mt-3 self-end hover:bg-white-100 text-white w-full font-medium py-4 px-4 focus:outline-none  rounded-full common-btn">
                            {loading === "pending"
                                ? "Signing up..."
                                : loading === "succeeded"
                                    ? "Signed up Successful"
                                    : "Signup"}
                        </button>
                    </div>

                </form>
            </div>
            {/* <button className="hover:bg-blue-dark text-white w-full h-14 font-medium px-4 focus:outline-none  fixed left-0 bottom-0" type="button" style={{ backgroundColor: "#427AD6" }}>
                Signup with Facebook
            </button> */} 
        </div>
    )
}
export default SignupScreen
