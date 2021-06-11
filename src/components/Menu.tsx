import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import userSlice from "../redux/slices/user-slice";

interface Props {
  onClose: () => void;
}

const Menu = ({ onClose }: Props) => {
  const dispatch = useDispatch();
  return (
    <div className="w-screen h-full flex flex-row bg-gray-100">
      <div className="flex flex-col bg-white w-screen overflow-hidden">
        <div className="flex items-center justify-start text-3xl py-2 px-4">
          <button
            onClick={() => {
              onClose();
            }}
            className="focus:outline-none lg:hidden"
          >
            &times;
          </button>
        </div>
        <ul className="flex flex-col py-4">
          <li>
            <Link
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
              to="/home"
              onClick={() => onClose()}
            >
              <span className="inline-flex items-center justify-center h-12 w-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-400 h-5 w-5 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.743,12.331l-9-10c-0.379-0.422-1.107-0.422-1.486,0l-9,10c-0.265,0.293-0.331,0.715-0.17,1.076 C2.247,13.768,2.605,14,3,14h2v7c0,0.552,0.447,1,1,1h3c0.553,0,1-0.448,1-1v-4h4v4c0,0.552,0.447,1,1,1h3c0.553,0,1-0.448,1-1v-7h2 c0.395,0,0.753-0.232,0.913-0.593C22.074,13.046,22.008,12.625,21.743,12.331z"></path>
                </svg>
              </span>
              <span className="text-sm font-medium">Home</span>
            </Link>
          </li>
          <li>
            <Link
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
              to="/signin"
              onClick={() => {
                dispatch(userSlice.actions.logout());
                onClose();
              }}
            >
              <span className="inline-flex items-center justify-center h-12 w-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 fill-current text-gray-400"
                  viewBox="0 0 24 24"
                >
                  <path d="M16 13L16 11 7 11 7 8 2 12 7 16 7 13z"></path>
                  <path d="M20,3h-9C9.897,3,9,3.897,9,5v4h2V5h9v14h-9v-4H9v4c0,1.103,0.897,2,2,2h9c1.103,0,2-0.897,2-2V5C22,3.897,21.103,3,20,3z"></path>
                </svg>{" "}
              </span>
              <span className="text-sm font-medium">Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
