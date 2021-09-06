import BaseLayout from "../layouts/Base";
import { CHECK_CHAT, SEARCH_CONTACT, START_NEW_CHAT } from "../api/queries";
import { ISearchProfile } from "../types/Chat";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useHistory } from "react-router-dom";

function NewChat() {
  const user = useSelector((state: RootState) => state.user.entities?.user);
  const [startChat] = useMutation(START_NEW_CHAT, {
    onCompleted: (res) => {
      history.push(`/chats/${res.insert_communication_threads_one.id}`);
    },
  });
  const [query, setQuery] = useState('')
  const [search, { data, loading }] =
    useLazyQuery<ISearchProfile>(SEARCH_CONTACT);
    useEffect(() => {
    search({
      variables: {
        query: "%%",
        id: user?.id,
      },
    });
  }, []);
  const history = useHistory();
  const [checkChat, { variables }] = useLazyQuery(CHECK_CHAT, {
    onCompleted: (res) => {
      if (res.communication_threads.length === 0) {
        startChat({ variables });
      } else {
        history.push(`/chats/${res.communication_threads[0].id}`);
      }
    },
  });
  useEffect(()=>{
    search({
      variables: {
        query: `%${query}%`,
        id: user?.id,
      },
    });
  },[query])
  return (
    <BaseLayout title="My Contacts">
      <div className="flex flex-col h-full">
        <div className="px-4 h-full">
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
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)

                }}
                placeholder="Search Contacts"
              />
              <div
                role="button"
                className="text-gray-500 pr-3 hover:text-black"
                onClick={()=> setQuery('')}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <hr className=" border-gray-300"></hr>

            {loading ? (
              <div className=" flex justify-center mt-4 items-center">
                <div
                  className="loader ease-linear rounded-full border-4 border-t-4 border-gray-300 h-10 w-10"
                  style={{ borderTopColor: "#00D2E0" }}
                ></div>
              </div>
            ) : data?.users_profile.length === 0 ? (
              <p className="text-center pt-4">No Contact</p>
            ) : (
              data?.users_profile.flatMap((profile, index) => (
                <ul key={profile.id}>
                  <div
                    role="button"
                    onClick={() => {
                      checkChat({
                        variables: {
                          sid: user?.id,
                          rid: profile.id,
                        },
                        context: {
                          pId: profile.id,
                        },
                      });
                    }}
                  >
                    <li key={index} className="my-chat-list" style={{animationName:"hello1", animationDuration:"1s", animationIterationCount:"1", animationFillMode:"alternate", animationTimingFunction:"ease-in-out" }}>
                      <div className="flex ml-2 items-center">
                        <div className="h-50 w-50">
                          <img
                            src={profile.image_url}
                            width="50"
                            height="50"
                            className="rounded-full"
                          />
                        </div>
                        <div className="flex flex-col ml-4">
                          <span className="text-black font-bold text-sm">
                            {profile.name}
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
                  </div>
                </ul>
              ))
            )}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
export default NewChat;
