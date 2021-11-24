import { ReactElement } from "react";
import { useDispatch } from "react-redux";
import modalSlice from "../redux/slices/modal-slice";

interface Props {
  onConfirm: () => void;
}

export default function UnregisterBody({ onConfirm }: Props): ReactElement {
  const dispatch = useDispatch();
  return (
    <>
      <div className="sm:flex sm:items-start md:flex md:items-center">
        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <svg
            className="h-6 w-6 text-red-600"
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
        </div>
        <div className="mt-3 text-center flex-grow sm:mt-0 sm:ml-4 sm:text-left">
          <h3
            className="text-lg leading-6 font-medium text-gray-900"
            id="modal-title"
          >
            Are you sure?
          </h3>
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
      <div className="my-2">Are you sure you want to unregister?</div>
      <div className="text-gray-400 font-semibold text-sm">
        If you have paid for the quiz, your refund request will be raised
        automatically.
      </div>
      <div className="flex mt-4 items-center justify-center">
        <button
          className="button common-btn w-20  mr-3"
          onClick={() => onConfirm()}
        >
          Yes
        </button>
        <button
          onClick={() => dispatch(modalSlice.actions.hideModal())}
          className=" button-link w-20 "
        >
          No
        </button>
      </div>
    </>
  );
}
