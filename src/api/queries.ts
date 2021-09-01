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

export const GET_MY_CHATS = gql`
  subscription get_my_chats($id: uuid!) {
    communication_threads(
      where: {
        _or: [{ started_by: { _eq: $id } }, { started_with: { _eq: $id } }]
      }
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

export const USER_PROFILE_CONTACT = gql`
  subscription user_profile_contact(
    $id: uuid!
    $imageUrl: String!
    $name: String!
  ) {
    users_profile(where: { name: { _ilike: "%%" } }) {
      name
      image_url
    }
  }
`;
