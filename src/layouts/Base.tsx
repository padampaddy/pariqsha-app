import { PropsWithChildren, useEffect, useState } from "react";
import { ReactElement } from "react-markdown";
import { useHistory } from "react-router-dom";
import Drawer from "../components/Drawer";
// import Menu from '../components/Menu'

interface Props {
  title?: string;
  actionButtons?: ReactElement[];
  showBack?: boolean;
}

function BaseLayout({
  children,
  title = "Pariqsha",
  actionButtons = [],
  showBack = false,
}: PropsWithChildren<Props>) {
  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setHeight(window.innerHeight);
      setWidth(window.innerWidth);
    });
  }, []);

  const history = useHistory();

  return (
    <>
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

        <div
          className={`shadow-sm items-center  p-4 w-screen relative   ${
            showBack ? "" : "lg:pl-80"
          }`}
        >
          {showBack ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 cursor-pointer left-2 top-0 bottom-0 my-auto absolute"
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
          ) : (
            <svg
              onClick={() => {
                setIsOpen(true);
              }}
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 cursor-pointer lg:hidden absolute"
              viewBox="0 0 24 24"
              style={{ color: "#3985db" }}
            >
              <title>menu icon</title>
              <path
                d="M4 6H20V8H4zM4 11H20V13H4zM4 16H20V18H4z"
                fill="currentColor"
              ></path>
            </svg>
          )}

          <h4 className="text-lg flex-grow text-center text-black font-bold">
            {title}
          </h4>
          <div className="absolute   flex top-1/2 transform -translate-y-1/2 right-4">
            {actionButtons.flatMap((button, index) => (
              <div key={index}>{button}</div>
            ))}
            <div
              role="button"
              onClick={() => history.push("/notification")}
              className="hidden my-auto items-center flex relative"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 fill-current"
                style={{ color: "#3985db" }}
                viewBox="0 0 24 24"
              >
                <title>notification</title>
                <path
                  d="M12 22c1.311 0 2.407-.834 2.818-2H9.182C9.593 21.166 10.689 22 12 22zM19 14.586V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v4.586l-1.707 1.707C3.105 16.48 3 16.734 3 17v1c0 .553.447 1 1 1h16c.553 0 1-.447 1-1v-1c0-.266-.105-.52-.293-.707L19 14.586z"
                  fill="currentColor"
                ></path>
              </svg>
              <div
                className="absolute bg-black text-white font-bold rounded-full w-4 h-4 flex justify-center items-center right-0 -top-1 "
                style={{ fontSize: "10px" }}
              >
                2
              </div>
            </div>
          </div>
        </div>
        <div
          className={`w-full quiz-list ${
            showBack ? "" : "lg:pl-80"
          } flex-grow bg-gradient-to-tl  pb-0 from-red-100 to-blue-100 overflow-y-auto 
        `}
        >
          {children}
        </div>
      </div>
    </>
  );
}

export default BaseLayout;
