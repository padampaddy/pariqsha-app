import { useQuery } from "@apollo/client";
import moment from "moment";
import { GET_TODAY_QUIZZES } from "../api/queries";
import Card from "../components/Card";
import BaseLayout from "../layouts/Base";
import { QuizResponse } from "../types/Quiz";

const today = new Date().toISOString();

export default function Home() {
  const { data } = useQuery<QuizResponse>(GET_TODAY_QUIZZES, {
    variables: {
      date: today,
    },
  });
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
      ]}
    >
      <div className="flex flex-col items-center p-4 gap-4">
        <h2 className="place-self-start text-3xl font-semibold pt-6">
          Upcoming Quizzes
        </h2>
        <div className="flex flex-row flex-wrap gap-4 w-full">
          {data?.quiz_quiz?.flatMap((quiz, index) => (
            <Card
              key={index}
              title={quiz.title}
              imgSrc={quiz.image}
              content={
                <div style={{ whiteSpace: "pre-wrap" }}>{quiz.description}</div>
              }
              date={moment(quiz.start_at).format("Do MMM")}
              coverImgSrc={quiz.cover}
              time={moment(quiz.start_at).format("h:mm A")}
              duration={moment
                .duration(moment(quiz.start_at).diff(moment(quiz.end_at)))
                .humanize()}
              subTitle={quiz.topics.split(",").join(", ")}
              footer={
                <>
                  <button className="button">Register</button>
                </>
              }
            />
          ))}
        </div>
      </div>
    </BaseLayout>
  );
}
