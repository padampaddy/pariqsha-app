import { gql } from "@apollo/client";

export const GET_TODAY_QUIZZES = gql`
  query get_today_quizzes($date: timestamptz!) {
    quiz_quiz(where: { end_at: { _gte: $date } }) {
      cover
      created_at
      description
      short_description
      end_at
      id
      image
      start_at
      title
      topics
      price
    }
  }
`;

export const GET_QUIZ_DETAILS = gql`
  query get_quiz_by_pk($id: uuid!) {
    quiz_quiz_by_pk(id: $id) {
      cover
      created_at
      description
      short_description
      end_at
      id
      image
      start_at
      title
      topics
      price
    }
  }
`;

export const GET_REGISTRATION_QUIZ = gql`
  query get_registration_quiz($quizId: uuid!, $userId: uuid!) {
    quiz_registration(
      where: { quiz: { _eq: $quizId }, user_id: { _eq: $userId } }
    ) {
      id
    }
  }
`;

export const GET_MY_QUIZZES = gql`
  query get_my_quizzes($user: uuid!) {
    quiz_registration(where: { user_id: { _eq: $user } }) {
      quizByQuiz {
        cover
        created_at
        description
        end_at
        short_description
        id
        image
        start_at
        title
        topics
      }
    }
  }
`;

export const REGISTER_QUIZ = gql`
  mutation registerQuiz($quizId: uuid!, $userId: uuid!) {
    insert_quiz_registration_one(object: { quiz: $quizId, user_id: $userId }) {
      quiz
      user_id
    }
  }
`;

export const UNREGISTER_QUIZ = gql`
  mutation unregisterQuiz($userId: uuid!, $quizId: uuid!) {
    delete_quiz_registration(
      where: { user_id: { _eq: $userId }, quiz: { _eq: $quizId } }
    ) {
      affected_rows
      returning {
        id
      }
    }
  }
`;

export const ADD_RP_PAYLOAD = gql`
  mutation addRPPayload($orderId: uuid!, $payload: String!) {
    update_quiz_orders_by_pk(
      pk_columns: { id: $orderId }
      _set: { payload: $payload }
    ) {
      quiz
    }
  }
`;

export const MAKE_REFUND_REQUEST = gql`
  mutation makeRefundRequest($quizId: uuid!) {
    insert_quiz_refund_request_one(object: { quiz_id: $quizId }) {
      quiz_id
    }
  }
`;
