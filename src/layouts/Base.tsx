import { PropsWithChildren, useEffect, useState } from "react";
import Menu from "../components/Menu";

interface ActionButton {
  icon: JSX.Element;
  onClick: () => void;
}

interface Props {
  title?: string;
  actionButtons?: ActionButton[];
}

function BaseLayout({
  children,
  title = "Pariqsha",
  actionButtons = [],
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
  return (
    <div
      style={{ width: width, height: height }}
      className="flex overflow-hidden flex-col flex-1"
    >
      <div
        className={`fixed overflow-hidden transition-width duration-500 top-0 left-0 ${
          isOpen ? "w-80" : "w-0 lg:w-80"
        }`}
        style={{ height: height }}
      >
        <Menu
          onClose={() => {
            setIsOpen(false);
          }}
        />
      </div>
      <div className="shadow-sm items-center lg:pl-80 flex flex-row gap-4 p-4 w-screen ">
        <svg
          onClick={() => {
            setIsOpen(true);
          }}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 cursor-pointer lg:hidden"
          viewBox="0 0 24 24"
        >
          <path d="M4 6H20V8H4zM4 11H20V13H4zM4 16H20V18H4z"></path>
        </svg>
        <h4 className="text-lg font-semibold lg:ml-8">{title}</h4>
        <div className="flex-grow justify-end flex">
          {actionButtons.flatMap((button, index) => (
            <div key={index} onClick={button.onClick}>
              {button.icon}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full lg:pl-96 flex-grow bg-gradient-to-tl overflow-y-auto pb-8 from-red-100 to-blue-100">
        {children}
      </div>
    </div>
  );
}

export default BaseLayout;
