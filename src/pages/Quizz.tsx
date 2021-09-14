import Card from "../components/Card";
import { useMutation, useQuery } from "@apollo/client";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, useHistory, Switch } from "react-router-dom";
import useFetch from "use-http";

import {
  ADD_RP_PAYLOAD,
  GET_MY_QUIZZES,
  GET_TODAY_QUIZZES,
  MAKE_REFUND_REQUEST,
  REGISTER_QUIZ,
  UNREGISTER_QUIZ,
} from "../api/queries";
import { RP_KEY_ID_TEST } from "../Constants";
import BaseLayout from "../layouts/Base";
import modalSlice from "../redux/slices/modal-slice";
import { RootState } from "../redux/store";
import { MyQuizResponse, QuizResponse } from "../types/Quiz";
import UnregisterBody from "../components/UnregisterBody";
import Collections from "../components/Collections";
import Loader from "../components/Loader";

const today = new Date().toISOString();

declare let Razorpay: any;

export default function Quizz() {
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

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [like, setLike] = useState<boolean>(false);

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
              onClick={() => setLike((a) => !a)}
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
              )}

              <button
                onClick={() => history.push(`details/${quiz.id}`)}
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

  return (
    <BaseLayout title="Quizzes">
      <div className="px-3">
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
            className="w-full focus:outline-none p-2 rounded-full bg-gray-100"
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className=" px-4 my-4">
          <div className="collections w-full">
            <Collections />
          </div>
          <Switch>
            <Route exact path="/home/live">
              <div>Live</div>
            </Route>
            <Route exact path="/home">
              <div className="flex flex-row flex-wrap gap-4 w-full mt-2">
                {getCards()}
              </div>
            </Route>
            <Route exact path="/home/upcoming">
              <div>Upcoming</div>
            </Route>
            <Route exact path="/home/like">
              <div className="flex flex-row flex-wrap gap-4 w-full mt-2">
                <div> No Liked Card</div>
              </div>
            </Route>
            <Route exact path="/home/myquiz">
              <div>My quiz</div>
            </Route>
          </Switch>
        </div>
      )}
    </BaseLayout>
  );
}
