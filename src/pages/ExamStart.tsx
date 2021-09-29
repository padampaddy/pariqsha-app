import listening from "../assets/images/headphone.png";
import read from "../assets/images/books.png";
import exam2 from "../assets/images/exam2.png";
import write from "../assets/images/write.png";
// import speak from "../assets/images/chats.png";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
// import { RootState } from "../redux/store";
// import { useSelector } from "react-redux";
import { GET_EXAM_QUES } from "../api/queries";
import { IExamQues, IQues } from "../types/Quiz";
import { useMemo, useState } from "react";
import ListeningAudio from "./QuizType/listening/ListeningAudio";
import Reading from "./QuizType/reading/Reading";
import Writing from "./QuizType/writing/Writing";
import GeneralLayout from "../layouts/General";


const ExamStart = () => {
  // const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [active, setActive] = useState<
    "menu" | "reading" | "writing" | "listening"
  >("menu");
  // const user = useSelector((state: RootState) => state.user.entities?.user);
  const { data } = useQuery<{ exams_exam_question: IExamQues[] }>(
    GET_EXAM_QUES,
    {
      variables: {
        examId: id,
      },
    }
  );

  const groupedQue = useMemo(() => {
    console.log("Data", data);
    if (data?.exams_exam_question) {
      const obj: {
        reading: IQues[];
        listening: IQues[];
        writing: IQues[];
      } = {
        reading: [],
        listening: [],
        writing: [],
      };
      data?.exams_exam_question.reduce((pV, cV) => {
        pV[
          cV.question.part.name.toLowerCase() as
            | "reading"
            | "writing"
            | "listening"
        ].push(cV.question);
        return pV;
      }, obj);
      console.log("Obj", obj);
      return obj;
    } else {
      return {
        reading: [],
        listening: [],
        writing: [],
      };
    }
  }, [data]);
  

  return (
    <GeneralLayout  hideFooter>
      {active === "menu" ? (
        <div className="flex flex-col h-full">
          <div className="common-btn md:p-16 p-6 pb-16  flex-grow-0">
            <p className="text-xl leading-normal md:w-1/2 md:mx-auto ">
              Get lots of practical
              <br />
              tips for the Listening,
              <br />
              Reading and Writing sections to help you achieve your desired
              score
            </p>
            
          </div>
          <div className="p-6 rounded-3xl -mt-10 md:w-1/2 md:mx-auto bg-white flex-grow-0 ">
            <ul>
              <li
                role="button"
                onClick={() => setActive("reading")}
                className="list-style animation"
              >
                Reading ({groupedQue.reading.length}) Qs
                <span>
                  <img src={read} className="h-8 w-8" alt="pariqsha reading" />
                </span>
              </li>

              <li
                role="button"
                onClick={() => setActive("listening")}
                className="list-style animation"
              >
                Listening ({groupedQue.listening.length}) Qs
                <span>
                  <img
                    src={listening}
                    className="h-8 w-8 "
                    alt="pariqsha listening"
                  />
                </span>
              </li>
              <li
                role="button"
                onClick={() => setActive("writing")}
                className="list-style animation"
              >
                Writing ({groupedQue.writing.length}) Qs
                <span>
                  <img src={write} className="h-8 w-8 " alt="pariqsha write" />
                </span>
              </li>
            </ul>
          </div>
          <div className="flex-grow">
            <img src={exam2} className="md:hidden w-3/4 m-auto" alt="pariqsha exam2" />
            </div>
     
        </div>
      ) : active === "listening" ? (
        <ListeningAudio questions={groupedQue.listening} onActive={() => setActive("menu")}/>
      ) : active === "reading" ? (
        <Reading questions={groupedQue.reading} onActive={() => setActive("menu")}/>
      ) : (
        <Writing questions={groupedQue.writing} onActive={() => setActive("menu")}/>
      )}
    </GeneralLayout>
  );
};

export default ExamStart;
