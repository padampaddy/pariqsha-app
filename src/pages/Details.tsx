import { useMutation, useQuery } from '@apollo/client'
import moment from 'moment'
import { ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import useFetch from 'use-http'
import {
  ADD_RP_PAYLOAD,
  GET_QUIZ_DETAILS,
  GET_REGISTRATION_QUIZ,
  MAKE_REFUND_REQUEST,
  REGISTER_QUIZ,
  UNREGISTER_QUIZ,
} from '../api/queries'
import Card from '../components/Card'
import MarkdownView from '../components/MarkdownView'
import { RP_KEY_ID_TEST } from '../Constants'
import Base from '../layouts/Base'
import modalSlice from '../redux/slices/modal-slice'
import { RootState } from '../redux/store'
import { QuizDetailsResponse, QuizRegistrationResponse } from '../types/Quiz'
import UnregisterBody from './components/UnregisterBody'

declare let Razorpay: any

export default function Details(): ReactElement {
  const { id } = useParams<{ id: string }>()
  const user = useSelector((state: RootState) => state.user.entities?.user)

  const { data } = useQuery<QuizDetailsResponse>(GET_QUIZ_DETAILS, {
    variables: {
      id,
    },
  })
  const { data: registration, refetch: refetchRegistration } = useQuery<
    QuizRegistrationResponse
  >(GET_REGISTRATION_QUIZ, {
    variables: {
      quizId: id,
      userId: user?.id,
    },
  })
  const { post: createOrder } = useFetch(`orders`, {
    cache: 'no-cache',
  })
  useEffect(() => {
    refetchRegistration({
      quizId: id,
      userId: user?.id,
    })
  }, [id, refetchRegistration, user?.id])
  const [registerQuiz] = useMutation(REGISTER_QUIZ)
  const [unRegisterQuiz] = useMutation(UNREGISTER_QUIZ)
  const [addRPPayload] = useMutation(ADD_RP_PAYLOAD)
  const [makeRefundRequest] = useMutation(MAKE_REFUND_REQUEST)
  const dispatch = useDispatch()
  return (
    <Base title="Details" showBack>
      <div className="flex justify-center">
        <Card
          title={data?.quiz_quiz_by_pk.title}
          imgSrc={data?.quiz_quiz_by_pk.image}
          content={<MarkdownView md={data?.quiz_quiz_by_pk.description} />}
          price={data?.quiz_quiz_by_pk.price}
          date={moment(data?.quiz_quiz_by_pk.start_at).format('Do MMM')}
          coverImgSrc={data?.quiz_quiz_by_pk.cover}
          time={moment(data?.quiz_quiz_by_pk.start_at).format('h:mm A')}
          duration={moment
            .duration(
              moment(data?.quiz_quiz_by_pk.start_at).diff(
                moment(data?.quiz_quiz_by_pk.end_at),
              ),
            )
            .humanize()}
          subTitle={data?.quiz_quiz_by_pk.topics.split(',').join(', ')}
          footer={
            registration?.quiz_registration.length === 0 ? (
              <>
                <button
                  className="button common-btn"
                  onClick={async () => {
                    if (data?.quiz_quiz_by_pk.price === 0) {
                      Promise.all([
                        registerQuiz({
                          variables: {
                            userId: user?.id,
                            quizId: data?.quiz_quiz_by_pk.id,
                          },
                        }),
                      ])
                        .catch((e) => {
                          console.error(e)
                        })
                        .then(() => {
                          refetchRegistration({
                            user: user?.id,
                          })
                        })
                      return
                    }
                    const res = await createOrder({
                      quizId: data?.quiz_quiz_by_pk.id,
                    })
                    const options = {
                      key: RP_KEY_ID_TEST, // Enter the Key ID generated from the Dashboard
                      amount: res.amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                      currency: 'INR',
                      name: 'Pariqsha',
                      description: 'Test Transaction',
                      image:
                        'https://pariqsha.com/static/media/pariqsha.8035258e.png',
                      order_id: res.id, //Pass the `id` obtained in the previous step
                      handler: function (response: {
                        razorpay_payment_id: string
                        razorpay_order_id: string
                        razorpay_signature: string
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
                              quizId: data?.quiz_quiz_by_pk.id,
                            },
                          }),
                        ])
                          .catch((e) => {
                            console.error(e)
                          })
                          .then(() => {
                            refetchRegistration({
                              quizId: id,
                              userId: user?.id,
                            })
                          })
                      },
                    }
                    const rzp1 = new Razorpay(options)
                    rzp1.open()
                  }}
                >
                  Register
                </button>
              </>
            ) : (
              <button
                className="button-link text-red-500" style={{borderColor:"#00d5df"}}
                onClick={() => {
                  dispatch(
                    modalSlice.actions.showModal({
                      title: 'Are you sure?',
                      body: (
                        <UnregisterBody
                          onConfirm={() => {
                            Promise.all([
                              makeRefundRequest({
                                variables: {
                                  quizId: data?.quiz_quiz_by_pk.id,
                                },
                              }),
                              unRegisterQuiz({
                                variables: {
                                  userId: user?.id,
                                  quizId: data?.quiz_quiz_by_pk.id,
                                },
                              }),
                            ])
                              .catch((e) => {
                                console.error(e)
                              })
                              .then(() => {
                                dispatch(modalSlice.actions.hideModal())
                                refetchRegistration({
                                  quizId: id,
                                  userId: user?.id,
                                })
                              })
                          }}
                        />
                      ),
                    }),
                  )
                }}
              >
                Unregister
              </button>
            )
          }
        />
      </div>
    </Base>
  )
}
