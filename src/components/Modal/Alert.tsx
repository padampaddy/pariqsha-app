import { useDispatch, useSelector } from "react-redux";
import alertSlice from "../../redux/slices/alert-slice";
import { RootState } from "../../redux/store";
// import { useEffect, useState } from "react";

const Alert = () => {
  const { visible, body } = useSelector((state: RootState) => state.alert);
  const dispatch = useDispatch();
  if (!visible) return null;

  // const [show, setShow] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setShow(false);
  //   }, 3000);
  // }, [3000]);


  return (
    // show?
    <div
    className=" border text-white bg-green-500 pl-2 pr-1 py-3  rounded absolute md:w-1/6 bottom-2 right-2 flex items-center" id="hideMe"
    // style={{ backgroundColor: "rgb(82 177 85)" }}
    aria-labelledby="alert-title"
    role="alert"
    aria-alert="true"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 flex-grow-0  mr-2"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
    <span className="block flex-grow sm:inline">
      {body && <div className="">{body}!</div>}
    </span>
    <span
      aria-hidden="true"
      className="flex-grow-0"
    >
      <svg
        onClick={() => dispatch(alertSlice.actions.hideAlert())}
        className="fill-current h-6 w-6 ml-2"
        role="button"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <title>Close</title>
        <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
      </svg>
    </span>
  </div> 
    // :<div/>
  );
};

export default Alert;
