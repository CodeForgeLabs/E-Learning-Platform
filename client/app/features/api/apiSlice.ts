// src/features/api/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {  Question , Answer , Comment  , Reply } from './apiInterface';
import { getSession } from 'next-auth/react';
import { create } from 'domain';


export const apiSlice = createApi({
  reducerPath: 'api', // Name of the API slice in the Redux state
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: 'include',
    prepareHeaders: async (headers) => {
        // Get the JWT_TOKEN cookie
        const session = await getSession()
        console.log(session , "from api")
  
        // If the token exists, add it to the headers
        if (session && session.token) {
          headers.set('jwt_token', `${session?.token }`);
        }
  
        return headers;
      },  // Base URL for all requests
  }),
  endpoints: (builder) => ({
    getQuestions: builder.query<Question[], void>({
      query: () => 'api/questions', // Relative endpoint to fetch questions
    }),
    getQuestionById: builder.query<Question, string>({
        query: (id) => `api/questions/${id}`, // Interpolate the id into the URL
      }),
    getAnswerById : builder.query<Answer[], string>({
        query: (id) => `api/answers/question/${id}`, // Interpolate the id into the URL
      }),
      createAnswer: builder.mutation({
        query: ({id , body}) => ({
          url: 'api/answers',
          method: 'POST',
          body:{
            "body" : body,
            "question" : {
                "id" : id
            } 
          },
        }),
      }),

      

      getCommentsById: builder.query<Comment[], string>({
        query: (id) => `api/comments/question/${id}`, // Interpolate the id into the URL
      }),

      createComment: builder.mutation({
        query: ({ id, body }) => ({
          url: 'api/comments',
          method: 'POST',
          body: {
            body: body,
            question: {
              id: id,
            },
          },
        }),
      }),



      getIdeas: builder.query<Question[], void>({
        query: () => 'api/idea', // Relative endpoint to fetch questions
      }),
      getIdeaById: builder.query<Question, string>({
        query: (id) => `api/idea/${id}`, // Interpolate the id into the URL
      }),
      getReplyById : builder.query<Reply[], string>({
        query: (id) => `api/replies/idea/${id}`, // Interpolate the id into the URL
      }),
      createReply: builder.mutation({
        query: ({id , body}) => ({
          url: 'api/replies',
          method: 'POST',
          body:{
            "body" : body,
            "idea" : {
                "id" : id
            } 
          },
        }),
      }),

      vote: builder.mutation({
        query: ({ id, isUpvote , category }) => ({
          url: `api/${category}/${id}/vote`,
          method: 'POST',
          params: { 
            isUpvote : isUpvote },
        }),
      }),



      createQuestion: builder.mutation({
        query: ({title , body , tags}) => ({
          url: 'api/questions',
          method: 'POST',
          body: {
            "title" : title,
            "body" : body,
            "tags" : tags
          },
        }),
      }),

      createIdea: builder.mutation({
        query: ({title , body , tags}) => ({
          url: 'api/idea',
          method: 'POST',
          body: {
            "title" : title,
            "body" : body,
            "tags" : tags
          },
        }),
      }),

      deleteQuestion: builder.mutation({
        query: (id) => ({
          url: `api/questions/${id}`,
          method: 'DELETE',
        }),
      }),

      deleteComment: builder.mutation({
        query: (id) => ({
          url: `api/comments/${id}`,
          method: 'DELETE',
        }),
      }),

      deleteAnswer: builder.mutation({
        query: (id) => ({
          url: `api/answers/${id}`,
          method: 'DELETE',
        }),
      }),

      approveAnswer: builder.mutation({
        query: (id) => ({
          url: `api/answers/${id}/accept`,
          method: 'PATCH',
        }),
      }),






    
    
  }),
});

export const {
  useGetQuestionsQuery,
 
  useGetQuestionByIdQuery,
  useGetAnswerByIdQuery,
  useCreateAnswerMutation,
  useGetCommentsByIdQuery,
  useCreateCommentMutation,
  useGetIdeasQuery,
  useGetIdeaByIdQuery,
  useGetReplyByIdQuery,
  useCreateReplyMutation,
  useVoteMutation,
  useCreateIdeaMutation,
  useCreateQuestionMutation,
  useDeleteQuestionMutation,
  useDeleteCommentMutation,
  useDeleteAnswerMutation,
  useApproveAnswerMutation,

} = apiSlice;


// createQuestion: builder.mutation({
//   query: (newQuestion) => ({
//     url: 'questions',
//     method: 'POST',
//     body: newQuestion,
//   }),
// }),