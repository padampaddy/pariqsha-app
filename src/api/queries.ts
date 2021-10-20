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

export const CHECK_CHAT = gql`
  query check_chat($sid: uuid!, $rid: uuid!) {
    communication_threads(
      where: {
        _or: [
          { _and: { started_by: { _eq: $sid }, started_with: { _eq: $rid } } }
          { _and: { started_by: { _eq: $rid }, started_with: { _eq: $sid } } }
        ]
      }
    ) {
      id
    }
  }
`;

export const GET_MY_CHATS = gql`
  subscription get_my_chats($id: uuid!) {
    communication_threads(
      where: {
        _or: [{ started_by: { _eq: $id } }, { started_with: { _eq: $id } }]
      }
      order_by: { updated_at: desc }
    ) {
      id
      updated_at
      profileByStartedBy {
        id
        name
        image_url
      }
      profileByStartedWith {
        id
        name
        image_url
      }
    }
  }
`;

export const GET_MY_MESSAGES = gql`
  subscription get_messages($id: uuid!) {
    communication_threads_by_pk(id: $id) {
      messages {
        id
        attachment_url
        created_at
        message
        sent_by
      }
      profileByStartedBy {
        name
        image_url
        id
      }
      profileByStartedWith {
        name
        image_url
        id
      }
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation send_message(
    $message: String!
    $threadId: uuid!
    $sentBy: uuid!
    $attachmentUrl: String!
  ) {
    insert_communication_messages_one(
      object: {
        message: $message
        thread_id: $threadId
        sent_by: $sentBy
        attachment_url: $attachmentUrl
      }
    ) {
      id
    }
  }
`;

export const UPDATE_USER_PROFILE = gql`
  mutation update_user_profile($id: uuid!, $imageUrl: String!, $name: String!) {
    update_users_profile_by_pk(
      pk_columns: { id: $id }
      _set: { image_url: $imageUrl, name: $name }
    ) {
      id
    }
  }
`;

export const USER_PROFILE_ADD = gql`
  mutation user_profile_add($id: uuid!, $imageUrl: String!, $name: String!) {
    insert_users_profile_one(
      object: { id: $id, image_url: $imageUrl, name: $name }
    ) {
      id
    }
  }
`;

export const USERS_PROFILE = gql`
  query users_profile($id: uuid!) {
    users_profile_by_pk(id: $id) {
      id
      image_url
      name
    }
  }
`;

export const SEARCH_CONTACT = gql`
  query search_contact($query: String!, $id: uuid!) {
    users_profile(where: { name: { _ilike: $query }, id: { _neq: $id } }) {
      name
      image_url
      id
    }
  }
`;

export const START_NEW_CHAT = gql`
  mutation ChatMutation($sid: uuid!, $rid: uuid!) {
    insert_communication_threads_one(
      object: { started_by: $sid, started_with: $rid }
    ) {
      id
    }
  }
`;

export const GET_MARKET_PRODUCT = gql`
  query get_market_product($status: String!) {
    market_product(where: { status: { _eq: $status } }) {
      images
      name
      price_coins
      id
      category_id
      description
    }
  }
`;

export const SEND_MARKET_ORDER = gql`
  mutation send_market_order(
    $costCoin: Int!
    $userId: uuid!
    $details: jsonb!
  ) {
    insert_market_orders_one(
      object: { cost_coins: $costCoin, user_id: $userId, details: $details }
    ) {
      id
    }
  }
`;

export const EXAM_TYPE = gql`
  query exam_type($id: uuid!) {
    exams_exam_type(where: { id: { _eq: $id } }) {
      id
      name
      description
    }
  }
`;

export const GET_TODAY_EXAM = gql`
  query get_today_exam($date: timestamptz!) {
    exams_exam(where: { end_at: { _gte: $date } }) {
      cover_image_url
      created_at
      description
      duration_in_minutes
      end_at
      id
      image_url
      price
      price_in_coins
      short_description
      start_at
      title
    }
  }
`;

export const GET_EXAM_DETAILS = gql`
  query get_exam_by_pk($id: uuid!) {
    exams_exam_by_pk(id: $id) {
      cover_image_url
      created_at
      description
      duration_in_minutes
      end_at
      id
      image_url
      price
      price_in_coins
      short_description
      start_at
      title
      exam_type_id
    }
  }
`;

export const GET_MY_EXAMS = gql`
  query get_my_exams($user: uuid!) {
    exams_registration(where: { user_id: { _eq: $user } }) {
      exam {
        cover_image_url
        created_at
        description
        duration_in_minutes
        end_at
        id
        image_url
        price
        price_in_coins
        short_description
        start_at
        title
        exam_type_id
      }
    }
  }
`;

export const GET_REGISTRATION_EXAM = gql`
  query get_registration_exam($examId: uuid!, $userId: uuid!) {
    exams_registration(
      where: { exam_id: { _eq: $examId }, user_id: { _eq: $userId } }
    ) {
      id
    }
  }
`;

export const REGISTER_EXAM = gql`
  mutation registerExam($examId: uuid!, $userId: uuid!) {
    insert_exams_registration_one(
      object: { exam_id: $examId, user_id: $userId }
    ) {
      exam_id
      user_id
    }
  }
`;

export const UNREGISTER_EXAM = gql`
  mutation unregisterExam($userId: uuid!, $examId: uuid!) {
    delete_exams_registration(
      where: { user_id: { _eq: $userId }, exam_id: { _eq: $examId } }
    ) {
      affected_rows
      returning {
        id
      }
    }
  }
`;

export const GET_EXAM_QUES = gql`
  query get_exam_ques($examId: uuid!) {
    exams_exam_question(
      where: { exam_id: { _eq: $examId } }
      order_by: { order: asc }
    ) {
      id
      exam_id
      order
      question {
        id
        correct_answer
        context_id
        question
        created_at
        options
        image_link
        type_of_question_description_override
        solution
        part {
          name
          id
        }
        type_of_question {
          id
          name
        }
        context {
          id
          title
          details
          image_link
          link
          context_type {
            name
          }
        }
      }
    }
  }
`;

export const SEND_ANSWER = gql`
  mutation send_answer($objects: [exams_exam_answer_insert_input!]!) {
    insert_exams_exam_answer(objects: $objects) {
      returning {
        id
      }
    }
  }
`;

export const GET_EXAM_ANS = gql`
  subscription get_exam_ans($userId: uuid!, $ExamId: uuid!) {
    exams_exam_answer(
      where: {
        _and: {
          user_id: { _eq: $userId }
          exam_question: { exam_id: { _eq: $ExamId } }
        }
      }
    ) {
      answer
      id
      status
      updated_at
      exam_question {
        id
      }
    }
  }
`;

export const UPDATE_ANSWER = gql`
  mutation update_answer($answer: String!, $status: String!, $quesId: uuid!) {
    update_exams_exam_answer_by_pk(
      pk_columns: { id: $quesId }
      _set: { answer: $answer, status: $status }
    ) {
      id
    }
  }
`;
