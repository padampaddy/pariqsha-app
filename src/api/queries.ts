import { gql } from "@apollo/client";

export const GET_TODAY_QUIZZES = gql`
  query get_today_quizzes($date: timestamptz!) {
    quiz_quiz(where: { end_at: { _gte: $date } }) {
      cover
      created_at
      description
      end_at
      id
      image
      start_at
      title
      topics
    }
  }
`;
