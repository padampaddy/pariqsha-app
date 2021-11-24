import {  useEffect, useState } from "react";
import { useWindowScroll } from "react-use";

import { MutableRefObject } from "react";

const ScrollToBottom = ({
  temp1,
}: {
  temp1: MutableRefObject<HTMLDivElement>;
}) => {
  const { y: pageYOffset } = useWindowScroll();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (pageYOffset > 400) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [pageYOffset]);

  const scrollToBottom = () => {
    temp1.current?.scrollTo(0, temp1.current?.scrollHeight);
  };

//   if (!visible) {
//     return false;
//   }

console.log(visible)

  return (
    <div
      className="scroll-to-bottom cursor-pointer text-center common-btn"
      onClick={scrollToBottom}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 icon-btn"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

export default ScrollToBottom;
