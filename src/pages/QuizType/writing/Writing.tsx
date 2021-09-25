import BaseLayout from "../../../layouts/Base";
import Note from "../components/Note";
import QuestionType from "../../../components/QuestionType";
import QuizHeader from "../../../components/QuizHeader";
import { IExamQues } from "../../../types/Quiz";
import { GET_EXAM_QUES } from "../../../api/queries";
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import { RootState } from "../../../redux/store";

const Writing = () => {
  const user = useSelector((state: RootState) => state.user.entities?.user);
  const { data } = useQuery<IExamQues>(GET_EXAM_QUES, {
    variables: {
      user: user?.id,
    },
  });
  
  return (
    <div className="">
      <BaseLayout showBack title="Writing">
        <div className="flex flex-col h-full md:w-1/2 md:mx-auto">
          <QuizHeader title="Time limit 40 minutes " />
          <div className="flex-1 bg-white shadow-md mx-4 mb-4">
            <div className=" p-6 ">
              <QuestionType title="Write on an A4 sheet then scan and upload ." />
              <Note />
              
              {data?.exams_exam_question.question.flatMap((ques,index)=>(
                <div>
                <h3 key={index} className="mt-5 text-sm ">
                  <b>Q.No.1</b>
                  {ques.question}
                  {/* Lorem Ipsum is simply dummy text of the printing and typesetting industry? */}
                </h3>
              </div>
              ))}
              
              <div className="flex  items-center justify-center mt-5">
                <label className="w-64 flex flex-col items-center px-4 py-6 bg-gray-100 text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-500 hover:text-white">
                  <span className="mt-2 text-base leading-normal">
                    Choose Here For Upload
                  </span>
                  <input type="file" className="hidden" />
                </label>
              </div>
            </div>
            {/* <audio ref="audio_tag" src="../components/audio/Audio1.mp3" controls autoPlay/> */}
          </div>
        </div>
      </BaseLayout>
    </div>
  );
};

export default Writing;
