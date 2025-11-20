import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://10.10.12.25:5008/api/v1'}),
  tagTypes: ['inventory'],
  endpoints: (builder) => ({

    //user registration API
    getUserRegister: builder.query({
      query: (featured) => {
        const params = new URLSearchParams();
        if(featured){
          params.append('featured', featured);
        }
        return {
          url: `auth/register`,
          method: 'POST',
          params: params
        };
      },
      providesTags: ['inventory']
    }),

  ///----------------- Password Related APIs -----------------///
    //user login API
    userLogin: builder.mutation({
      query: (newUserLogin) => ({
        url: '/auth/login',
        method: 'POST',
        body: newUserLogin,
      }),
      invalidatesTags: ['inventory'],
    }),  

    //forgot password API
    forgotPassword: builder.mutation({
      query: (userForgotPassword) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: userForgotPassword,
      }),
      invalidatesTags: ['inventory'],
    }),  

    //change password API
      changePassword: builder.mutation({
      query: (userChangePassword) => ({
        url: '/auth/change-password',
        method: 'POST',
        body: userChangePassword,
      }),
      invalidatesTags: ['inventory'],
    }), 
    //reset password API
    resetPassword: builder.mutation({
      query: (userResetPassword) => ({
        url: '/auth/reset-password',
        method: 'PATCH',
        body: userResetPassword,
      }),
      invalidatesTags: ['inventory'],
    }),  

    //verify email API
    verifyEmail: builder.mutation({
      query: (userVerifyEmail) => ({
        url: '/auth/verify-email',
        method: 'POST',
        body: userVerifyEmail,
      }),
      invalidatesTags: ['inventory'],
    }),  


    ///----------------- Inventory Related APIs -----------------///


    // getSingleInventory: builder.query({
    //   query: (id) => ({
    //     method: 'GET',
    //     url: `/inventory/${id}`,
    //   }),
    // }),

    // updatedInventory: builder.mutation({
    //   query: (options) => {
    //     return {
    //       url: `/inventory/${options.id}`,
    //       method: 'PUT',
    //       body: options.data,
    //     };
    //   },
    //   invalidatesTags: ['inventory']
    // }),

    // deleteInventory: builder.mutation({
    //   query: (id) => ({
    //     url: `/sport/${id}`,
    //     method: 'DELETE',
    //   }),
    //   invalidatesTags: ['inventory']
    // }),
  }),
});

export const {
  useGetUserRegisterQuery,
  useUserLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation,
  useChangePasswordMutation
//   useGetSingleInventoryQuery,
//   useUpdatedInventoryMutation,
//   useDeleteInventoryMutation,
} = baseApi;