import { useDispatch, useSelector } from "react-redux";
import alertSlice from "../redux/slices/alert-slice";
import { RootState } from "../redux/store";

const Alert = () => {
  const { visible, body } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();
  if (!visible) return null;
  return (
    <div
      className=" border text-white px-4 py-3 rounded relative"
      style={{ color: "#4caf50" }}
      role="alert"
      aria-alert="true"
      aria-labelledby="alert-title"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
      <span className="block sm:inline">
        {body && <div className="">{body}!</div>}
      </span>
      <span
        aria-hidden="true"
        className="absolute top-0 bottom-0 right-0 px-4 py-3"
      >
        <svg
          onClick={() => dispatch(alertSlice.actions.hideAlert())}
          className="fill-current h-6 w-6 text-red-500"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <title>Close</title>
          <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
        </svg>
      </span>
    </div>
  );
};

export default Alert;
