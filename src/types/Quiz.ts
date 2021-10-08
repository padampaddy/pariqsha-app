export interface Quiz {
  cover: string;
  created_at: Date;
  description: string;
  short_description?: string;
  end_at: Date;
  id: string;
  image: string;
  start_at: Date;
  title: string;
  topics: string;
  quiz: number;
  price: number;
}

export interface QuizResponse {
  quiz_quiz: Quiz[];
}

export interface QuizDetailsResponse {
  quiz_quiz_by_pk: Quiz;
}

export interface MyQuizResponse {
  quiz_registration: {
    quizByQuiz: Quiz;
  }[];
}

export interface QuizRegistrationResponse {
  quiz_registration: { id: string }[];
}

export interface IExam {
  cover_image_url: string;
  created_at: Date;
  description: string;
  duration_in_minutes: string;
  end_at: Date;
  id: string;
  image_url: string;
  price: number;
  price_in_coins: number;
  short_description: string;
  start_at: Date;
  title: string;
  exam_type_id: string;
}

export interface IExamType {
  exams_exam_type: {
    id: string;
    name: string;
    description: string;
  }[];
}

export interface IExamResponse {
  exams_exam: IExam[];
}

export interface ExamDetailsResponse {
  exams_exam_by_pk: IExam;
}

export interface MyExamResponse {
  exams_registration: {
    exam: IExam;
  }[];
}

export interface ExamRegistrationResponse {
  exams_registration: { id: string }[];
}

export interface IContextType {
  name: string;
}

export interface IContext {
  id: string;
  details: string;
  title: string;
  image_link: string;
  link: string;
  context_type: IContextType;
}

export interface ITypeOfQues {
  id: string;
  name: string;
}

export interface IQues {
  id: string;
  correct_answer: string;
  question: string;
  created_at: Date;
  options: string[];
  image_link: string;
  type_of_question_description_override: string;
  solution: string;
  context_id: string;
  part: ITypeOfQues;
  type_of_question: ITypeOfQues;
  context: IContext;
}

export interface IExamQues {
  id: string;
  exam_id: string;
  question: IQues;
}

export interface IExamAns {
  exams_exam_answer: {
    id: string;
    updated_at: Date;
    exam_question_id: string;
    answer: string;
    status: string;
  };
}

export interface ISendAnswer {
  id: string;
  answer: string;
  user_id: string;
  exam_question_id: string;
  status: string;
}
