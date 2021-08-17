import { ReactElement } from 'react'

interface Props {
  active?: boolean
  onToggle: () => void
  inactiveLabel?: string
  activeLabel?: string
}

export default function Switch({
  active = false,
  onToggle,
  inactiveLabel,
  activeLabel,
}: Props): ReactElement {
  return (
    <div className="flex justify-center items-center">
      <span className={`text-sm  font-semibold ${active?'text-gray-400':'text-gray-500'}`}>{inactiveLabel}</span>
      <div
        className={`w-14 h-7 flex items-center  rounded-full mx-3 px-1 ${
          active ? 'bg-blue-500' : 'bg-gray-300'
        }`}
        onClick={() => onToggle()}
      >
        <div
          className={`bg-white w-5 h-5 rounded-full shadow-md transition transform ${
            active ? 'translate-x-7' : ''
          }`}
        ></div>
      </div>
      <span className={`text-sm  font-semibold ${active?'text-gray-500':'text-gray-400'}`}>{activeLabel}</span>
    </div>
  )
}
