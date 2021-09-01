import { Link } from "react-router-dom";
import BaseLayout from "../layouts/Base";
import { useDispatch, useSelector } from "react-redux";
import { USER_PROFILE_CONTACT } from "../api/queries";
import modalSlice from "../redux/slices/modal-slice";
import { RootState } from "../redux/store";
import useAuthSubscription from "../hooks/useAuthSubscription";
import { useState } from "react";
import { UserProfile } from "../types/Chat";

function NewChat() {
  const user = useSelector((state: RootState) => state.user.entities?.user);
  const { data, loading } = useAuthSubscription<UserProfile>(
    USER_PROFILE_CONTACT,
    {
      id: user?.id,
    }
  );
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState<string>(``);

  return (
    <BaseLayout title="My Contacts">
      <div className="flex flex-col h-full">
        <div className="px-4 h-full">
          {loading ? (
            <div className=" flex justify-center mt-4 items-center">
              <div
                className="loader ease-linear rounded-full border-4 border-t-4 border-gray-300 h-10 w-10"
                style={{ borderTopColor: "#00D2E0" }}
              ></div>
            </div>
          ) : (
            <div>
              <div className="bg-gray-100 flex items-center my-2 relative rounded-md">
                <div className="text-gray-500 pl-2 hover:text-blue-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  className="w-full focus:outline-none rounded p-2  bg-gray-100"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search Contact"
                />
              </div>
              <hr className=" border-gray-300"></hr>
              <ul>
                {data?.users_profile.flatMap((chat, index) => (
                  <Link
                    role="button"
                    to={`/chats/${chat.id}`}
                    onClick={() => dispatch(modalSlice.actions.hideModal())}
                  >
                    <li key={index} className="my-chat-list">
                      <div className="flex ml-2 items-center">
                        <div className="h-50 w-50">
                          <img
                            src={data?.users_profile.image_url}
                            width="50"
                            height="50"
                            className="rounded-full"
                          />
                        </div>
                        <div className="flex flex-col ml-4">
                          <span className="text-black font-bold text-sm">
                            {data?.users_profile.name}
                          </span>
                          <span className="text-sm text-gray-400 truncate w-32"></span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          style={{ color: "#39CDDD" }}
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </BaseLayout>
  );
}
export default NewChat;
