import { createContext, SetStateAction, Dispatch } from "react";
import { IExamQues, ISendAnswer } from "../types/Quiz";


export interface IExamContext {
    questions: IExamQues[];
    active: "menu" | "reading" | "writing" | "listening";
    setActive: Dispatch<
    SetStateAction<"menu" | "reading" | "writing" | "listening">
  >;
  userAnswers: ISendAnswer[];
  setUserAnswers: React.Dispatch<SetStateAction<string>>;

}

const ExamContext =  createContext({
    questions: [],
    active: "menu",
    userAnswers: [],
    setActive: "",
})

export default ExamContext;