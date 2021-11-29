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
import { RootState } from "../../redux/store";
import { MyExamResponse, IExamResponse } from "../../types/Quiz";
import ExamCardFooter from "./ExamCardFooter";

const today = new Date().toISOString();

// declare let Razorpay: any;

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
          // subTitle={item.short_description.split(",").join(", ")}
          likeBtn={
            <svg
              role="button"
              onClick={() => setLike((a) => !a)}
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 mr-1 text-red-600"
              fill={like ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <title>like</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          }
          footer={
            <ExamCardFooter item={item}/>
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
