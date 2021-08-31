import BaseLayout from "../layouts/Base";
// import {Link} from "react-router-dom"
import fb from "../assets/images/fb.png"

const Setting = () => {

  return (
    <BaseLayout title="Setting">
      
      <div className=" flex h-full flex-col">
        <div className="h-full px-4 pt-3">
          <div className=" text-gray-400 text-xs font-semibold pt-2">ACCOUNT</div>
          <div className="flex justify-between rounded-lg border  mt-2  items-center bg-white p-4 hover:bg-gray-100">
            <div className="flex">
              <div className="rounded-full h-10 w-10 bg-purple-400 flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className=" h-6 w-6 "
                  style={{ color: "white" }}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <div className="flex flex-col ml-3 text-sm font-semibold ">
                Update Email Address
                <span className="text-xs text-gray-400 ">
                  hennafield@gmail.com
                </span>
              </div>
            </div>
            <div className="flex  flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                style={{ color: "#9CA3AF" }}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="flex justify-between rounded-lg border  mt-2 items-center bg-white p-4 hover:bg-gray-100">
            <div className="flex ">
              <div className="rounded-full h-10 w-10 bg-yellow-400  flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  style={{ color: "white" }}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex flex-col  ml-3 text-sm font-semibold ">
                Change Password
                <span className="text-xs text-gray-400 ">
                  Last changed 2 weeks ago
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                style={{ color: "#9CA3AF" }}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
       
        <div className=" mt-6">
          <div className=" text-gray-400 text-xs font-semibold ">OTHER</div>
          <div className="flex justify-between rounded-lg border mt-2 items-center bg-white p-4 hover:bg-gray-100">
            <div className="flex ">
              <div
                className="rounded-full h-10 w-10  flex justify-center items-center"
                style={{ background: "#A2E57D" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  style={{ color: "white" }}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <div className="flex flex-col ml-3 text-sm font-semibold ">
                Push Notifications
                <span className="text-xs text-gray-400 ">
                  For messages, badges etc
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                style={{ color: "#9CA3AF" }}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="flex justify-between rounded-lg border  mt-2 items-center bg-white p-4 hover:bg-gray-100">
            <div className="flex ">
              <div className="rounded-full h-10 w-10 bg-blue-800  flex justify-center items-center">
                <img src={fb}/>
              </div>
              <div className="flex flex-col  ml-3 text-sm font-semibold ">
                Connect Facebook Account
                <span className="text-xs text-gray-400 ">
                  Allows quick login and sharing
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                style={{ color: "#9CA3AF" }}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
        </div>
      {/* <Link
        to="/login"
        className=" w-full text-white common-btn p-4 text-center  block "
      >
        Log Out
      </Link> */}
      </div>
    </BaseLayout>
  );
};
export default Setting;
