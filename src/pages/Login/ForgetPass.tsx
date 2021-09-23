import { useState } from "react";
import { forgotPassword } from "../../api/user-api";
import { useDispatch } from "react-redux";
import modalSlice from "../../redux/slices/modal-slice";


function ForgotPass() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  return (
    <>
      <div className="sm:flex sm:items-start md:flex md:items-center">
        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <svg
            className="h-6 w-6 text-red-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div className="mt-3 text-center flex-grow sm:mt-0 sm:ml-4 sm:text-left">
          <h3
            className="text-lg leading-6 font-medium text-gray-900"
            id="modal-title"
          >
            Forgot Password
          </h3>
        </div>
        <div className="flex items-center justify-start text-4xl py-2 px-4">
          <button
            onClick={() => dispatch(modalSlice.actions.hideModal())}
            className="focus:outline-none absolute md:top-6 md:right-5 right-3 top-4 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="md:py-10 m-auto text-center">
        <div className="md:mb-8">
          <p className="text-black md:font-bold font-medium md:text-2xl text-md leading-8 mt-4">
            Enter Your Email
          </p>
        </div>

        <form className="bg-white group-hover:rounded  md:pt-6 pt-4 md:pb-8 mb-4 flex flex-col">
          <div className="mb-4">
            <label className="signup-screen-label" htmlFor="email">
              Email
            </label>
            <input
              className="signup-screen-input"
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              inputMode="email"
              placeholder="john@doe.com"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="hover:bg-white-100 text-white w-full focus:outline-none font-medium md:py-4 md:px-4 py-2 md:mt-8 mt-4 rounded-full common-btn"
              onClick={() => {
                forgotPassword(email);
              }}
              type="button"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default ForgotPass;
