import { apiSlice } from "../apiSlice";

const USER_URL = '/user';



export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/profile`,
                method: "PUT",
                body: data,
                credentials: "include",
            })
        }),

        getUserList: builder.query({
            query: () => ({
                url: `${USER_URL}/get-team`,
                method: "GET",
                credentials: "include",
            })
        }),

        deleteUser: builder.mutation({
            query: (id) => ({
                url: `${USER_URL}/${id}`,
                method: "DELETE",
                credentials: "include",
            })
        }),
        // below is for active or inactive usr ac .
        userAction: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/${data?.id}`,
                method: "PUT",
                body: data,
                credentials: "include",
            })
        }),

        getNotifications: builder.query({
            query: () => ({
                url: `${USER_URL}/notifications`,
                method: "GET",
                credentials: "include",
            })
        }),

        markNotification: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/read-noti?isReadType=${data.type}&id=${data?.id}`,
                method: "PUT",
                body: data,
                credentials: "include",
            })
        }),

        changePassword: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/change-password`,
                method: "PUT",
                body: data,
                credentials: "include",
            })
        }),

    })
});


export const { useUpdateUserMutation, useGetUserListQuery, useDeleteUserMutation, useUserActionMutation, useGetNotificationsQuery, useMarkNotificationMutation, useChangePasswordMutation } = userApiSlice;


// 1. DIFFERENCE BETWEEN QUERY AND MUTATION ????????????
// Queries are used when you need to fetch data from the server without modifying or mutating any data.
// it resposible for ONLY GET req

// A mutation is used to modify data on the server.
// It resembles a POST, PUT, PATCH, or DELETE request in RESTful APIs, where you perform actions that change the state of data on the server.