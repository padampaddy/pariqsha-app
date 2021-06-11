export interface Quiz {
  cover: string;
  created_at: Date;
  description: string;
  end_at: Date;
  id: string;
  image: string;
  start_at: Date;
  title: string;
  topics: string;
}

export interface QuizResponse {
  quiz_quiz: Quiz[];
}
