import { useMutation, useQuery } from "@apollo/client";
import moment from "moment";
import { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useFetch from "use-http";
import {
  ADD_RP_PAYLOAD,
  GET_EXAM_DETAILS,
  GET_REGISTRATION_EXAM,
  MAKE_REFUND_REQUEST,
  REGISTER_EXAM,
  UNREGISTER_EXAM,
} from "../../api/queries";
import Card from "../Card";
import MarkdownView from "../MarkdownView";
import { RP_KEY_ID_TEST } from "../../Constants";
import BaseLayout from "../../layouts/Base";
import modalSlice from "../../redux/slices/modal-slice";
import { RootState } from "../../redux/store";
import {
  ExamDetailsResponse,
  ExamRegistrationResponse,
} from "../../types/Quiz";
import UnregisterBody from "../UnregisterBody";

declare let Razorpay: any;

const getLocalItems = () => {
  const likes = localStorage.getItem("like");
  console.log(likes);

  if (likes) {
    return JSON.parse(likes);
  } else {
    return [];
  }
};

export default function ExamCardDetails(): ReactElement {
    console.log("Exam Details")
  const { id } = useParams<{ id: string }>();
  const user = useSelector((state: RootState) => state.user.entities?.user);
  const [registerQuiz] = useMutation(REGISTER_EXAM);
  const [unRegisterQuiz] = useMutation(UNREGISTER_EXAM);
  const [addRPPayload] = useMutation(ADD_RP_PAYLOAD);
  const [makeRefundRequest] = useMutation(MAKE_REFUND_REQUEST);
  const dispatch = useDispatch();
  const [like, setLike] = useState<boolean>(getLocalItems());

  const { data } = useQuery<ExamDetailsResponse>(GET_EXAM_DETAILS, {
    variables: {
      id,
    },
  });
  const { data: registration, refetch: refetchRegistration } =
    useQuery<ExamRegistrationResponse>(GET_REGISTRATION_EXAM, {
      variables: {
        quizId: id,
        userId: user?.id,
      },
    });
  const { post: createOrder } = useFetch(`orders`, {
    cache: "no-cache",
  });
  useEffect(() => {
    localStorage.setItem("like", JSON.stringify(like));
    refetchRegistration({
      quizId: id,
      userId: user?.id,
    });
  }, [id, refetchRegistration, user?.id, like]);

  const handleLike = () => {
    if (!like) {
      setLike(true);
    } else {
      setLike(false);
    }
  };

  return (
    <BaseLayout title="Details" showBack>
      <div className="flex justify-center mx-4 mt-4">
        <Card
          title={data?.exams_exam_by_pk.title}
          imgSrc={data?.exams_exam_by_pk.image_url}
          content={<MarkdownView md={data?.exams_exam_by_pk.description} />}
          price={data?.exams_exam_by_pk.price}
          date={moment(data?.exams_exam_by_pk.start_at).format("Do MMM")}
          coverImgSrc={data?.exams_exam_by_pk.cover_image_url}
          time={moment(data?.exams_exam_by_pk.start_at).format("h:mm A")}
          duration={moment
            .duration(
              moment(data?.exams_exam_by_pk.start_at).diff(
                moment(data?.exams_exam_by_pk.end_at)
              )
            )
            .humanize()}
          // subTitle={data?.exams_exam_by_pk.short_description.split(",").join(", ")}
          likeBtn={
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
          }
          footer={
            registration?.exams_registration.length === 0 ? (
              <>
                <button
                  className="button common-btn"
                  onClick={async () => {
                    if (data?.exams_exam_by_pk.price === 0) {
                      Promise.all([
                        registerQuiz({
                          variables: {
                            userId: user?.id,
                            quizId: data?.exams_exam_by_pk.id,
                          },
                        }),
                      ])
                        .catch((e) => {
                          console.error(e);
                        })
                        .then(() => {
                          refetchRegistration({
                            user: user?.id,
                          });
                        });
                      return;
                    }
                    const res = await createOrder({
                      quizId: data?.exams_exam_by_pk.id,
                    });
                    const options = {
                      key: RP_KEY_ID_TEST, // Enter the Key ID generated from the Dashboard
                      amount: res.amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                      currency: "INR",
                      name: "Pariqsha",
                      description: "Test Transaction",
                      image:
                        "https://pariqsha.com/static/media/pariqsha.8035258e.png",
                      order_id: res.id, //Pass the `id` obtained in the previous step
                      handler: function (response: {
                        razorpay_payment_id: string;
                        razorpay_order_id: string;
                        razorpay_signature: string;
                      }) {
                        Promise.all([
                          addRPPayload({
                            variables: {
                              orderId: res.receipt,
                              payload: JSON.stringify(response),
                            },
                          }),
                          registerQuiz({
                            variables: {
                              userId: user?.id,
                              quizId: data?.exams_exam_by_pk.id,
                            },
                          }),
                        ])
                          .catch((e) => {
                            console.error(e);
                          })
                          .then(() => {
                            refetchRegistration({
                              quizId: id,
                              userId: user?.id,
                            });
                          });
                      },
                    };
                    const rzp1 = new Razorpay(options);
                    rzp1.open();
                  }}
                >
                  Register
                </button>
              </>
            ) : (
              <button
                className="button-link text-red-500"
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
                                  quizId: data?.exams_exam_by_pk.id,
                                },
                              }),
                              unRegisterQuiz({
                                variables: {
                                  userId: user?.id,
                                  quizId: data?.exams_exam_by_pk.id,
                                },
                              }),
                            ])
                              .catch((e) => {
                                console.error(e);
                              })
                              .then(() => {
                                dispatch(modalSlice.actions.hideModal());
                                refetchRegistration({
                                  quizId: id,
                                  userId: user?.id,
                                });
                              });
                          }}
                        />
                      ),
                    })
                  );
                }}
              >
                Unregister
              </button>
            )
          }
        />
      </div>
    </BaseLayout>
  );
}
