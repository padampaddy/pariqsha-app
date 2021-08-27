import { Link } from "react-router-dom";
import Cards from "../components/Cards";
import BaseLayout from "../layouts/Base";
import { useMutation, useQuery } from "@apollo/client";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useFetch from "use-http";
import {
  ADD_RP_PAYLOAD,
  GET_MY_QUIZZES,
  GET_TODAY_QUIZZES,
  MAKE_REFUND_REQUEST,
  REGISTER_QUIZ,
  UNREGISTER_QUIZ,
} from "../api/queries";
import modalSlice from "../redux/slices/modal-slice";
import { RootState } from "../redux/store";
import { MyQuizResponse, QuizResponse } from "../types/Quiz";
import { RP_KEY_ID_TEST } from "../Constants";
import UnregisterBody from "./components/UnregisterBody";

const today = new Date().toISOString();

declare let Razorpay: any;

function Quizz() {
  const user = useSelector((state: RootState) => state.user.entities?.user);
  const { data, loading } = useQuery<QuizResponse>(GET_TODAY_QUIZZES, {
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
  useEffect(() => {
    refetch({
      user: user?.id,
    });
  }, [refetch, user?.id]);

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
    return quizData.flatMap((quiz, index) => (
      <Cards
        decorate
        key={index}
        title={quiz.title}
        imgSrc={quiz.image}
        content={
          <div style={{ whiteSpace: "pre-wrap" }}>{quiz.short_description}</div>
        }
        price={quiz.price}
        date={moment(quiz.start_at).format("Do MMM")}
        coverImgSrc={quiz.cover}
        time={moment(quiz.start_at).format("h:mm A")}
        duration={moment
          .duration(moment(quiz.start_at).diff(moment(quiz.end_at)))
          .humanize()}
        subTitle={quiz.topics.split(",").join(", ")}
        footer={
          <>
            {myQuizzes?.quiz_registration.findIndex(
              (q) => q.quizByQuiz.id === quiz.id
            ) === -1 ? (
              <>
                <button
                  className="quiz-button md:mb-0 mb-0.5"
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
                    className="h-4 w-4 mr-1"
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
              <button
                className="text-red-500 quiz-button md:mb-0 mb-0.5"
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
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
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
            )}
            <button
              onClick={() => history.push(`details/${quiz.id}`)}
              className="quiz-button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
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
  ]);

  return (
    <BaseLayout title="Quizzes">
      <div className="px-3">
        <div className=" flex justify-center my-3 relative rounded-md ">
          <input
            className="w-full rounded-xl p-2 bg-gray-100 text-center  text-xs focus:outline-none"
            type="text"
            placeholder="Search"
          />
        </div>
        <hr className=" border-gray-300"></hr>
      </div>
      {loading?(
        <div className=" flex justify-center mt-4 items-center">
        <div
          className="loader ease-linear rounded-full border-4 border-t-4 border-gray-300 h-10 w-10"
          style={{ borderTopColor: "#00d2e0" }}
        ></div>
      </div>
      ):(
        <div className="md:flex mt-4 p-4">
        <div className="quizz-list  md:w-3/5 w-full mb-4">{getCards()}</div>

        <div className="collections md:w-2/5 md:pl-4 w-full invisible md:visible">
          <div className=" bg-white shadow-md">
            <div className="flex p-4 text-left font-medium border-b-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-yellow-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
              </svg>
              <p>Collections</p>
            </div>
            <div className="p-4">
              <ul>
                <Link to="">
                  <li className="p-3 hover:bg-gray-100 flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                    My Quizzes
                  </li>
                </Link>

                <Link to="">
                  <li className="p-3 hover:bg-gray-100 flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    Discover
                  </li>
                </Link>

                <Link to="">
                  <li className="p-3 hover:bg-gray-100 flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Liked
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
      )}
      
    </BaseLayout>
  );
}
export default Quizz;
