import { ReactElement } from "react";
import { useDispatch } from "react-redux";
// import DEFAULT_AVATAR from "../assets/images/profileuser.png";
import modalSlice from "../redux/slices/modal-slice";

interface Props {
  url?: string;
}

function PicPreview({ url }: Props): ReactElement {
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex items-center  text-4xl py-2 px-4">
        <button
          onClick={() => dispatch(modalSlice.actions.hideModal())}
          className="focus:outline-none absolute right-3 top-2 "
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
      <div className="sm:flex sm:items-start md:flex md:items-center md:h-96 h-72  overflow-y-auto justify-center">
        <div className="">
          <img className="mx-auto h-3/4 w-3/4" src={url} />
        </div>
      </div>
    </>
  );
}
export default PicPreview;
