import { useState } from "react";
import { forgotPassword } from "../api/user-api";

function ForgotPass() {
  const [email, setEmail] = useState("");

  return (
    <div className="md:py-10 m-auto text-center">
      <div className="md:mb-8">
        <p className="text-black md:font-bold font-medium md:text-2xl text-md leading-8 mt-4">
          Enter Your Email
        </p>
      </div>

      <form className="bg-white group-hover:rounded px-8 md:pt-6 pt-4 md:pb-8 mb-4 flex flex-col">
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
  );
}
export default ForgotPass;
