import { PropsWithChildren, useEffect, useState } from "react";

interface Props {}

function GeneralLayout({ children }: PropsWithChildren<Props>) {
  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setHeight(window.innerHeight);
      setWidth(window.innerWidth);
    });
  }, []);
  return (
    <div style={{ width: width, height: height }} className="flex overflow-hidden flex-col flex-1">
      <div className="w-full flex-grow bg-gradient-to-tl overflow-y-auto pb-8 from-red-100 to-blue-100">
        {children}
      </div>
      <div className="text-center bg-white bg-opacity-50 shadow-sm text-gray-400 p-4 w-screen">
        &copy; Pariqsha, 2021. All rights reserved.
      </div>
    </div>
  );
}

export default GeneralLayout;
