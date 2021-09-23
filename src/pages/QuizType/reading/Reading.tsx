import BaseLayout from "../../../layouts/Base";
import QuestionType from "../../../components/QuestionType";
import QuizHeader from "../../../components/QuizHeader";
import { IExamQues } from "../../../types/Quiz";
import { useQuery } from "@apollo/client";
import { GET_EXAM_QUES } from "../../../api/queries";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const Reading = () => {
  const user = useSelector((state: RootState) => state.user.entities?.user);
  const { data } = useQuery<IExamQues>(GET_EXAM_QUES, {
    variables: {
      user: user?.id,
    },
  });

  return (
    <div className="">
      <BaseLayout showBack title="Reading">
        <div className="flex flex-col h-full md:w-1/2 md:mx-auto">
          <QuizHeader title="Time Limit 40 Minutes " />
          <div className="flex-1 bg-white shadow-md mx-4 mb-4 overflow-y-auto">
            <div className=" p-6 ">
              <QuestionType title="Read Passage and Match The Following" />
              {data?.exams_exam_question.question.flatMap((item) => (
                <div className="mt-5">
                  {item.context.flatMap((paragraph,index) => (
                    <p key={index} className="text-sm">{paragraph.details}</p>
                  ))}
                  {/* {`Chronobiology might sound a little futuristic - like something
                  from a science fiction novel`} */}

                  <p className="mt-8 mb-3">
                    <b>Read Passage and Match The Following</b>
                  </p>
                  <div className="mb-2">
                    <h4 className="text-sm">
                      1. Lorem ipsum dolor sit amet, consectetur adipiscing
                      elit.{" "}
                    </h4>
                    <input
                      type="text"
                      placeholder=""
                      className="mt-1 py-1 w-full bg-transparent border border-b border-gray-400 focus:outline-none px-2"
                    />
                  </div>
                  <div className="mb-2">
                    <h4 className="text-sm">
                      2. Lorem ipsum dolor sit amet, consectetur adipiscing
                      elit.{" "}
                    </h4>
                    <input
                      type="text"
                      placeholder=""
                      className="mt-1 py-1 w-full bg-transparent border border-b border-gray-400  focus:outline-none px-2"
                    />
                  </div>
                  <div className="mb-2">
                    <h4 className="text-sm">
                      3. Lorem ipsum dolor sit amet, consectetur adipiscing
                      elit.{" "}
                    </h4>
                    <input
                      type="text"
                      placeholder=""
                      className="mt-1 py-1 w-full bg-transparent border border-b border-gray-400  focus:outline-none px-2"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </BaseLayout>
    </div>
  );
};

export default Reading;
