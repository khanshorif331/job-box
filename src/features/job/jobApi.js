import apiSlice from '../api/apiSlice'

const jobApi = apiSlice.injectEndpoints({
	endpoints: builder => ({
		postJob: builder.mutation({
			query: data => ({
				url: '/job',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Jobs'],
		}),
		apply: builder.mutation({
			query: data => ({
				url: '/apply',
				method: 'PATCH',
				body: data,
			}),
			invalidatesTags: ['Jobs'],
		}),
		question: builder.mutation({
			query: data => ({
				url: '/query',
				method: 'PATCH',
				body: data,
			}),
			invalidatesTags: ['Job'],
		}),
		reply: builder.mutation({
			query: data => ({
				url: '/reply',
				method: 'PATCH',
				body: data,
			}),
			invalidatesTags: ['Job'],
		}),
		getJobs: builder.query({
			query: () => ({
				url: '/jobs',
			}),
			providesTags: ['Jobs'],
		}),
		getAppliedJobs: builder.query({
			query: email => ({
				url: `/applied-jobs/${email}`,
			}),
		}),
		jobById: builder.query({
			query: id => ({
				url: `/job/${id}`,
			}),
			providesTags: ['Job'],
		}),
		getPostedJobs: builder.query({
			query: email => ({
				url: `/posted-jobs/${email}`,
			}),
			// providesTags: ['Jobs'],
		}),
	}),
})

export const {
	usePostJobMutation,
	useGetJobsQuery,
	useJobByIdQuery,
	useApplyMutation,
	useGetAppliedJobsQuery,
	useQuestionMutation,
	useReplyMutation,
	useGetPostedJobsQuery,
} = jobApi
