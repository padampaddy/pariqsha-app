import { PropsWithChildren, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Drawer from "../components/Drawer";
// import Menu from '../components/Menu'

interface ActionButton {
  icon: JSX.Element;
  onClick: () => void;
}

interface Props {
  title?: string;
  actionButtons?: ActionButton[];
  showBack?: boolean;
}

function BaseLayout({
  children,
  title = "Pariqsha",
  // actionButtons = [],
  showBack = false,
}: PropsWithChildren<Props>) {
  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const history = useHistory();
  useEffect(() => {
    window.addEventListener("resize", () => {
      setHeight(window.innerHeight);
      setWidth(window.innerWidth);
    });
  }, []);
  return (
    <div
      style={{ width: width, height: height }}
      className="flex overflow-hidden flex-col flex-1"
    >
      <div
        className={`fixed overflow-hidden  transition-width duration-500 top-0 left-0 ${
          isOpen ? "md:w-80 sm:w-full" : "w-0 lg:w-80"
        }`}
        style={{ height: height, zIndex: showBack ? -1 : 1000 }}
      >
        {!showBack && (
          <Drawer
            onClose={() => {
              setIsOpen(false);
            }}
          />
        )}
      </div>
      <div className= {`shadow-sm items-center flex flex-row p-4 w-screen relative ${showBack ? "" : "lg:pl-80"
        }`}>
        {showBack ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 cursor-pointer absolute left-2 top-0 bottom-0 my-auto"
            viewBox="0 0 20 20"
            fill="currentColor"
            onClick={() => history.goBack()}
          >
            <title>Arrow Back</title>
            <path
              fillRule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          // <svg
          //   xmlns="http://www.w3.org/2000/svg"
          //   className="w-6 cursor-pointer absolute left-4 top-0 bottom-0 my-auto"
          //   viewBox="0 0 512 512"
          //   onClick={() => history.goBack()}
          // >
          //   <title>Arrow Back</title>
          //   <path
          //     fill="currentColor"
          //     stroke="currentColor"
          //     strokeLinecap="round"
          //     strokeLinejoin="round"
          //     strokeWidth="48"
          //     d="M244 400L100 256l144-144M120 256h292"
          //   />
          // </svg>
        ) : (
          <svg
            onClick={() => {
              setIsOpen(true);
            }}
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 cursor-pointer lg:hidden"
            viewBox="0 0 24 24"
            style={{ color: "#01D5DD" }}
          >
            <path
              d="M4 6H20V8H4zM4 11H20V13H4zM4 16H20V18H4z"
              fill="currentColor"
            ></path>
          </svg>
        )}
        <h4 className= "text-md flex-grow flex-1 text-center text-black font-bold" >
          {title}
        </h4>
        <div className="  my-auto items-center flex relative">
          {/* {actionButtons.flatMap((button, index) => (
            <div key={index} onClick={button.onClick}>
              {button.icon}
            </div>
          ))} */}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 fill-current text-gray-500"
            style={{ color: "#01D5DD" }}
            viewBox="0 0 24 24"
          >
            <path
              d="M12 22c1.311 0 2.407-.834 2.818-2H9.182C9.593 21.166 10.689 22 12 22zM19 14.586V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v4.586l-1.707 1.707C3.105 16.48 3 16.734 3 17v1c0 .553.447 1 1 1h16c.553 0 1-.447 1-1v-1c0-.266-.105-.52-.293-.707L19 14.586z"
              fill="currentColor"
            ></path>
          </svg>
          <div className="absolute bg-black text-white rounded-full w-3.5 h-3.5 flex justify-center items-center -right-0 p-1  -top-1 text-xs">
            1
          </div>
        </div>
      </div>
      <div
        className={`w-full ${
          showBack ? "" : "lg:pl-80"
        } flex-grow bg-gradient-to-tl  pb-0 from-red-100 to-blue-100 overflow-y-auto
        `}
      >
        {children}
      </div>
    </div>
  );
}

export default BaseLayout;
