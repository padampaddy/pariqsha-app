import listening from "../../assets/images/headphone.png";
import read from "../../assets/images/books.png";
import exam2 from "../../assets/images/exam2.png";
import write from "../../assets/images/write.png";
import { useContext } from "react";
import ExamContext from "../../contexts/examContext";
import { IGroupedQuestions } from "../../types/Quiz";
import Loader from "../../components/Loader/Loader";

export default function Menu({
  groupedQuestions,
}: {
  groupedQuestions: IGroupedQuestions;
}) {
  const { setActive, loading } = useContext(ExamContext);
  return (
    <div className="flex flex-col h-full">
      <div className="common-btn md:p-16 p-6 pb-16  flex-grow-0">
        <p className="text-xl leading-normal md:w-1/2 md:mx-auto ">
          Get lots of practical
          <br />
          tips for the Listening,
          <br />
          Reading and Writing sections to help you achieve your desired score
        </p>
      </div>
      <div className="md:p-6 pb-0 p-4 rounded-3xl -mt-10 md:w-1/2 md:mx-auto bg-white md:border-4 border-0 flex-grow-0 " style={{borderColor:"#2799E5"}}>
        {loading ? (
          <Loader />
        ) : (
          <ul>
            <li
              role="button"
              onClick={() => setActive("reading")}
              className="list-style animation md:mt-4 mt-0" style={{borderColor:"#2799E5"}}
            >
              Reading ({groupedQuestions.reading.length}) Qs
              <span>
                <img src={read} className="h-8 w-8" alt="pariqsha reading" />
              </span>
            </li>

            <li
              role="button"
              onClick={() => setActive("listening")}
              className="list-style animation" style={{borderColor:"#2799E5"}}
            >
              Listening ({groupedQuestions.listening.length}) Qs
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
              className="list-style animation" style={{borderColor:"#2799E5"}}
            >
              Writing ({groupedQuestions.writing.length}) Qs
              <span>
                <img src={write} className="h-8 w-8 " alt="pariqsha write" />
              </span>
            </li>
          </ul>
        )}
      </div>
      <div className="flex-grow">
        <img
          src={exam2}
          className="md:hidden w-3/4 m-auto"
          alt="pariqsha exam2"
        />
      </div>
    </div>
  );
}
