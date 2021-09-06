import { useDispatch } from "react-redux";
import modalSlice from "../redux/slices/modal-slice";

const CoupenDetails = ({
    desc,
  }: {
    desc?: string;
  }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="sm:flex sm:items-start md:flex md:items-center">
        <div className=" text-center flex-grow sm:mt-0 ml-4 md:ml-0 sm:text-left">
          <h3
            className="text-lg leading-6 font-medium text-gray-900"
            id="modal-title"
          >
            Details
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
      
      <div className="text-gray-400 my-1 md:my-4 font-semibold text-sm">
        {desc}
      </div>
      <div className="flex mt-4 items-center justify-center ">
        {/* <button
          className=" button-link mr-3"
          style={{ borderColor: "#00d5df" }}
        >
          Buy
        </button> */}
        <button
          onClick={() => dispatch(modalSlice.actions.hideModal())}
          className="button common-btn py-2.5 px-9"
        >
          OK
        </button>
      </div>
    </>
  );
};

export default CoupenDetails;
