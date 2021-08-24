import BaseLayout from "../layouts/Base";
import useAuthSubscription from "../hooks/useAuthSubscription";
import { useSelector } from "react-redux";
import { useState } from "react";
import { GET_MY_MESSAGES, SEND_MESSAGE } from "../api/queries";
import { RootState } from "../redux/store";
import moment from "moment";
import { useMutation } from "@apollo/client";
import { IMessage, ISendMessage } from "../types/Chat";
import send from "../assets/images/send.png";
import { useParams } from "react-router-dom";

const Messages = () => {
  const { id } = useParams<{ id: string }>();
  const user = useSelector((state: RootState) => state.user.entities?.user);
  const { data } = useAuthSubscription<IMessage>(GET_MY_MESSAGES, {
    id: id,
  });

  const [input, setInput] = useState<string>("");
  const [sendMessage] = useMutation<ISendMessage>(SEND_MESSAGE);

  const handleSend = () => {
    if (input.trim().length === 0) return;
    sendMessage({
      variables: { message: input, threadId: id, sentBy: user?.id },
    })
      .then((info) => {
        console.log(info);
        setInput("");
      })
      .catch((e) => console.error(e));
  };

  return (
    <BaseLayout title="Messages">
      <div className=" mx-auto    relative pb-12">
        <div className="header pt-4 text-center sticky left-auto right-auto top-0 bg-gradient-to-bl">
          <img
            className="inline object-cover w-12 h-12 mr-2 rounded-full"
            src="https://i.imgur.com/aq39RMA.jpg"
          />
          <h4 className="text-black text-sm font-bold">Grayson Pierce</h4>
          <hr className="mt-2 border-gray-300 border-b-1"></hr>
        </div>

        <div className="px-4">
          <div className="flex flex-col flex-auto rounded-2xl h-full">
            <div className="grid">
              <ul>
                {data?.communication_messages.flatMap((msg, index) => (
                  <div key={index}>
                    {msg.sent_by === user?.id ? (
                      <li className="py-3 pb-0 rounded-lg">
                      <div className="flex items-center justify-start flex-row-reverse">
                        <div className="text-sm bg-white py-2 px-4 rounded-xl">
                          <p>{msg.message}</p>
                          <small className="p-0 float-right text-gray-500">
                            {moment(msg.created_at).format("LT")}
                          </small>
                        </div>
                      </div>
                    </li>
                    ) : (
                      <li className="py-3 rounded-xl">
                        <div className="flex flex-row items-center">
                          <div className="text-sm bg-white py-2 px-4 rounded-xl common-btn text-white">
                            <p>{msg.message}</p>
                            <small className="p-0 float-right">
                              {moment(msg.created_at).format("LT")}
                            </small>
                          </div>
                        </div>
                      </li>
                      
                    )}
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <form onSubmit={handleSend}>
          <div className="flex flex-row items-center  rounded-full bg-white md:w-10/12 p-2  md:left-80 bottom-0 fixed w-full left-0">
            <div className="flex-grow ml-4">
              <div className="relative w-full">
                <input
                  type="text"
                  className="flex w-full focus:outline-none focus:border-indigo-300  h-10 "
                  placeholder="Type Your Message"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <div className="absolute flex items-center justify-center h-full right-0 top-0 text-gray-400">
                  <button type="button">
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
                  </button>
                  <button type="button">
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
                  <button type="submit">
                    <img src={send} className="	w-5 h-5 ml-2"></img>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </BaseLayout>
  );
};

export default Messages;
