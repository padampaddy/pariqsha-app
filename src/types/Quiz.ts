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
