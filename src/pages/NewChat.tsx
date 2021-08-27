import { Link } from "react-router-dom";
import BaseLayout from "../layouts/Base";
import { useDispatch, useSelector } from "react-redux";
import { GET_MY_CHATS } from "../api/queries";
import modalSlice from "../redux/slices/modal-slice";
import { RootState } from "../redux/store";
import { IChatResponse } from "../types/Chat";
import moment from "moment";
import useAuthSubscription from "../hooks/useAuthSubscription";

function NewChat() {
  const user = useSelector((state: RootState) => state.user.entities?.user);
  const { data } = useAuthSubscription<IChatResponse>(GET_MY_CHATS, {
    id: user?.id,
  });

  const dispatch = useDispatch();

  return (
    <BaseLayout title="Contacts">
      <div className="">
        <div className="px-4 h-screen">
          <div className=" flex justify-center my-3 relative rounded-md ">
            <input
              className="w-full rounded-xl p-2 bg-gray-100 text-center  text-xs focus:outline-none"
              type="text"
              placeholder="Search Conversation"
            />
          </div>
          <hr className=" border-gray-300"></hr>

          <ul>
            {data?.communication_threads.flatMap((chat, index) => (
              <Link
                role="button"
                to={`/messages/${chat.id}`}
                onClick={() => dispatch(modalSlice.actions.hideModal())}
              >
                <li key={index} className="my-chat-list">
                  <div className="flex ml-2 items-center">
                    <div className="h-50 w-50">
                      <img
                        src={
                          chat.profileByStartedWith.id === user?.id
                            ? chat.profileByStartedBy.image_url
                            : chat.profileByStartedWith.image_url
                        }
                        width="50"
                        height="50"
                        className="rounded-full"
                      />
                    </div>
                    <div className="flex flex-col ml-4">
                      <span className="text-black font-bold text-sm">
                        {chat.profileByStartedWith.id === user?.id
                          ? chat.profileByStartedBy.name
                          : chat.profileByStartedWith.name}
                      </span>
                      <span className="text-sm text-gray-400 truncate w-32"></span>
                      <span className="mt-1 text-xs text-gray-400">
                        {moment(chat.updated_at).fromNow()}
                      </span>
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
      </div>
    </BaseLayout>
  );
}

export default NewChat;
