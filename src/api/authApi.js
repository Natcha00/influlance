import { createApi } from "@reduxjs/toolkit/query/react";
import { authenUsers, loginUsers } from "../shared/mockup/authenUser";
import Cookies from "js-cookie";
import { delay } from "../shared/utils/delay";
import { useSelector } from "react-redux";

const mockBaseQuery = async (arg) => {
    // Handle different endpoints (arg contains the query path or params)
    if (arg.url === '/login') {
        const { email, password } = arg.body
        const findAuth = authenUsers.find(auth => auth.email == email)
        if (!findAuth) {
            return { error: { status: 400, data: "email or password is invalid" } }
        }

        if (findAuth.password != password) {
            return { error: { status: 400, data: "email or password is invalid" } }
        }
        await delay()
        loginUsers.push({ email, password })
        return {
            data: {
                accessToken: findAuth.accessToken
            }
        };
    } else if (arg.url == '/me') {
        console.log(loginUsers)
        const token = Cookies.get('accessToken')
        if (!token) {
            return { error: { status: 401, data: "unauthorize" } }
        }
        const findToken = authenUsers.find(auth => auth.accessToken == token)
        if (!findToken) {
            return { error: { status: 401, data: "unauthorize" } }
        }

        return {
            data: {
                ...findToken
            }
        }
    }

    // You can add more mock responses for other endpoints here.
    return { error: { status: 404, data: 'Not found' } };
};


export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: mockBaseQuery,
    endpoints: (builder) => {
        return {
            login: builder.mutation({
                query: ({ email, password }) => ({
                    url: "/login",
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: {
                        email,
                        password
                    }
                }),
                transformResponse: (response) => response
            }),
            me: builder.query({
                query: () => ({
                    url: "/me",
                    method: "GET"
                })
            })
        }
    }
})

export const {
    useLoginMutation,
    useMeQuery
} = authApi