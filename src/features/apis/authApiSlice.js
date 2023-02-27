import { apiSlice } from './apiSlice'

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credential) => ({
        url: '/auth/login',
        method: 'POST',
        body: { ...credential },
      }),
    }),
    register: builder.mutation({
      query: (credential) => ({
        url: '/auth/register',
        method: 'POST',
        body: { ...credential },
      }),
    }),
    // logout: builder.mutation({
    //   query: () => ({

    //   })
    // })
  }),
})

export const { useLoginMutation, useRegisterMutation } = authApiSlice
