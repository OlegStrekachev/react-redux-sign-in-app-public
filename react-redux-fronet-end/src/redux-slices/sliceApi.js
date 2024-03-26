// create API is a central place where we define all the endpoints and the logic for handling them
// FetchBaseQuery is a wrapper around the fetch API that simplifies HTTP requests
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Defining the API  endpoints
export const kidsListApi = createApi({
  reducerPath: "kidsListApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/", credentials: "include" }),
  endpoints: (builder) => ({
    getFullList: builder.query({
      query: () => ({
        url: "/api",
        method: "GET",
      }),
      providesTags: ["Records"], // Define a tag for the query
    }),
    postNewRecord: builder.mutation({
      query: (newRecord) => ({
        url: "/api",
        method: "POST",
        body: newRecord,
      }),
      invalidatesTags: ["Records"], // Invalidate this tag after the mutation
    }),
    editRecord: builder.mutation({
      query: (newRecord) => {
        // Here the arrrow function returns more thatn one statement therefore we need to use the return keyword explicitly
        const { id, ...restOfRecord } = newRecord;
        return {
          url: `/api/?id=${id}`,
          method: "PATCH",
          body: restOfRecord,
        };
      },
      invalidatesTags: ["Records"], // Invalidate this tag after the mutation
    }),
    deleteRecord: builder.mutation({
      query: (id) => ({
        url: `/api/?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Records"], // Invalidate this tag after the mutation
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
        // Include the HTTP-only cookie
        providesTags: ["Auth"], // Define a tag for the query
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
        invalidatesTags: ["Auth", "Records"], // Invalidate this tag after the mutation
      }),
    }),
    validateToken: builder.query({
      query: () => ({
        url: "/api/auth-status",
        method: "GET",
        invalidatesTags: ["Records"],
      }),
    }),
    printSchedule: builder.mutation({
      query: (chooseWeek) => ({
        url: "/api/send-email",
        method: "POST",
        body: chooseWeek,
        // Include the HTTP-only cookie
      }),
    }),
  }),
});

export const {
  usePrintScheduleMutation,
  useGetFullListQuery,
  useValidateTokenQuery,
  usePostNewRecordMutation,
  useEditRecordMutation,
  useDeleteRecordMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
} = kidsListApi;
