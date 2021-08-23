import { Link } from "react-router-dom";
import BaseLayout from "../layouts/Base";
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { GET_MY_CHATS } from "../api/queries";
import modalSlice from "../redux/slices/modal-slice";
import { RootState } from "../redux/store";
import { IChatResponse } from "../types/Chat";
import moment from "moment";

function Mychats() {
  const user = useSelector((state: RootState) => state.user.entities?.user);
  const { data } = useQuery<IChatResponse>(GET_MY_CHATS, {
    variables: {
      id: user?.id,
    },
  });

  const dispatch = useDispatch();

  return (
    <BaseLayout title="My Chats"> 
      <div className=" bg-white mt-4">
        <div className="px-4 pt-8">
          <div className=" flex justify-center mt-2 relative rounded-md">
            <input
              className="w-full rounded p-2 bg-gray-100 text-center mb-2"
              type="text"
              placeholder="Search Conversation"
            />
            {/* <div className="bg-gray w-auto  text-gray-500  hover:text-blue-400  absolute   top-3  md:left-1/3 ">
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
            </div> */}
          </div>

          <ul>
            {data?.communication_threads.flatMap((chat, index) => (
              <li
                key={index}
                className="my-chat-list"
              >
                <div className="flex ml-2">
                  <div className="h-50 w-50">
                    <img
                      // src="https://i.imgur.com/aq39RMA.jpg"
                      src={chat.profileByStartedWith.id===user?.id?chat.profileByStartedBy.image_url:chat.profileByStartedWith.image_url}
                      width="50"
                      height="50"
                      className="rounded-full"
                    />
                  </div>
                  <div className="flex flex-col ml-4">
                    <span className="text-black font-bold text-md">
                      {chat.profileByStartedWith.id===user?.id?chat.profileByStartedBy.name:chat.profileByStartedWith.name}
                    </span>
                    <span className="text-sm text-gray-400 truncate w-32">
                      
                    </span>
                    <span className="mt-1 text-sm text-gray-400">{moment(chat.updated_at).fromNow()}</span>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <Link
                    to="/messages"
                    onClick={() => dispatch(modalSlice.actions.hideModal())}
                  >
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
                  </Link>
                </div>
              </li>
            ))}
          </ul>
          <button className="absolute w-full text-white common-btn p-4 left-0 bottom-0">
            New Chat
          </button>
        </div>
      </div>
    </BaseLayout>
  );
}

export default Mychats;
