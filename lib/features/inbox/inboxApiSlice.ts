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
    created_at: string;
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
      providesTags: ['Chats', 'Feedback']
    }),
    retrieveChat: builder.query<Chat, string>({
      query: (room_id) => `/chats/${room_id}/`,
      providesTags: ['Chats']
    }),
    retrieveChatMessages: builder.query<ChatMessages, string>({
      query: (room_id) => `/chats/${room_id}/messages/`,
      providesTags: ['Messages'],
      keepUnusedDataFor: 10,
    }),
    postChatMessages: builder.mutation<CreateChatMessages, Partial<any>>({
      query: ({room_id, ...data}) => ({
        url: `/chats/${room_id}/messages/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['Messages']
    }),
    deleteChatMessage: builder.mutation<unknown, any>({
      query: ({room_id, id}) => ({
        url: `/chats/${room_id}/messages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Messages']
    }),

    deleteChat: builder.mutation<unknown, string>({
      query: (room_id) => ({
        url: `/chats/${room_id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Chats', 'Messages']
    })
  })
})

export const {
  useListChatsQuery,
  useDeleteChatMutation,
  useRetrieveChatQuery,
  useRetrieveChatMessagesQuery,
  usePostChatMessagesMutation,
  useDeleteChatMessageMutation,
} = inboxApiSlice;