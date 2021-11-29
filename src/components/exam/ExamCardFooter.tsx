import { useMutation, useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  ADD_RP_PAYLOAD,
  GET_EXAM_DATA,
  GET_MY_EXAMS,
  MAKE_REFUND_REQUEST,
  REGISTER_EXAM,
  UNREGISTER_EXAM,
} from "../../api/queries";
import { RootState } from "../../redux/store";
import { IExam, IExamData, MyExamResponse } from "../../types/Quiz";
import UnregisterBody from "../UnregisterBody";
import Instructions from "../Instructions";
import { RP_KEY_ID_TEST } from "../../Constants";
import modalSlice from "../../redux/slices/modal-slice";
import useFetch from "use-http";
import moment from "moment";
import { useEffect, useState } from "react";

declare let Razorpay: any;
const today = new Date().toISOString();

const ExamCardFooter = ({ item }: { item: IExam }) => {
  const user = useSelector((state: RootState) => state.user.entities?.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const { data: myExams, refetch } = useQuery<MyExamResponse>(GET_MY_EXAMS, {
    variables: {
      user: user?.id,
    },
  });
  const { data: myExamStatus } = useQuery<IExamData>(GET_EXAM_DATA, {
    variables: {
      user: user?.id,
      examId: item?.id,
    },
  });
  const { post: createOrder } = useFetch(`exam`, {
    cache: "no-cache",
  });
  const [addRPPayload] = useMutation(ADD_RP_PAYLOAD);
  const [registerExam] = useMutation(REGISTER_EXAM);
  const [unRegisterExam] = useMutation(UNREGISTER_EXAM);
  const [makeRefundRequest] = useMutation(MAKE_REFUND_REQUEST);

  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (
      moment(today).format("Do MMM") === moment(item.start_at).format("Do MMM")
    ) {
      setIsDisabled(true);
    }
  }, [today]);

  return (
    <>
      {myExamStatus?.exams_registration?.[0].exam_status === "submitted" ? (
        <button
          onClick={() => history.push("/results")}
          className="quiz-button common-btn"
        >
          Check Result
        </button>
      ) : (
        <>
          {myExams?.exams_registration.findIndex(
            (q) => q.exam.id === item.id
          ) === -1 ? (
            <button
              disabled={isDisabled}
              className={`md:mb-0 mb-0.5 ${isDisabled ? "disabled-button" : "quiz-button common-btn"}`}
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
          ) : (
            <>
              <button
                disabled={isDisabled}
                className={`md:mb-0 mb-0.5 ${isDisabled ? "disabled-button " : "quiz-button  common-btn"}`}
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
                className="quiz-button common-btn"
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
        </>
      )}
      <button
        onClick={() => history.push(`/examdetails/${item.id}`)}
        className="quiz-button common-btn"
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
  );
};

export default ExamCardFooter;
