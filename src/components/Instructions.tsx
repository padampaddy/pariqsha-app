import { useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { UPDATE_EXAMS_REGISTRATION } from "../api/queries";
import modalSlice from "../redux/slices/modal-slice";
import { RootState } from "../redux/store";
import { IUpdateExamRegistration } from "../types/Quiz";
import listen from "../assets/images/headphone.png";
import read from "../assets/images/books.png";
import write from "../assets/images/write.png";

const today = new Date().toISOString();

const beCareful = [
  "The test is for 2 hours and 40 minutes. Reading should take an hour followed by listening for 40 minutes and the next one hour for the writing section.",
  "There will be deduction of scores for spelling mistakes.",
  "You can click on the 'Previous' Button to correct your mistakes in the attempted questions.",
  "Use capital letters where required."
];

const reading = [
  "There are 40 questions in this test.",
  "Each question carries one mark.",
];

const listening = [
  "There are 40 questions in this test.",
  "Each question carries one mark.",
  "There are four parts to the test.",
  "Please note you will only hear each part once in your actual test.",
];

const writing = [
  "There are two parts in this test.",
  "Task 2 contributes twice as much as Task 1 to the writing score.",
  "Attempt your task 1 and task 2 on sheets and attach the photos on the 'Upload file' option",
];

const Instructions = ({
  examId,
  duration,
}: {
  examId: string;
  duration: string;
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.entities?.user);
  const [updateRegistration] = useMutation<IUpdateExamRegistration>(
    UPDATE_EXAMS_REGISTRATION
  );

  const handleStart = async () => {
    updateRegistration({
      variables: {
        startedAt: today,
        examId: examId,
        user: user?.id,
        examStatus: "started",
      },
    })
      .then(() => {
        history.push(`/examstart/${examId}/${duration}`);
        dispatch(modalSlice.actions.hideModal());
      })
      .catch((e) => console.error(e));
  };

  return (
    <>
      <div className="flex items-center">
        <div className=" flex-shrink-0 flex items-center justify-center rounded-full common-btn h-10 w-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path
              fillRule="evenodd"
              d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div
          className="text-lg leading-6 font-medium text-gray-900  flex-grow  md:ml-4 ml-2"
          id="modal-title"
        >
          Instructions
        </div>

        <div className="flex items-center justify-start text-4xl py-2 px-4">
          <button
            onClick={() => dispatch(modalSlice.actions.hideModal())}
            className="focus:outline-none absolute md:top-6 md:right-5 right-3 top-4 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
      <hr className="my-3 bg-gray-200 " />
      <div className="overflow-y-auto h-96 text-xs md:text-sm pl-6 pr-2">
        <div className="font-bold md:text-base text-sm md:tracking-wide flex items-center ">
        <svg
            className="h-5 w-5 text-blue-500 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          Be Careful!
        </div>
        <ol className="list-decimal  mt-2">
          {beCareful.flatMap((list,idx) => (
            <li key={idx} className="py-1">{list}</li>
          ))}
          <li className="py-1 md:flex items-center justify-between">
            <div className="flex items-center ">
              <div className="rounded-full common-btn h-6 w-6 text-center md:pt-0.5 pt-1 mr-2">1</div>
              <div>Current Question</div>
            </div>

            <div className="flex items-center  mt-2 md:mt-0">
              <div className="rounded-full bg-green-500 text-white h-6 w-6 text-center md:pt-0.5 pt-1 mr-2">1</div>
              <div>Answered</div>
            </div>

            <div className="flex items-center  mt-2 md:mt-0">
              <div className="rounded-full text-blue-500 border-2 border-blue-500 h-6 w-6 text-center md:pt-0 pt-0.5  mr-2">1</div>
              <div>Unanswered</div>
            </div>
          </li>
        </ol>
        <div className="font-bold md:text-base text-sm mt-4 md:tracking-wide flex items-center ">
          <img src={read} className="h-5 w-5 mr-2" />
          Reading Test Instructions
        </div>
        <ol className="list-decimal mt-2">
          {reading.flatMap((list,idx) => (
            <li key={idx} className="py-1">{list}</li>
          ))}
        </ol>
        <div className="font-bold md:text-base text-sm mt-4 md:tracking-wide flex items-center ">
          <img src={listen} className="h-5 w-5 mr-2" />
          Listening Test Instructions
        </div>
        <ol className="list-decimal mt-2">
          {listening.flatMap((list,idx) => (
            <li key={idx} className="py-1">{list}</li>
          ))}
        </ol>
        <div className="font-bold md:text-base text-sm mt-4 md:tracking-wide flex items-center ">
          <img src={write} className="h-5 w-5 mr-2" />
          Writing Test Instructions
        </div>
        <ol className="list-decimal mt-2">
          {writing.flatMap((list,idx) => (
            <li key={idx} className="py-1">{list}</li>
          ))}
        </ol>
      </div>
      <hr className="mt-3 bg-gray-200" />
      <div className="flex md:justify-end justify-center pt-4">
        <button
          type="submit"
          onClick={handleStart}
          className="common-btn px-2 py-1.5 rounded flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Start Test
        </button>
      </div>
    </>
  );
};

export default Instructions;
