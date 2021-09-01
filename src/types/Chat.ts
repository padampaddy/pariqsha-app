export interface IChat {
  id: string;
  image_url: string;
  attachment_url: string;
  title: string;
  message: string;
  name: string;
  created_at: Date;
  sent_by: string;
}

interface IProfile {
  id: string;
  name: string;
  image_url: string;
}

export interface IChatResponse {
  communication_threads: {
    id: string;
    updated_at: Date;
    profileByStartedBy: IProfile;
    profileByStartedWith: IProfile;
  }[];
}

export interface IMessage {
  id: string;
  attachment_url: string;
  created_at: Date;
  message: string;
  sent_by: string;
}

export interface IThreadResponse {
  communication_threads_by_pk: {
    messages: IMessage[];
    profileByStartedBy: IProfile;
    profileByStartedWith: IProfile;
  };
}

export interface ISendMessage {
  createChat: {
    sent_by: string;
    id: string;
    message: string;
  };
}

export interface IUsersProfile {
  users_profile_by_pk: {
    name: string;
    id: string;
    image_url: string;
  };
}

export interface UserProfile {
  users_profile: {
    name: string;
    id: string;
    image_url: string;
  };
}
