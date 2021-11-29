import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_MY_RESULT, GET_EXAM_DATA } from "../api/queries";
import modalSlice from "../redux/slices/modal-slice";
import { RootState } from "../redux/store";
import { IExamData, IExamResult, IGroupedResult } from "../types/Quiz";

// const items = [34, 45, 46];

const headings = ["Reading", "Listening", "Writing", "Total"];

export default function UserResult({ examId }: { examId: string }) {
  const user = useSelector((state: RootState) => state.user.entities?.user);
  const dispatch = useDispatch();
  const { data } = useQuery<IExamResult>(GET_MY_RESULT, {
    variables: {
      user: user?.id,
      examId: examId,
    },
  });
  const { data: marks } = useQuery<IExamData>(GET_EXAM_DATA, {
    variables: {
      user: user?.id,
      examId: examId,
    },
  });
  const groupedResult = useMemo(() => {
    if (data?.exams_exam_answer) {
      const obj: IGroupedResult = {
        reading: 0,
        listening: 0,
        // writing: 0,
      };
      data?.exams_exam_answer.reduce((pV, cV) => {
        pV[
          cV.exam_question.question?.part.name.toLowerCase() as
            | "reading"
            // | "writing"
            | "listening"
        ] =
          pV[
            cV.exam_question.question?.part.name.toLowerCase() as
              | "reading"
              // | "writing"
              | "listening"
          ] + (cV.status === "correct" ? 1 : 0);
        return pV;
      }, obj);
      return obj;
    } else {
      return {
        reading: 0,
        listening: 0,
        // writing: 0,
      };
    }
  }, [data]);

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
          Result
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
      <table className="table-fixed text-center m-auto border-2 border-blue-500  my-4 mt-6">
        <thead>
          <tr className="common-btn">
            {headings.flatMap((item) => (
              <th className="w-1/4 md:px-9 py-2 px-1.5 text-xs md:text-lg font-semibold">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className=" border-2 border-blue-500 mt-4 ">
            <td className=" border-r-2 border-blue-500 md:py-2 py-1 ">
              {groupedResult?.reading}
            </td>

            <td className=" border-r-2 border-blue-500 md:py-2 py-1 ">
              {groupedResult?.listening}
            </td>

            {marks?.exams_registration.flatMap((item) => (
              <>
                <td className=" border-r-2 border-blue-500 md:py-2 py-1 ">
                  {item.result_writing}
                </td>

                <td className="md:py-2 py-1">
                  {groupedResult?.reading +
                    groupedResult?.listening +
                    item.result_writing}
                  {/* {items.reduce((pV, item) => pV + item, 0)} */}
                </td>
              </>
            ))}
          </tr>
        </tbody>
      </table>
    </>
  );
}
