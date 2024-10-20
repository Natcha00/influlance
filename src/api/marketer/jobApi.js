import { createApi } from "@reduxjs/toolkit/query/react";
import { authenUsers } from "../../shared/mockup/authenUser";
import Cookies from "js-cookie";
import { delay } from "../../shared/utils/delay";
import { portfolios } from "../../shared/mockup/portfolio";
import { categories } from '../../shared/mockup/category'
import { workSpace } from "../../shared/mockup/workspace";
import { supabase } from "../../shared/supabase";

const mockBaseQuery = async (arg) => {
    // Handle different endpoints (arg contains the query path or params)
    let workspaceStorage = localStorage.getItem('workspaceStorage')
    if (!workspaceStorage) {
        localStorage.setItem('workspaceStorage', JSON.stringify(workSpace))
        workspaceStorage = workSpace
    } else {
        workspaceStorage = JSON.parse(localStorage.getItem('workspaceStorage'))
    }
    if (arg.url === '/add-post-job') {
        const token = Cookies.get('accessToken')
        if (!token) {
            return { error: { status: 401, data: "unauthorize" } }
        }
        const { data: findToken, error } = await supabase
            .from("marketer")
            .select()
            .eq("accessToken", token)
            .single()

        if (error) {
            return { error: { status: 500, data: "Internal Server Error" } }
        }

        if (!findToken) {
            return { error: { status: 401, data: "unauthorize" } }
        }

        const marketerId = findToken.marketerId

        const {
            jobTitle,
            jobDescription,
            tag,
            follower,
            totalPayment,
            influencerCount,
            paymentPerInfluencer,
            dueDate,
            files
        } = arg.body

        const { data: insertJob, error: insertError } = await supabase
            .from("job")
            .insert([
                {
                    marketerId,
                    jobTitle,
                    jobDescription,
                    tag,
                    follower,
                    totalPayment,
                    influencerCount,
                    paymentPerInfluencer,
                    dueDate,
                    files
                }
            ])

        if (insertError) {
            return { error: { status: 500, data: "Internal Server Error" } }
        }
        return {
            data: "success"
        }

    } else if (arg.url == '/categories') {
        await delay()
        return {
            data: categories
        }
    } else if (arg.url == '/get-jobs') {
        const token = Cookies.get('accessToken')
        if (!token) {
            return { error: { status: 401, data: "unauthorize" } }
        }
        const { data: findToken, error } = await supabase
            .from("marketer")
            .select()
            .eq("accessToken", token)
            .single()

        if (error) {
            return { error: { status: 500, data: "Internal Server Error" } }
        }

        if (!findToken) {
            return { error: { status: 401, data: "unauthorize" } }
        }

        const marketerId = findToken.marketerId
        const { data: jobs, errorJobs } = await supabase
            .from("job")
            .select(`
                * ,
                marketer (
                    firstName,
                    lastName,
                    profilePicture
                ),
                jobEnroll (
                    influencer(
                     *
                    )
                )
                `)
            .eq("marketerId", marketerId)

        if (errorJobs) {
            return { error: { status: 500, data: "Internal Server Error" } }
        }

        return {
            data: jobs.map(el => ({
                ...el,
                marketerName: `${el.marketer.firstName} ${el.marketer.lastName}`,
                markerProfileImage: el.marketer.profilePicture
            })),



        }
    }

    // You can add more mock responses for other endpoints here.
    return { error: { status: 404, data: 'Not found' } };
};


export const mktJobApi = createApi({
    reducerPath: "mktJobApi",
    baseQuery: mockBaseQuery,
    endpoints: (builder) => {
        return {
            addPostJob: builder.mutation({
                query: ({
                    jobTitle,
                    jobDescription,
                    tag,
                    follower,
                    totalPayment,
                    influencerCount,
                    paymentPerInfluencer,
                    dueDate,
                    files
                }) => ({
                    url: "/add-post-job",
                    method: "POST",
                    body: {
                        jobTitle,
                        jobDescription,
                        tag,
                        follower,
                        totalPayment,
                        influencerCount,
                        paymentPerInfluencer,
                        dueDate,
                        files
                    }
                })
            }),
            categories: builder.query({
                query: () => ({
                    url: "/categories",
                    method: 'GET'
                })
            }),
            getJobs: builder.query({
                query: () => ({
                    url: "/get-jobs",
                    method: "GET"
                })
            })
        }
    }
})

export const {
    useCategoriesQuery,
    useAddPostJobMutation,
    useGetJobsQuery
} = mktJobApi