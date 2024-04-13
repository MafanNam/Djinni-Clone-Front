import {apiSlice} from "@/lib/services/apiSlice";
import {BaseApi} from "@/utils/Interface";
import {ContactCv} from "@/lib/features/accounts/accountsApiSlice";

export interface Chat extends BaseApi {
  room_id: string;
  candidate: {
    id: number;
    first_name: string;
    last_name: string;
    position: string;
    country: string;
    image: any;
  };
  recruiter: {
    id: number;
    first_name: string;
    last_name: string;
    position: string;
    country: string;
    image: any;
    trust_hr: boolean;
  };
  feedback: {
    vacancy: {
      slug: string;
      title: string;
      company: string;
      employ_options: [];
      created_at: string;
      updated_at: string;
    };
    contact_cv: ContactCv;
  };
  last_message: string;
  is_read: boolean;
}

export interface Chats {
  count: number;
  results: Chat[];
}

export interface ChatMessages {
  count: number;
  results: {
    id: number;
    user: {
      id: number;
      first_name: string;
      last_name: string;
      type_profile: string;
      image: any;
      is_online: boolean;
    };
    message: string;
    is_read: boolean;
  }[]

}

export interface CreateChatMessages extends BaseApi {
  message: string;
}

const inboxApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    listChats: builder.query<Chats, void>({
      query: () => '/chats/',
    }),
    retrieveChat: builder.query<Chat, string>({
      query: (room_id) => `/chats/${room_id}/`,
    }),
    retrieveChatMessages: builder.query<ChatMessages, string>({
      query: (room_id) => `/chats/${room_id}/messages/`,
    }),
    postChatMessages: builder.mutation<CreateChatMessages, Partial<any>>({
      query: ({room_id, ...data}) => ({
        url: `/chats/${room_id}/messages/`,
        method: "POST",
        body: data,
      }),
    }),
  })
})

export const {
  useListChatsQuery,
  useRetrieveChatQuery,
  useRetrieveChatMessagesQuery,
  usePostChatMessagesMutation,
} = inboxApiSlice;