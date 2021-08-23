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
    "id": string;
    "name": string;
    "image_url": string;
}

export interface IChatResponse {
    communication_threads: {
        "id": string,
        "updated_at": Date,
        "profileByStartedBy": IProfile,
        "profileByStartedWith": IProfile
    }[]
}

export interface Message {
    communication_messages: IChat[];
}
