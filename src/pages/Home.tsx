import { useMutation, useQuery } from '@apollo/client'
import moment from 'moment'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import useFetch from 'use-http'
import {
  ADD_RP_PAYLOAD,
  GET_MY_QUIZZES,
  GET_TODAY_QUIZZES,
  MAKE_REFUND_REQUEST,
  REGISTER_QUIZ,
  UNREGISTER_QUIZ,
} from '../api/queries'
import Card from '../components/Card'
import Switch from '../components/Switch'
import { RP_KEY_ID_TEST } from '../Constants'
import BaseLayout from '../layouts/Base'
import modalSlice from '../redux/slices/modal-slice'
import { RootState } from '../redux/store'
import { MyQuizResponse, QuizResponse } from '../types/Quiz'
import UnregisterBody from './components/UnregisterBody'

const today = new Date().toISOString()

declare var Razorpay: any

export default function Home() {
  const user = useSelector((state: RootState) => state.user.entities?.user)
  const { data } = useQuery<QuizResponse>(GET_TODAY_QUIZZES, {
    variables: {
      date: today,
    },
  })
  const { data: myQuizzes, refetch } = useQuery<MyQuizResponse>(
    GET_MY_QUIZZES,
    {
      variables: {
        user: user?.id,
      },
    },
  )
  const { post: createOrder } = useFetch(`orders`, {
    cache: 'no-cache',
  })

  const [showMyQuizzes, setShowMyQuizzes] = useState<boolean>(false)
  const [registerQuiz] = useMutation(REGISTER_QUIZ)
  const [unRegisterQuiz] = useMutation(UNREGISTER_QUIZ)
  const [addRPPayload] = useMutation(ADD_RP_PAYLOAD)
  const [makeRefundRequest] = useMutation(MAKE_REFUND_REQUEST)
  const dispatch = useDispatch()
  const history = useHistory()
  useEffect(() => {
    refetch({
      user: user?.id,
    })
  }, [refetch, user?.id])

  const getCards = useCallback(() => {
    let quizData = data?.quiz_quiz
    if (!quizData) return <div />
    if (showMyQuizzes)
      quizData = quizData.filter(
        (quiz) =>
          myQuizzes?.quiz_registration.findIndex(
            (q) => q.quizByQuiz.id === quiz.id,
          ) !== -1,
      )
    return quizData.flatMap((quiz, index) => (
      <Card
        decorate
        key={index}
        title={quiz.title}
        imgSrc={quiz.image}
        content={
          <div style={{ whiteSpace: 'pre-wrap' }}>{quiz.short_description}</div>
        }
        price={quiz.price}
        date={moment(quiz.start_at).format('Do MMM')}
        coverImgSrc={quiz.cover}
        time={moment(quiz.start_at).format('h:mm A')}
        duration={moment
          .duration(moment(quiz.start_at).diff(moment(quiz.end_at)))
          .humanize()}
        subTitle={quiz.topics.split(',').join(', ')}
        footer={
          <>
            {myQuizzes?.quiz_registration.findIndex(
              (q) => q.quizByQuiz.id === quiz.id,
            ) === -1 ? (
              <>
                <button
                  className="button"
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
                          console.error(e)
                        })
                        .then(() => {
                          refetch({
                            user: user?.id,
                          })
                        })
                      return
                    }
                    const data = await createOrder({
                      quizId: quiz.id,
                    })
                    var options = {
                      key: RP_KEY_ID_TEST, // Enter the Key ID generated from the Dashboard
                      amount: data.amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                      currency: 'INR',
                      name: 'Pariqsha',
                      description: 'Test Transaction',
                      image:
                        'https://pariqsha.com/static/media/pariqsha.8035258e.png',
                      order_id: data.id, //Pass the `id` obtained in the previous step
                      handler: function (response: {
                        razorpay_payment_id: string
                        razorpay_order_id: string
                        razorpay_signature: string
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
                            console.error(e)
                          })
                          .then(() => {
                            refetch({
                              user: user?.id,
                            })
                          })
                      },
                    }
                    var rzp1 = new Razorpay(options)
                    rzp1.open()
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
                      title: 'Are you sure?',
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
                                console.error(e)
                              })
                              .then(() => {
                                dispatch(modalSlice.actions.hideModal())
                                refetch({
                                  user: user?.id,
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
            )}
            <button
              onClick={() => history.push(`details/${quiz.id}`)}
              className="bg-gray-200 button-link"
            >
              View Details
            </button>
          </>
        }
      />
    ))
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
  ])
  return (
    <BaseLayout
      actionButtons={[
        {
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 fill-current text-gray-500"
              viewBox="0 0 24 24"
            >
              <path d="M12 22c1.311 0 2.407-.834 2.818-2H9.182C9.593 21.166 10.689 22 12 22zM19 14.586V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v4.586l-1.707 1.707C3.105 16.48 3 16.734 3 17v1c0 .553.447 1 1 1h16c.553 0 1-.447 1-1v-1c0-.266-.105-.52-.293-.707L19 14.586z"></path>
            </svg>
          ),
          onClick: () => {},
        },
        {
          icon: (
            <div className="capitalize ml-2 px-2 rounded-full bg-gray-400 text-white font-semibold">
              {user?.username?.[0]}
            </div>
          ),
          onClick: () => {},
        },
      ]}
    >
      <div className="flex justify-end px-4 pt-4" style={{ zoom: 0.8 }}>
        <Switch
          onToggle={() => setShowMyQuizzes((a) => !a)}
          active={showMyQuizzes}
          inactiveLabel="Discover"
          activeLabel="Upcoming"
        />
      </div>
      <div className="flex flex-col items-center p-4 gap-4">
        <h2 className="place-self-start text-3xl font-semibold">
          {showMyQuizzes ? `Upcoming Quizzes` : `Discover Quizzes`}
        </h2>
        <div className="flex flex-row flex-wrap gap-4 w-full">{getCards()}</div>
      </div>
    </BaseLayout>
  )
}
