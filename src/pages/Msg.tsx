import BaseLayout from "../layouts/Base";
import useAuthSubscription from "../hooks/useAuthSubscription";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, MutableRefObject, useEffect } from "react";
import { GET_MY_MESSAGES, SEND_MESSAGE } from "../api/queries";
import { RootState } from "../redux/store";
import moment from "moment";
import { useMutation } from "@apollo/client";
import { ISendMessage, IThreadResponse } from "../types/Chat";
import send from "../assets/images/send.png";
import { useParams } from "react-router-dom";
import DEFAULT_AVATAR from "../assets/images/profileuser.png";
import PicPreview from "../components/PicPreview";
import modalSlice from "../redux/slices/modal-slice";

const Msg = () => {
  const { id } = useParams<{ id: string }>();
  const { user, token } = useSelector(
    (state: RootState) => state.user.entities!
  );
  const { data, loading } = useAuthSubscription<IThreadResponse>(
    GET_MY_MESSAGES,
    {
      id: id,
    }
  );
  const temp1 = useRef() as MutableRefObject<HTMLDivElement>;
  const [input, setInput] = useState<string>("");
  const [pictures, setPictures] = useState<string>("");
  const wrapperRef = useRef(null);
  const [sendMessage] = useMutation<ISendMessage>(SEND_MESSAGE);
  const dispatch = useDispatch();

  const uploadPicture = async (e: React.ChangeEvent<any>) => {
    console.log(e);
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    const res = await fetch("https://functions.app.pariqsha.com/files/upload", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { url } = await res.json();
    setPictures(url);
    e.target.value = "";
  };

  const handleSend = async () => {
    if (input.trim().length === 0 && pictures.length === 0) return;
    sendMessage({
      variables: {
        message: input,
        threadId: id,
        sentBy: user?.id,
        attachmentUrl: pictures,
      },
    })
      .then((info) => {
        console.log(info);
        setInput("");
        setPictures("");
        temp1.current?.scrollTo(0, temp1.current?.scrollHeight)
      })
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    temp1.current?.scrollTo(0, temp1.current?.scrollHeight)
  }, [data])


  return (
    <BaseLayout title="Messages">
      <div className="flex h-full flex-col">
        <div className="">
          <div className="bg-gradient-to-bl text-center px-2 py-4">
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
        </div>

        <div ref={temp1} className="flex-1 px-2 overflow-y-auto">
          <div className="flex flex-col flex-auto rounded-2xl">
            <div className="grid">
              {loading ? (
                <div className=" flex justify-center mt-4 items-center">
                  <div
                    className="loader ease-linear rounded-full border-4 border-t-4 border-gray-300 h-10 w-10"
                    style={{ borderTopColor: "#00D2E0" }}
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
                                {msg.attachment_url && msg.attachment_url !== "" && (
                                  <div
                                    onClick={() => {
                                      dispatch(
                                        modalSlice.actions.showModal({
                                          body: <PicPreview url={msg.attachment_url}/>,
                                        })
                                      );
                                    }}
                                  >
                                    <img
                                      src={msg.attachment_url}
                                      className="w-20 h-20"
                                    />
                                  </div>
                                )}
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
                                {msg.attachment_url && msg.attachment_url !== "" && (
                                  <img
                                    src={msg.attachment_url}
                                    className="w-20 h-20"
                                  />
                                )}
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

        <div className="">
          <div className="p-1 pb-1">
            <div className="flex flex-row items-center  bg-white  border border-gray-300 p-2   rounded-lg     w-full  ">
              <form
                onSubmit={handleSend}
                encType="multipart/form-data"
                className="w-full"
              >
                {pictures !== "" && (
                  <div className="flex  mb-2">
                    <div className="w-20 h-20 flex">
                      <img src={pictures} className="w-20 h-20" />
                      <button
                        type="button"
                        onClick={() => setPictures("")}
                        className="-ml-2 -mt-2 rounded-full h-5 w-5 bg-gray-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
                <div className="flex-grow">
                  <div className="relative w-full">
                    <div>
                      <textarea
                        className="resize-none flex w-11/12 focus:outline-none break-words focus:border-indigo-300 h-8 pt-1  "
                        placeholder="Type Your Message"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                      />
                      <div className="absolute flex items-center justify-center h-full pr-2 right-0 top-0 text-gray-400">
                        <input
                          type="file"
                          onChange={uploadPicture}
                          className="hidden"
                          ref={wrapperRef}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            (wrapperRef as any).current.click();
                          }}
                        >
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
                        </button>
                        <button type="submit">
                          <img src={send} className=" w-5 h-5 ml-2"></img>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};
export default Msg;
