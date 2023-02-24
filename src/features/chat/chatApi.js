import apiSlice from '../api/apiSlice'

const chatApi = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getChats: builder.query({
			query: arg => ({
				url: `/chats?candidate=${arg.candidate}&employer=${arg.employer}`,
			}),
			providesTags: ['Chats'],
		}),
		postChat: builder.mutation({
			query: data => ({
				url: '/chat',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Chats'],
		}),
		updateMessage: builder.mutation({
			query: data => ({
				url: '/chat',
				method: 'PATCH',
				body: data,
			}),
			invalidatesTags: ['Chats'],
		}),
	}),
})

export const {
	useGetChatsQuery,
	useUpdateMessageMutation,
	usePostChatMutation,
} = chatApi
