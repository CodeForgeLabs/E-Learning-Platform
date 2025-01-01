// src/features/api/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {  Question  } from './apiInterface';
import { getSession } from 'next-auth/react';

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
    createQuestion: builder.mutation({
      query: (newQuestion) => ({
        url: 'questions',
        method: 'POST',
        body: newQuestion,
      }),
    }),
    
  }),
});

export const {
  useGetQuestionsQuery,
  useCreateQuestionMutation,

} = apiSlice;
