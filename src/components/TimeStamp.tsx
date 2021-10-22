import { useQuery } from "@apollo/client";
import {  useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GET_REGISTRATION_EXAM } from "../api/queries";
import { RootState } from "../redux/store";
import { MyExamResponse } from "../types/Quiz";

interface Props {
  hours?: number;
  minutes?: number;
  seconds?: number;
  examId?: string
}

const TimeStamp = ({ hours = 0, minutes = 0, seconds = 0, examId }: Props) => {
  const user = useSelector((state: RootState) => state.user.entities?.user);
  const { data } = useQuery<MyExamResponse>(GET_REGISTRATION_EXAM, {
    variables: {
      user: user?.id,
      examId: examId,
    },
  });
  // const getLocalItems = useCallback(() => {
  //   const time = localStorage.getItem("time");
  //   if (time) {
  //     return JSON.parse(time);
  //   } else {
  //     return [hours, minutes, seconds];
  //   }
  // }, []);

  console.log(data)

  const [over, setOver] = useState(false);
  const [[h, m, s], setTime] = useState([hours, minutes, seconds]);

  const tick = () => {
    if (over) return;
    if (h === 0 && m === 0 && s === 0) setOver(true);
    else if (m === 0 && s === 0) {
      setTime([h - 1, 59, 59]);
    } else if (s == 0) {
      setTime([h, m - 1, 59]);
    } else {
      setTime([h, m, s - 1]);
    }
  };

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    // localStorage.setItem("time", JSON.stringify([h, m, s]));
    return () => clearInterval(timerID);
  }, [tick]);

  const time = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;

  return (
    <div className="flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mr-1"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
          clipRule="evenodd"
        />
      </svg>
      {/* <p> Time : {new Date().toLocaleTimeString()}</p> */}

      <div className="">
        {/* {over ? "Time's up!" : {time}} */}
        {time}
      </div>
    </div>
  );
};

export default TimeStamp;
