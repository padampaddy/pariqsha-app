import Note from "../components/Note";
import QuizHeader from "../components/QuizHeader";
import { IQues } from "../../../types/Quiz";
import QuizFooter from "../components/QuizFooter";
import {
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import TrueFalse from "../../../components/Type of Ques/TrueFalse";
import Mcq from "../../../components/Type of Ques/Mcq";
import WordLimit from "../../../components/Type of Ques/WordLimit";
import Tip from "../components/Tip";
import CheckBox from "../../../components/Type of Ques/CheckBox";

interface Props {
  questions: (IQues & { exam_question_id: string })[];
  setActive: React.Dispatch<
    SetStateAction<"menu" | "reading" | "writing" | "listening">
  >;
}

const Listening = ({ questions = [], setActive }: Props) => {
  const [currQues, setCurrQues] = useState(0);
  const [ans, setAns] = useState<string>("");
  const audioRef = useRef() as MutableRefObject<HTMLAudioElement>;

  useEffect(() => {
    localStorage.setItem(
      questions[currQues].context.id,
      audioRef.current.currentTime.toString()
    );
    audioRef.current.pause();
    audioRef.current.load();
    const timeLocal = localStorage.getItem(questions[currQues]?.context.id);
    audioRef.current.currentTime = timeLocal ? parseInt(timeLocal) : 0;
    audioRef.current.play();

  }, [questions[currQues]?.context.details]);

  const type = questions[currQues]?.type_of_question.name;
  const tip = questions[currQues]?.type_of_question_description_override;
  const img = questions[currQues]?.image_link;

  return (
    <>
      <div className="flex md:w-1/2 md:mx-auto flex-col bg-white md:shadow-md h-full">
        <div className="flex-grow-0 ">
          <QuizHeader title="Listening" setActive={setActive} />
        </div>
        <div className="flex-grow px-6 py-4 overflow-y-auto h-full">
          <Note detail="Recording will be played once only" />
          {tip && <Tip detail={tip} />}
          <audio ref={audioRef} autoPlay className="mt-6">
            <source src={questions[currQues].context.details} />
          </audio>
          {img && <img className="mt-4 " src={img} />}
          <div>
            <p className="mt-5 font-bold">Questions {currQues + 1}</p>
            <h5 className="text-sm mt-4">{questions[currQues].question}</h5>
          </div>
          <div className="mt-4">
            {type === "true_false_not_given" ? (
              <TrueFalse
                ans={ans}
                onUpdate={(e) => {
                  console.log(e.target.value);
                  setAns(e.target.value);
                }}
              />
            ) : type === "multiple_choice_question" ? (
              <Mcq
                options={questions[currQues].options}
                ans={ans}
                onUpdate={(e) => setAns(e.target.value)}
              />
            ) : type === "checkbox" ? (
              <CheckBox
                options={questions[currQues].options}
                ans={ans}
                onUpdate={(e) => setAns(e.target.value)}
              />
            ) : (
              <WordLimit ans={ans} onUpdate={(e) => setAns(e.target.value)} />
            )}
          </div>
        </div>
        <div className="flex-grow-0 quiz-footer common-btn">
          <QuizFooter
            ans={ans}
            setAns={setAns}
            setActive={setActive}
            currQues={currQues}
            setCurrQues={setCurrQues}
            questions={questions}
          />
        </div>
      </div>
    </>
  );
};

export default Listening;
