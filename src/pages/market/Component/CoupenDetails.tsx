import { useDispatch } from "react-redux";
import modalSlice from "../../../redux/slices/modal-slice";

const terms = [
  "Transactions made with this coupon cannot be modified or cancelled.",
  "There will be deduction of scores for spelling mistakes.",
  "You can click on the 'Previous' Button to correct your mistakes in the attempted questions.",
  "Use capital letters where required.",
];

const CoupenDetails = ({ desc }: { desc?: string }) => {
  const dispatch = useDispatch();
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
          Details
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
        {desc}
        <div className="font-bold md:text-base text-sm mt-4 md:tracking-wide flex items-center ">
          Terms & Conditions
        </div>
        <ol className="list-decimal mt-2">
          {terms.flatMap((list) => (
            <li className="py-1">{list}</li>
          ))}
        </ol>
      </div>
      <hr className="mt-3 bg-gray-200" />
      <div className="flex mt-4 items-center justify-center ">
        <button
          onClick={() => dispatch(modalSlice.actions.hideModal())}
          className="button common-btn py-2 px-9"
        >
          OK
        </button>
      </div>
    </>
  );
};

export default CoupenDetails;
