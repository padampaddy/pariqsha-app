import { createContext, SetStateAction, Dispatch } from "react";
import { IQues, ISendAnswer } from "../types/Quiz";


export interface IExamContext {
    questions: (IQues & {exam_question_id: string})[];
    active: "menu" | "reading" | "writing" | "listening";
    setActive: Dispatch<SetStateAction<"menu" | "reading" | "writing" | "listening">>;
    userAnswers: ISendAnswer[];
    currentQuestionIndex: number;
    setCurrentQuestionIndex: React.Dispatch<SetStateAction<number>>;
    setUserAnswers: React.Dispatch<SetStateAction<ISendAnswer[]>>;
    setUserAnswer: React.Dispatch<SetStateAction<string>>;
    userAnswer: string;
    loading: boolean;
}

const ExamContext =  createContext<IExamContext>({
    questions: [],
    active: "menu",
    userAnswers: [],
    currentQuestionIndex: 0,
    userAnswer: "",
    setActive: ()=> console.log() ,
    setUserAnswers: ()=> console.log(),
    setCurrentQuestionIndex: ()=> console.log(),
    setUserAnswer: ()=> console.log(),
    loading: true
})

export default ExamContext;