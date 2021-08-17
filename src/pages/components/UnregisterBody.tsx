import { ReactElement } from 'react'
import { useDispatch } from 'react-redux'
import modalSlice from '../../redux/slices/modal-slice'

interface Props {
  onConfirm: () => void
}

export default function UnregisterBody({ onConfirm }: Props): ReactElement {
  const dispatch = useDispatch()
  return (
    <>
      <div className="my-2">Are you sure you want to unregister?</div>
      <div className="text-gray-400 font-semibold text-sm">
        If you have paid for the quiz, your refund request will be raised
        automatically. Please contact us using the contact us form for details.
      </div>
      <div className="flex mt-4 items-center justify-center ">
        <button
          className="text-red-500 button-link px-12"
          onClick={() => onConfirm()}
        >
          Yes
        </button>
        <button
          onClick={() => dispatch(modalSlice.actions.hideModal())}
          className="button bg-gray-100 text-gray-600"
        >
          No
        </button>
      </div>
    </>
  )
}
