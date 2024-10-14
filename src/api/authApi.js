import { createApi } from "@reduxjs/toolkit/query/react";
import { authenUsers, loginUsers } from "../shared/mockup/authenUser";
import Cookies from "js-cookie";
import { delay } from "../shared/utils/delay";
import { portfolios } from "../shared/mockup/portfolio";

const mockBaseQuery = async (arg) => {
    // Handle different endpoints (arg contains the query path or params)
    if (arg.url === '/login') {
        const { email, password } = arg.body
        const findAuth = authenUsers.find(auth => auth.email == email)
        if (!findAuth) {
            return { error: { status: 400, data: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" } }
        }

        if (findAuth.password != password) {
            return { error: { status: 400, data: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" } }
        }
        await delay()
        return {
            data: {
                accessToken: findAuth.accessToken
            }
        };
    } else if (arg.url == '/me') {
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
    } else if (arg.url == '/register') {
        const {
            email,
            password,
            firstName,
            lastName,
            facebook,
            instagram,
            x,
            tiktok,
            profilePicture,
            categories
        } = arg.body
        const findEmail = authenUsers.find(auth => auth.email == email)

        if (!!findEmail) {
            return { error: { status: 400, data: "อีเมลนี้มีผู้ใช้งานอยู่แล้ว" } }
        }
        await delay()
        const id = authenUsers.length + 1
        authenUsers.push({
            influId: id,
            email,
            password,
            accessToken: `token${id}`,
            firstName,
            lastName,
            facebook,
            instagram,
            x,
            tiktok,
            profilePicture,
            categories
        })

        return {
            data: {
                accessToken: `token${id}`
            }
        };

    } else if (arg.url == '/check-email') {
        const {
            email,
        } = arg.body
        const findEmail = authenUsers.find(auth => auth.email == email)

        if (!!findEmail) {
            return { error: { status: 400, data: "อีเมลนี้มีผู้ใช้งานอยู่แล้ว" } }
        }
        return {
            status: 200,
            data: "สามารถใช้อีเมลนี้ได้"
        }
    } else if (arg.url == '/portfolio') {
        const token = Cookies.get('accessToken')
        if (!token) {
            return { error: { status: 401, data: "unauthorize" } }
        }
        const findToken = authenUsers.find(auth => auth.accessToken == token)

        const influId = findToken.influId

        const portfolio = portfolios.find(el => el.influId == influId) ?? []
        return {
            data: portfolio.portfolio
        }

    } else if (arg.url == '/add-portfolio') {
        const token = Cookies.get('accessToken')
        if (!token) {
            return { error: { status: 401, data: "unauthorize" } }
        }
        const findToken = authenUsers.find(auth => auth.accessToken == token)

        const influId = findToken.influId

        let findPortfolio = portfolios.find(el => el.influId == influId)

        const {
            title,
            description,
            firstImage,
            images
        } = arg.body

        if (findPortfolio) {
            findPortfolio.portfolio = [...findPortfolio.portfolio, {
                title,
                description,
                firstImage,
                images
            }]
        } else {
            portfolios.push({
                influId: influId,
                portfolio: [
                    {
                        title,
                        description,
                        firstImage,
                        images
                    }
                ]
            })
        }


        return {
            data: "success"
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
            }),
            register: builder.mutation({
                query: ({
                    email,
                    password,
                    firstName,
                    lastName,
                    facebook,
                    instagram,
                    x,
                    tiktok,
                    profilePicture,
                    categories
                }) => ({
                    url: "/register",
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: {
                        email,
                        password,
                        firstName,
                        lastName,
                        facebook,
                        instagram,
                        x,
                        tiktok,
                        profilePicture,
                        categories
                    }
                }),
            }),
            checkEmail: builder.mutation({
                query: ({ email }) => ({
                    url: "/check-email",
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: {
                        email
                    }
                })
            }),
            portfolio: builder.query({
                query: () => ({
                    url: "/portfolio",
                    method: "GET"
                })
            }),
            addPortfolio: builder.mutation({
                query: ({
                    title,
                    description,
                    firstImage,
                    images
                }) => ({
                    url: "/add-portfolio",
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: {
                        title,
                        description,
                        firstImage,
                        images
                    }
                })
            })
        }
    }
})

export const {
    useLoginMutation,
    useMeQuery,
    useRegisterMutation,
    useCheckEmailMutation,
    usePortfolioQuery,
    useAddPortfolioMutation
} = authApi