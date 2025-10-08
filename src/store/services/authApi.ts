import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://myecp-dev-dpavtgrx.uc.gateway.dev/api' }), // Adjust base URL as needed
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: ({ UserName, Password, rememberMe }) => ({
        url: '/login',
        method: 'POST',
        body: { UserName, Password, IsSecurityQuestionNeeded: rememberMe },
      }),
    }),
  }),
});

export const { useLoginUserMutation } = authApi;
