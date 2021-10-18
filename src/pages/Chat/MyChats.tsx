import { Link } from "react-router-dom";
import BaseLayout from "../../layouts/Base";
import { useSelector } from "react-redux";
import { GET_MY_CHATS } from "../../api/queries";
import { RootState } from "../../redux/store";
import { IChatResponse } from "../../types/Chat";
import moment from "moment";
import useAuthSubscription from "../../hooks/useAuthSubscription";
import { useState } from "react";
import { motion } from "framer-motion";
import Loader from "../../components/Loader/Loader";


function Mychats() {
  const user = useSelector((state: RootState) => state.user.entities?.user);
  const { data, loading } = useAuthSubscription<IChatResponse>(GET_MY_CHATS, {
    id: user?.id,
  });
  const [searchTerm, setSearchTerm] = useState<string>(``);

  return (
    <BaseLayout title="My Chats">
      <div className="flex flex-col h-full">
        <div className="px-4 h-full">
          {loading ? (
            <Loader/>
          ) : (
            <div>
              <div className="bg-gray-100 flex items-center my-2 relative rounded-full">
                <div className="text-gray-500 pl-3 hover:text-black">
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
                  className="w-full focus:outline-none rounded-full p-2  bg-gray-100"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search Conversation"
                />
                <div
                  role="button"
                  onClick={() => setSearchTerm("")}
                  className="text-gray-500 pr-3 hover:text-black"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <title>close</title>
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <hr className=" border-gray-300"></hr>
              <ul>
                {data?.communication_threads
                  .filter((li) => {
                    if (searchTerm == "") {
                      return li;
                    } else {
                      return (
                        li.profileByStartedWith.name ||
                        li.profileByStartedBy.name
                      )
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase());
                    }
                  })
                  .flatMap((chat) => (
                    <Link key={chat.id} role="button" to={`/chats/${chat.id}`}>
                      <motion.li className="my-chat-list "style={{animationName:"hello1", animationDuration:"0.3s", animationIterationCount:"1", animationFillMode:"alternate", animationTimingFunction:"ease-in-out" }}
   
                      >
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
                            style={{ color: "#3985db" }}
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </motion.li>
                    </Link>
                  ))}
              </ul>
            </div>
          )}
        </div>
        <Link
          to="/chats/new"
          className="sticky text-white common-btn p-4 left-0 bottom-0 w-full block text-center"
        >
          New Chat
        </Link>
      </div>
    </BaseLayout>
  );
}
export default Mychats;
