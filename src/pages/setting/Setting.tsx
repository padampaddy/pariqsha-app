import BaseLayout from "../../layouts/Base";
import { useDispatch, useSelector } from "react-redux";
import UpdateEmail from "./components/UpdateEmail";
import modalSlice from "../../redux/slices/modal-slice";
import UpdatePassword from "./components/UpdatePassword";
import { RootState } from "../../redux/store";
import { useHistory } from "react-router-dom";

const Setting = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.entities?.user);
  const history = useHistory();

  return (
    <BaseLayout title="Setting">
      <div className=" flex h-full flex-col">
        <div className="h-full px-4 pt-3">
          <div className=" mt-6">
            <div className=" text-gray-500 text-xs font-semibold uppercase ">
              Transactions History
            </div>
            <div
              role="button"
              onClick={() => history.push("/rupeeshistory")}
              className="flex justify-between rounded-lg border mt-2 items-center bg-white p-4 hover:bg-gray-100 animation"
            >
              <div className="flex animation">
                <div className="rounded-full h-10 w-10  flex justify-center items-center bg-yellow-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 text-green-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="flex flex-col ml-3 text-sm font-semibold animation ">
                  My Transactions
                  <span className="text-xs text-gray-400 ">
                    Rupees Transactions History
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

            <div
              role="button"
              onClick={() => history.push("/coinshistory")}
              className="flex justify-between rounded-lg border mt-2 items-center bg-white p-4 hover:bg-gray-100 animation"
            >
              <div className="flex animation">
                <div className="rounded-full h-10 w-10  flex justify-center items-center bg-blue-900">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-yellow-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                    <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                    <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
                  </svg>
                </div>
                <div className="flex flex-col ml-3 text-sm font-semibold animation ">
                  My Coins Transactions
                  <span className="text-xs text-gray-400 ">
                    Coins Transactions History
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

            <div
              role="button"
              onClick={() => history.push("/markethistory")}
              className="flex justify-between rounded-lg border  mt-2 items-center bg-white p-4 hover:bg-gray-100 animation"
            >
              <div className="flex ">
                <div
                  className="rounded-full h-10 w-10 bg-purple-400 flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="flex flex-col  ml-3 text-sm font-semibold ">
                  Market
                  <span className="text-xs text-gray-400 ">
                    Market Transactions History
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
          <div className="mt-6 text-gray-500 text-xs font-semibold pt-2">
            ACCOUNT
          </div>
          <div
            role="button"
            onClick={() => {
              dispatch(
                modalSlice.actions.showModal({
                  body: (
                    <UpdateEmail
                      onUpdate={() => {
                        console.log("Updated");
                      }}
                      oEmail={user?.email}
                    />
                  ),
                })
              );
            }}
            className="animation flex justify-between rounded-lg border  mt-2  items-center bg-white p-4 hover:bg-gray-100"
          >
            <div className="flex animation">
              <div className="rounded-full h-10 w-10 bg-green-500  flex justify-center items-center">
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
                <span className="text-xs text-gray-400 ">{user?.email}</span>
              </div>
            </div>
            <div className="flex  flex-col items-center animation">
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

          <div
            role="button"
            onClick={() => {
              dispatch(
                modalSlice.actions.showModal({
                  body: <UpdatePassword />,
                })
              );
            }}
            className="flex animation justify-between rounded-lg border  mt-2 items-center bg-white p-4 hover:bg-gray-100"
          >
            <div className="flex ">
              <div className="rounded-full h-10 w-10 bg-blue-500  flex justify-center items-center">
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
              <div className="flex flex-col  ml-3 text-sm font-semibold animation ">
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
