import { PropsWithChildren, useEffect, useState } from "react";

interface Props {
  hideFooter?: boolean;
}

function GeneralLayout({
  children,
  hideFooter = false,
}: PropsWithChildren<Props>) {
  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);
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
      <div className="w-full flex-grow bg-gradient-to-tl overflow-y-auto md:from-red-100 md:to-blue-100 ">
        {children}
      </div>
      {!hideFooter && (
        <div className="text-center bg-white bg-opacity-50 shadow-sm text-gray-400 md:text-lg text-xs p-3 md:p-4 w-screen">
          &copy; Pariqsha {new Date().getFullYear()}. All rights reserved.
        </div>
      )}
    </div>
  );
}

export default GeneralLayout;
