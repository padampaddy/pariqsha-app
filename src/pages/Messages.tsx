import BaseLayout from "../layouts/Base";
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { GET_MY_MESSAGES } from "../api/queries";
import modalSlice from "../redux/slices/modal-slice";
import { RootState } from "../redux/store";
import { Message } from "../types/Chat";

const Messages = () => {
  const user = useSelector((state: RootState) => state.user.entities?.user);
  const { data } = useQuery<Message>(GET_MY_MESSAGES, {
    variables: {
      id: user?.id,
    },
  });

  const dispatch = useDispatch();

  return (
    <BaseLayout>
      <div className=" mx-auto px-4 bg-gray-100 h-screen relative">
        <div className="header pt-8 text-center">
          <img
            className="inline object-cover w-12 h-12 mr-2 rounded-full"
            src="https://i.imgur.com/aq39RMA.jpg"
          />
          <h4 className="text-black text-xl font-bold">
            Grayson Pierce
            <p className="text-gray-400 font-medium text-xs">1 Unread</p>
          </h4>
        </div>
        <hr className="mt-2"></hr>
        <div className="">
          <p className="text-gray-400 font-medium text-xs text-center pt-2">
            Today 10:18AM
          </p>
          <div className="flex flex-col flex-auto rounded-2xl bg-gray-100 h-full">
            <div className="flex flex-col h-full overflow-x-auto mb-4">
              <div className="flex flex-col h-full">
                <div className="grid grid-cols-12 gap-y-2">
                  <div className="col-start-1 col-end-13 py-3 rounded-xl">
                    <div className="flex flex-row items-center">
                      <div className="text-sm bg-white py-2 px-4  rounded-xl common-btn text-white">
                        <div>Hey How are you today?</div>
                      </div>
                    </div>
                  </div>

                  <div className="col-start-4 col-end-13 py-3 pb-0 rounded-lg">
                    <div className="flex items-center justify-start flex-row-reverse">
                      <div className="text-sm bg-white py-2 px-4  rounded-xl">
                        <div>Im ok what about you?</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-start-5 col-end-13 py-3 pt-0 rounded-lg">
                    <div className="flex items-center justify-start flex-row-reverse">
                      <div className="text-sm bg-white py-2 px-4  rounded-xl">
                        <div>
                          Lorem ipsum dolor sit, amet consectetur adipisicing. ?
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-2 md:absolute left-0 bottom-0 fixed">
            <div className="flex-grow ml-4">
              <div className="relative w-full">
                <input
                  type="text"
                  className="flex w-full focus:outline-none focus:border-indigo-300  h-10 "
                  placeholder="Type Your Message"
                ></input>
                <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Messages;
