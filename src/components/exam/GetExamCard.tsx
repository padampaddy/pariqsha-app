import Card from "../Card";
import { useMutation, useQuery } from "@apollo/client";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useFetch from "use-http";
import {
  ADD_RP_PAYLOAD,
  MAKE_REFUND_REQUEST,
  GET_MY_EXAMS,
  GET_TODAY_EXAM,
  REGISTER_EXAM,
  UNREGISTER_EXAM,
} from "../../api/queries";
import { RP_KEY_ID_TEST } from "../../Constants";
import modalSlice from "../../redux/slices/modal-slice";
import { RootState } from "../../redux/store";
import { MyExamResponse, IExamResponse } from "../../types/Quiz";
import UnregisterBody from "../UnregisterBody";
import Instructions from "../Instructions";

const today = new Date().toISOString();

declare let Razorpay: any;

const getLocalItems = () => {
  const likes = localStorage.getItem("like");

  if (likes) {
    return JSON.parse(likes);
  } else {
    return [];
  }
};

const GetExamCards = ({ searchTerm = "" }: { searchTerm: string }) => {
  const user = useSelector((state: RootState) => state.user.entities?.user);
  const { data } = useQuery<IExamResponse>(GET_TODAY_EXAM, {
    variables: {
      date: today,
    },
  });
  const { data: myExams, refetch } = useQuery<MyExamResponse>(GET_MY_EXAMS, {
    variables: {
      user: user?.id,
    },
  });

  const { post: createOrder } = useFetch(`exam`, {
    cache: "no-cache",
  });

  const [showMyExams] = useState<boolean>(false);
  const [registerExam] = useMutation(REGISTER_EXAM);
  const [unRegisterExam] = useMutation(UNREGISTER_EXAM);
  const [addRPPayload] = useMutation(ADD_RP_PAYLOAD);
  const [makeRefundRequest] = useMutation(MAKE_REFUND_REQUEST);
  const dispatch = useDispatch();
  const history = useHistory();

  const [like, setLike] = useState<boolean>(getLocalItems());

  const handleLike = () => {
    if (!like) {
      setLike(true);
    } else {
      setLike(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("like", JSON.stringify(like));
    refetch({
      user: user?.id,
    });
  }, [refetch, user?.id, like]);

  const getExamCards = useCallback(() => {
    let examData = data?.exams_exam;
    if (!examData) return <div />;
    if (showMyExams)
      examData = examData.filter(
        (item) =>
          myExams?.exams_registration.findIndex(
            (q) => q.exam.id === item.id
          ) !== -1
      );

    return examData
      .filter((li) => {
        if (searchTerm == "") {
          return li;
        } else if (searchTerm.length === 0) {
          return <p className="text-center pt-4">No Card</p>;
        } else {
          return li.title.toLowerCase().includes(searchTerm.toLowerCase());
        }
      })
      .flatMap((item, index) => (
        <Card
          decorate
          key={index}
          id={item.id}
          title={item.title}
          imgSrc={item.image_url}
          content={
            <div style={{ whiteSpace: "pre-wrap" }}>
              {item.short_description}
            </div>
          }
          price={item.price}
          date={moment(item.start_at).format("Do MMM")}
          coverImgSrc={item.cover_image_url}
          time={moment(item.start_at).format("h:mm A")}
          duration={item.duration_in_minutes}
          //   subTitle={item.short_description.split(",").join(", ")}
          likeBtn={
            <>
              <svg
                role="button"
                onClick={() => handleLike()}
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mr-1 text-red-600"
                fill={like ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <title>heart</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </>
          }
          footer={
            <>
              {myExams?.exams_registration.findIndex(
                (q) => q.exam.id === item.id
              ) === -1 ? (
                <>
                  <button
                    className="quiz-button md:mb-0 mb-0.5 "
                    onClick={async () => {
                      if (item.price === 0) {
                        Promise.all([
                          registerExam({
                            variables: {
                              userId: user?.id,
                              examId: item.id,
                            },
                          }),
                        ])
                          .catch((e) => {
                            console.error(e);
                          })
                          .then(() => {
                            refetch({
                              user: user?.id,
                            });
                          });
                        return;
                      }
                      const data = await createOrder({
                        examId: item.id,
                      });
                      const options = {
                        key: RP_KEY_ID_TEST, // Enter the Key ID generated from the Dashboard
                        amount: data.amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                        currency: "INR",
                        name: "Pariqsha",
                        description: "Test Transaction",
                        image:
                          "https://pariqsha.com/static/media/pariqsha.8035258e.png",
                        order_id: data.id, //Pass the `id` obtained in the previous step
                        handler: function (response: {
                          razorpay_payment_id: string;
                          razorpay_order_id: string;
                          razorpay_signature: string;
                        }) {
                          Promise.all([
                            addRPPayload({
                              variables: {
                                orderId: data.receipt,
                                payload: JSON.stringify(response),
                              },
                            }),
                            registerExam({
                              variables: {
                                userId: user?.id,
                                examId: item.id,
                              },
                            }),
                          ])
                            .catch((e) => {
                              console.error(e);
                            })
                            .then(() => {
                              refetch({
                                user: user?.id,
                              });
                            });
                        },
                      };
                      const rzp1 = new Razorpay(options);
                      rzp1.open();
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                      />
                    </svg>
                    Register
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="text-red-500 quiz-button  "
                    onClick={() => {
                      dispatch(
                        modalSlice.actions.showModal({
                          title: "Are you sure?",
                          body: (
                            <UnregisterBody
                              onConfirm={() => {
                                Promise.all([
                                  makeRefundRequest({
                                    variables: {
                                      examId: item.id,
                                    },
                                  }),
                                  unRegisterExam({
                                    variables: {
                                      userId: user?.id,
                                      examId: item.id,
                                    },
                                  }),
                                ])
                                  .catch((e) => {
                                    console.error(e);
                                  })
                                  .then(() => {
                                    dispatch(modalSlice.actions.hideModal());
                                    refetch({
                                      user: user?.id,
                                    });
                                  });
                              }}
                            />
                          ),
                        })
                      );
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                      />
                    </svg>
                    Unregister
                  </button>

                  <button
                    onClick={() => {
                      dispatch(
                        modalSlice.actions.showModal({
                          body: (
                            <Instructions
                              examId={item.id}
                              duration={item.duration_in_minutes}
                            />
                          ),
                        })
                      );
                    }}
                    className="quiz-button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Start
                  </button>
                </>
              )}

              <button
                onClick={() => history.push(`/examdetails/${item.id}`)}
                className="quiz-button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                Details
              </button>
            </>
          }
        />
      ));
  }, [
    data?.exams_exam,
    showMyExams,
    myExams?.exams_registration,
    createOrder,
    addRPPayload,
    registerExam,
    user?.id,
    refetch,
    dispatch,
    makeRefundRequest,
    unRegisterExam,
    history,
    searchTerm,
    like,
  ]);

  return <>{getExamCards()}</>;
};

export default GetExamCards;
