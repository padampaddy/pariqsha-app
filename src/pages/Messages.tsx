import BaseLayout from "../layouts/Base";
import useAuthSubscription from "../hooks/useAuthSubscription";
import { useSelector } from "react-redux";
import { useState } from "react";
import { GET_MY_MESSAGES, SEND_MESSAGE } from "../api/queries";
import { RootState } from "../redux/store";
import moment from "moment";
import { useMutation } from "@apollo/client";
import { ISendMessage, IThreadResponse } from "../types/Chat";
import send from "../assets/images/send.png";
import { useParams } from "react-router-dom";
import DEFAULT_AVATAR from "../assets/images/profileuser.png";

const Messages = () => {
  const { id } = useParams<{ id: string }>();

  const user = useSelector((state: RootState) => state.user.entities?.user);
  const { data, loading } = useAuthSubscription<IThreadResponse>(
    GET_MY_MESSAGES,
    {
      id: id,
    }
  );

  const [input, setInput] = useState<string>("");
  const [pictures, setPictures] = useState<string>("");
  const [sendMessage] = useMutation<ISendMessage>(SEND_MESSAGE);

  const uploadPicture = (e) => {
    setPictures(
      e.target.files[0]
      //   {
      //   picturePreview: URL.createObjectURL(e.target.files[0]),
      //   pictureAsFile: e.target.files[0],
      // }
    );
  };

  const handleSend = async () => {
    if (input.trim().length === 0) return;
    sendMessage({
      variables: { message: input, threadId: id, sentBy: user?.id },
    })
      .then((info) => {
        console.log(info);
        setInput("");
      })
      .catch((e) => console.error(e));

    const formData = new FormData();
    formData.append("files", pictures);

    const res = await fetch("https://functions.app.pariqsha.com/files/upload", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const responseObj = await res.json();
    console.log(responseObj);

    if (responseObj.isSuccess == true) {
      sendMessage({
        variables: { attachment_url: pictures },
      });
      setPictures("");
    }
  };

  return (
    <BaseLayout title="Messages">
      <div className=" mx-auto">
        <div className="header pt-4 text-center sticky left-auto right-auto top-0 bg-gradient-to-bl">
          <img
            className="inline object-cover w-12 h-12 rounded-full"
            src={
              data?.communication_threads_by_pk.profileByStartedWith.image_url
                ? data?.communication_threads_by_pk.profileByStartedWith
                    .image_url
                : DEFAULT_AVATAR
            }
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
              ((e.target as HTMLImageElement).src = DEFAULT_AVATAR)
            }
          ></img>
          <h4 className="text-black pt-1 text-sm font-bold">
            {data?.communication_threads_by_pk.profileByStartedWith.name}
          </h4>
          <hr className="mt-2 border-gray-300 border-b-1"></hr>
        </div>

        <div className="px-2 pt-2">
          <div className="flex flex-col flex-auto rounded-2xl h-screen">
            <div className="grid">
              {loading ? (
                <div className=" flex justify-center mt-4 items-center">
                  <div
                    className="loader ease-linear rounded-full border-4 border-t-4 border-gray-300 h-10 w-10"
                    style={{ borderTopColor: "#00d2e0" }}
                  ></div>
                </div>
              ) : (
                <ul>
                  {data?.communication_threads_by_pk.messages.flatMap(
                    (msg, index) => (
                      <div key={index}>
                        {msg.sent_by === user?.id ? (
                          <li className=" pb-1 rounded-xl">
                            <div className="flex items-center justify-end">
                              <div className="text-sm py-1 px-2 common-btn text-white rounded-xl max-w-xs md:max-w-md">
                                <p className="leading-normal">{msg.message}</p>
                                <small
                                  className="p-0 float-right text-white leading-normal"
                                  style={{ fontSize: "8px" }}
                                >
                                  {moment(msg.created_at).fromNow()}
                                </small>
                              </div>
                            </div>
                          </li>
                        ) : (
                          <li className="pb-1 rounded-xl">
                            <div className="flex flex-row items-center justify-start">
                              <div className="text-sm bg-white py-1 px-2 rounded-xl  max-w-xs md:max-w-md">
                                <p className="leading-normal">{msg.message}</p>
                                <small
                                  className="p-0 float-right leading-normal"
                                  style={{ fontSize: "8px" }}
                                >
                                  {moment(msg.created_at).fromNow()}
                                </small>
                              </div>
                            </div>
                          </li>
                        )}
                      </div>
                    )
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center  rounded-full bg-white p-2   bottom-0 sticky w-full left-0">
        <form
          onSubmit={handleSend}
          encType="multipart/form-data"
          className="w-full"
        >
          <div className="flex-grow ml-4">
            <div className="relative w-full">
              <input
                type="text"
                className="flex w-full focus:outline-none focus:border-indigo-300  h-10 "
                placeholder="Type Your Message"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />

              {/* {data?.communication_threads_by_pk.messages.flatMap(
                (pic, index) => (
                  <img key={index} src={pic.attachment_url} />
                )
              )} */}

              <div className="absolute flex items-center justify-center h-full pr-2 right-0 top-0 text-gray-400">
                <label
                  data-toggle="tooltip"
                  data-placement="left"
                  title="Upload"
                >
                  <input
                    type="file"
                    multiple
                    value={pictures}
                    onChange={uploadPicture}
                    className="hidden"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                </label>

                <button type="submit">
                  <img src={send} className="	w-5 h-5 ml-2"></img>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </BaseLayout>
  );
};

export default Messages;
