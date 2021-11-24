import { useLazyQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { CHECK_CHAT, SEARCH_CONTACT, START_NEW_CHAT } from "../../api/queries";
import Loader from "../../components/Loader/Loader";
import SearchBar from "../../components/SearchBar";
import BaseLayout from "../../layouts/Base";
import { RootState } from "../../redux/store";
import { ISearchProfile } from "../../types/Chat";
import DEFAULT_AVATAR from "../../assets/images/profileuser.png";

function NewChat() {
  const user = useSelector((state: RootState) => state.user.entities?.user);
  const [startChat] = useMutation(START_NEW_CHAT, {
    onCompleted: (res) => {
      history.push(`/chats/${res.insert_communication_threads_one.id}`);
    },
  });
  const [searchTerm, setSearchTerm] = useState('')
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
        query: `%${searchTerm}%`,
        id: user?.id,
      },
    });
  },[searchTerm])
  return (
    <BaseLayout title="My Contacts">
      <div className="flex flex-col h-full">
        <div className="px-4 my-2 h-full">
          <div>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            {loading ? (
              <Loader/>
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
                    <li key={index} className="my-chat-list" style={{animationName:"hello1", animationDuration:"0.3s", animationIterationCount:"1", animationFillMode:"alternate", animationTimingFunction:"ease-in-out" }}>
                      <div className="flex ml-2 items-center">
                        <div className="h-50 w-50">
                          <img
                            src={profile.image_url? profile.image_url: DEFAULT_AVATAR}
                            width="50"
                            height="50"
                            className="rounded-full"
                          />
                        </div>
                        <div className="flex flex-col ml-4">
                          <span className="text-black font-bold text-sm capitalize">
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
