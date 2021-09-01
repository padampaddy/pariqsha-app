import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import modalSlice from "../redux/slices/modal-slice";
import { RootState } from "../redux/store";
import { useMutation } from "@apollo/client";
import { User } from "../types/User";
import { UPDATE_USER_PROFILE } from "../api/queries";

function UpdatePassword() {
  const { entities } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [password, setPassword] = useState<string>("");
  const [userProfile] = useMutation<User>(UPDATE_USER_PROFILE);

  const handleSend = async () => {
    userProfile({
      variables: {
        id: entities?.user?.id,
        password,
      },
    })
      .then((info) => {
        console.log(info);
      })
      .catch((e) => console.error(e));
  };
  return (
    <>
      <div className="profile-header flex justify-between items-center pb-4">
        <span className="text-black md:text-xl  text-md font-medium">
          Update Password
        </span>

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
      <hr></hr>
      <div className="profile-body">
        <h4 className=" md:text-lg py-4 flex items-center text-gray-600 text-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
          Account Information
        </h4>
        <form>
          <div className="md:flex md:flex-wrap">
            <div className="mb-4 md:w-1/2 px-2">
              <label className=" text-sm" htmlFor="">
                Current Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border p-2 md:text-md+ text-sm"
                autoComplete=""
                type="password"
                value={password}
                placeholder="********"
              />
            </div>
            <div className="mb-4 md:w-1/2 px-2">
              <label className=" text-sm" htmlFor="">
                New Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border p-2 md:text-md+ text-sm"
                autoComplete=""
                type="password"
                value={password}
                placeholder="********"
              />
            </div>
            <div className="mb-4 md:w-1/2 px-2">
              <label className=" text-sm" htmlFor="">
                Confirm Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border p-2 md:text-md+ text-sm"
                autoComplete=""
                type="password"
                value={password}
                placeholder="********"
              />
            </div>
          </div>
          <hr></hr>

          <div className="flex md:justify-end justify-center pt-4">
            <button
              onClick={() => dispatch(modalSlice.actions.hideModal())}
              className="border py-2 px-10 mr-4 "
              style={{ borderColor: "#00CBE4" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSend}
              className="common-btn py-2  px-4 text-white md:text-xl"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default UpdatePassword;
