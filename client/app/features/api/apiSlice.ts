// src/features/api/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {  Question  } from './apiInterface';

export const apiSlice = createApi({
  reducerPath: 'api', // Name of the API slice in the Redux state
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
        // Get the JWT_TOKEN cookie
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('next-auth.session-token='))
          ?.split('=')[1];
  
        // If the token exists, add it to the headers
        if (token) {
          headers.set('JWT_TOKEN', `${token}`);
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
