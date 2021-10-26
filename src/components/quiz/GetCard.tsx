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
  GET_MY_QUIZZES,
  GET_TODAY_QUIZZES,
  REGISTER_QUIZ,
  UNREGISTER_QUIZ,
} from "../../api/queries";
import { RP_KEY_ID_TEST } from "../../Constants";
import modalSlice from "../../redux/slices/modal-slice";
import { RootState } from "../../redux/store";
import { MyQuizResponse, QuizResponse } from "../../types/Quiz";
import UnregisterBody from "../UnregisterBody";

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

const GetCard = ({ searchTerm = "" }: { searchTerm: string }) => {
  const user = useSelector((state: RootState) => state.user.entities?.user);
  const { data } = useQuery<QuizResponse>(GET_TODAY_QUIZZES, {
    variables: {
      date: today,
    },
  });
  const { data: myQuizzes, refetch } = useQuery<MyQuizResponse>(
    GET_MY_QUIZZES,
    {
      variables: {
        user: user?.id,
      },
    }
  );

  const { post: createOrder } = useFetch(`orders`, {
    cache: "no-cache",
  });

  const [showMyQuizzes] = useState<boolean>(false);
  const [registerQuiz] = useMutation(REGISTER_QUIZ);
  const [unRegisterQuiz] = useMutation(UNREGISTER_QUIZ);
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

  const getCards = useCallback(() => {
    let quizData = data?.quiz_quiz;
    if (!quizData) return <div />;
    if (showMyQuizzes)
      quizData = quizData.filter(
        (quiz) =>
          myQuizzes?.quiz_registration.findIndex(
            (q) => q.quizByQuiz.id === quiz.id
          ) !== -1
      );

    return quizData
      .filter((li) => {
        if (searchTerm == "") {
          return li;
        } else if (searchTerm.length === 0) {
          return <p className="text-center pt-4">No Card</p>;
        } else {
          return li.title.toLowerCase().includes(searchTerm.toLowerCase());
        }
      })
      .flatMap((quiz, index) => (
        <Card
          decorate
          key={index}
          id={quiz.id}
          title={quiz.title}
          imgSrc={quiz.image}
          content={
            <div style={{ whiteSpace: "pre-wrap" }}>
              {quiz.short_description}
            </div>
          }
          price={quiz.price}
          date={moment(quiz.start_at).format("Do MMM")}
          coverImgSrc={quiz.cover}
          time={moment(quiz.start_at).format("h:mm A")}
          duration={moment
            .duration(moment(quiz.start_at).diff(moment(quiz.end_at)))
            .humanize()}
          subTitle={quiz.topics.split(",").join(", ")}
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
              {myQuizzes?.quiz_registration.findIndex(
                (q) => q.quizByQuiz.id === quiz.id
              ) === -1 ? (
                <>
                  <button
                    className="quiz-button md:mb-0 mb-0.5 "
                    onClick={async () => {
                      if (quiz.price === 0) {
                        Promise.all([
                          registerQuiz({
                            variables: {
                              userId: user?.id,
                              quizId: quiz.id,
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
                        quizId: quiz.id,
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
                            registerQuiz({
                              variables: {
                                userId: user?.id,
                                quizId: quiz.id,
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
                      className="h-5 w-5 mr-2"
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
                                      quizId: quiz.id,
                                    },
                                  }),
                                  unRegisterQuiz({
                                    variables: {
                                      userId: user?.id,
                                      quizId: quiz.id,
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
                    {/* <svg
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
                    </svg> */}
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
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Unregister
                  </button>
                  <button
                    onClick={() => history.push(`examstart/${quiz.id}`)}
                    className="quiz-button"
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
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                   
                    Start
                  </button>
                </>
              )}

              <button
                onClick={() => history.push(`/details/${quiz.id}`)}
                className="quiz-button"
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Details
              </button>
            </>
          }
        />
      ));
  }, [
    data?.quiz_quiz,
    showMyQuizzes,
    myQuizzes?.quiz_registration,
    createOrder,
    addRPPayload,
    registerQuiz,
    user?.id,
    refetch,
    dispatch,
    makeRefundRequest,
    unRegisterQuiz,
    history,
    searchTerm,
    like,
  ]);
  return <>{getCards()}</>;
};

export default GetCard;
