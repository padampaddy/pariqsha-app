import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import modalSlice from "../redux/slices/modal-slice";
import { RootState } from "../redux/store";
import { useMutation } from "@apollo/client";
import { IUserProfile } from "../types/User";
import { UPDATE_USER_PROFILE } from "../api/queries";
import DEFAULT_AVATAR from "../assets/images/profileuser.png";

function Profile({
  oUrl = "",
  oName = "",
  onUpdate,
}: {
  oUrl?: string;
  oName?: string;
  onUpdate: () => void;
}) {
  const { entities } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);
  const [pictures, setPictures] = useState<string>(oUrl);
  const [name, setName] = useState<string>(oName);
  const [userProfile] = useMutation<IUserProfile>(UPDATE_USER_PROFILE);

  const uploadPicture = async (e: React.ChangeEvent<any>) => {
    console.log(e);
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    const res = await fetch("https://functions.app.pariqsha.com/files/upload", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${entities?.token}`,
      },
    });
    const { url } = await res.json();
    setPictures(url);
    e.target.value = "";
  };

  const handleSend = async () => {
    userProfile({
      variables: {
        id: entities?.user?.id,
        imageUrl: pictures,
        name,
      },
    })
      .then(() => {
        dispatch(modalSlice.actions.hideModal());
        onUpdate();
      })
      .catch((e) => console.error(e));
  };
  return (
    <>
      <div className="profile-header flex justify-between items-center pb-4">
        <input
          type="file"
          onChange={uploadPicture}
          className="hidden"
          ref={wrapperRef}
        />
        <button
          type="button"
          onClick={() => {
            (wrapperRef as any).current.click();
          }}
          className=""
        >
          <img
            className="inline object-cover w-16 h-16 rounded-full"
            src={pictures ? pictures : DEFAULT_AVATAR}
            alt=""
          />
          <div className="rounded-full h-7 w-7 p-1 text-white common-btn -mt-6 ml-9 absolute">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className=""
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </button>
        <span className="text-black md:text-xl  text-md font-medium">
          Edit Profile
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
                Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                className="w-full border p-2 md:text-md+ text-sm"
                autoComplete=""
                type="text"
                value={name}
                placeholder="Enter Name"
              />
            </div>
          </div>
          <hr></hr>

          <div className="flex md:justify-end justify-center pt-4">
            <button
              onClick={() => dispatch(modalSlice.actions.hideModal())}
              className="cancel-button"
              style={{ borderColor: "#00CBE4" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSend}
              className="common-btn save-button"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default Profile;
