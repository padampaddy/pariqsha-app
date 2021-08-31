import { useDispatch, useSelector } from "react-redux";
import modalSlice from "../redux/slices/modal-slice";
import { RootState } from "../redux/store";

const Modal = () => {
  const { visible, body } = useSelector(
    (state: RootState) => state.modal
  );
  const dispatch = useDispatch();
  if (!visible) return null;
  return (
    <div
      className="fixed z-10 inset-0  mt-20"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-start justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          onClick={() => dispatch(modalSlice.actions.hideModal())}
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        />

        <div className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 w-full max-w-2xl">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            
            <div className="">{body}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
