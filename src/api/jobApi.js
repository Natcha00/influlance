import { createApi } from "@reduxjs/toolkit/query/react";
import { authenUsers, loginUsers } from "../shared/mockup/authenUser";
import Cookies from "js-cookie";
import { delay } from "../shared/utils/delay";
import { portfolios } from "../shared/mockup/portfolio";
import { jobs } from "../shared/mockup/job";
import { categories } from '../shared/mockup/category'
import { jobEnrolls } from "../shared/mockup/jobEnroll";

const mockBaseQuery = async (arg) => {
    // Handle different endpoints (arg contains the query path or params)
    let jobEnrollsStorage = localStorage.getItem('jobEnrolls')
    if (!jobEnrollsStorage) {
        localStorage.setItem('jobEnrolls', JSON.stringify(jobEnrolls))
        jobEnrollsStorage = jobEnrolls
    } else {
        jobEnrollsStorage = JSON.parse(localStorage.getItem('jobEnrolls'))
    }
    if (arg.url === '/jobs') {
        const token = Cookies.get('accessToken')
        if (!token) {
            return { error: { status: 401, data: "unauthorize" } }
        }
        const findToken = authenUsers.find(auth => auth.accessToken == token)
        const influId = findToken.influId

        const hadEnroll = jobEnrollsStorage.filter(je => je.influId == influId)

        await delay()
        return {
            data: jobs.filter(j => !hadEnroll.map(e => e.jobId).includes(j.jobId))
        };
    } else if (arg.url == '/categories') {
        await delay()
        return {
            data: categories
        }
    } else if (arg.url == '/job-enrolls') {
        const token = Cookies.get('accessToken')
        if (!token) {
            return { error: { status: 401, data: "unauthorize" } }
        }
        const findToken = authenUsers.find(auth => auth.accessToken == token)
        const influId = findToken.influId
        const enrollsJob = jobEnrollsStorage.filter(je => je.influId == influId && je.status == 'wait hiring').map(je => {
            const findJob = jobs.find(j => j.jobId == je.jobId)
            return {
                ...je,
                ...findJob
            }
        })

        const waitDraftJob = jobEnrollsStorage.filter(je => je.influId == influId && je.status == "wait draft").map(je => {
            const findJob = jobs.find(j => j.jobId == je.jobId)
            return {
                ...je,
                ...findJob
            }
        })

        const waitPostJob = jobEnrollsStorage.filter(je => je.influId == influId && je.status == "wait post").map(je => {
            const findJob = jobs.find(j => j.jobId == je.jobId)
            return {
                ...je,
                ...findJob
            }
        })

        const completeJob = jobEnrollsStorage.filter(je => je.influId == influId && je.status == "confirm").map(je => {
            const findJob = jobs.find(j => j.jobId == je.jobId)
            return {
                ...je,
                ...findJob
            }
        })

        return {
            data: {
                enrollsJob,
                waitDraftJob,
                waitPostJob,
                completeJob
            }
        }
    } else if (arg.url == '/enroll') {
        const token = Cookies.get('accessToken')
        if (!token) {
            return { error: { status: 401, data: "unauthorize" } }
        }
        const findToken = authenUsers.find(auth => auth.accessToken == token)
        const influId = findToken.influId

        const { jobId, marketerId } = arg.body
        await delay(500)

        const newJobEnrollsStorage = [
            ...jobEnrollsStorage,
            {
                jobEnrollId: jobEnrolls.length + 1,
                jobId,
                influId,
                marketerId
            }
        ]

        localStorage.setItem('jobEnrolls', JSON.stringify(newJobEnrollsStorage))


        return {
            data: "success"
        }
    } else if (arg.url == '/cancel-enroll') {
        const token = Cookies.get('accessToken')
        if (!token) {
            return { error: { status: 401, data: "unauthorize" } }
        }
        const findToken = authenUsers.find(auth => auth.accessToken == token)
        const influId = findToken.influId

        const { jobId } = arg.body
        await delay(500)
        console.log(jobId, influId)
        const newJobEnrollsStorage = jobEnrollsStorage.filter(je => (je.jobId != jobId && je.influId == influId) || (je.influId != influId))
        console.log(newJobEnrollsStorage)
        localStorage.setItem('jobEnrolls', JSON.stringify(newJobEnrollsStorage))

        return {
            data: "success"
        }
    }

    // You can add more mock responses for other endpoints here.
    return { error: { status: 404, data: 'Not found' } };
};


export const jobApi = createApi({
    reducerPath: "jobApi",
    baseQuery: mockBaseQuery,
    endpoints: (builder) => {
        return {
            jobs: builder.query({
                query: () => ({
                    url: "/jobs",
                    method: "GET",
                })
            }),
            categories: builder.query({
                query: () => ({
                    url: "/categories",
                    method: 'GET'
                })
            }),
            jobEnrolls: builder.query({
                query: () => ({
                    url: "/job-enrolls",
                    method: 'GET'
                })
            }),
            enroll: builder.mutation({
                query: ({ jobId, marketerId }) => ({
                    url: "/enroll",
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: {
                        jobId,
                        marketerId
                    }
                })
            }),
            cancelEnroll: builder.mutation({
                query: ({ jobId }) => ({
                    url: "/cancel-enroll",
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: {
                        jobId,
                    }
                })
            })
        }
    }
})

export const {
    useJobsQuery,
    useCategoriesQuery,
    useJobEnrollsQuery,
    useEnrollMutation,
    useCancelEnrollMutation
} = jobApi