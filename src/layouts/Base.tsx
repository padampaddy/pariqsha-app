import { PropsWithChildren, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Menu from '../components/Menu'

interface ActionButton {
  icon: JSX.Element
  onClick: () => void
}

interface Props {
  title?: string
  actionButtons?: ActionButton[]
  showBack?: boolean
}

function BaseLayout({
  children,
  title = 'Pariqsha',
  actionButtons = [],
  showBack = false,
}: PropsWithChildren<Props>) {
  const [height, setHeight] = useState(window.innerHeight)
  const [width, setWidth] = useState(window.innerWidth)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const history = useHistory()
  useEffect(() => {
    window.addEventListener('resize', () => {
      setHeight(window.innerHeight)
      setWidth(window.innerWidth)
    })
  }, [])
  return (
    <div
      style={{ width: width, height: height }}
      className="flex overflow-hidden flex-col flex-1"
    >
      <div
        className={`fixed overflow-hidden  transition-width duration-500 top-0 left-0 ${
          isOpen ? 'w-80' : 'w-0 lg:w-80'
        }`}
        style={{ height: height, zIndex: showBack ? -1 : 1000 }}
      >
        {!showBack && (
          <Menu
            onClose={() => {
              setIsOpen(false)
            }}
          />
        )}
      </div>
      <div className="shadow-sm items-center flex flex-row gap-4 p-4 w-screen relative">
        {showBack ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 cursor-pointer absolute left-4 top-0 bottom-0 my-auto"
            viewBox="0 0 512 512"
            onClick={() => history.goBack()}
          >
            <title>Arrow Back</title>
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="48"
              d="M244 400L100 256l144-144M120 256h292"
            />
          </svg>
        ) : (
          <svg
            onClick={() => {
              setIsOpen(true)
            }}
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 cursor-pointer absolute left-4 top-0 bottom-0 my-auto  lg:hidden"
            viewBox="0 0 24 24"
          >
            <path d="M4 6H20V8H4zM4 11H20V13H4zM4 16H20V18H4z"></path>
          </svg>
        )}
        <h4 className="text-lg flex-grow font-semibold flex-1 text-center">
          {title}
        </h4>
        <div className="absolute right-4 top-0 bottom-0 my-auto items-center flex">
          {actionButtons.flatMap((button, index) => (
            <div key={index} onClick={button.onClick}>
              {button.icon}
            </div>
          ))}
        </div>
      </div>
      <div
        className={`w-full ${
          showBack ? '' : 'lg:pl-96'
        } flex-grow bg-gradient-to-tl overflow-y-auto pb-8 from-red-100 to-blue-100`}
      >
        {children}
      </div>
    </div>
  )
}

export default BaseLayout