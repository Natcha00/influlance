import { createApi } from "@reduxjs/toolkit/query/react";
import { authenUsers, loginUsers } from "../shared/mockup/authenUser";
import Cookies from "js-cookie";
import { delay } from "../shared/utils/delay";
import { portfolios } from "../shared/mockup/portfolio";
import { jobs } from "../shared/mockup/job";
import { categories } from '../shared/mockup/category'
import { workSpace } from "../shared/mockup/workspace";

const mockBaseQuery = async (arg) => {
    // Handle different endpoints (arg contains the query path or params)
    let workspaceStorage = localStorage.getItem('workspaceStorage')
    if (!workspaceStorage) {
        localStorage.setItem('workspaceStorage', JSON.stringify(workSpace))
        workspaceStorage = workSpace
    } else {
        workspaceStorage = JSON.parse(localStorage.getItem('workspaceStorage'))
    }
    if (arg.url === '/jobs') {
        const token = Cookies.get('accessToken')
        if (!token) {
            return { error: { status: 401, data: "unauthorize" } }
        }
        const findToken = authenUsers.find(auth => auth.accessToken == token)
        const influId = findToken.influId

        const hadEnroll = workspaceStorage.filter(je => je.influId == influId)

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

        const enrollsJob = workspaceStorage.filter(je => je.influId == influId && je.jobStatus == 'wait hiring').map(je => {
            const findJob = jobs.find(j => j.jobId == je.jobId)
            return {
                ...je,
                ...findJob
            }
        })
        console.log(enrollsJob)

        const waitDraftJob = workspaceStorage.filter(je => je.influId == influId && je.jobStatus == "wait draft").map(je => {
            const findJob = jobs.find(j => j.jobId == je.jobId)
            return {
                ...je,
                ...findJob
            }
        })

        const waitPostJob = workspaceStorage.filter(je => je.influId == influId && je.jobStatus == "wait post").map(je => {
            const findJob = jobs.find(j => j.jobId == je.jobId)
            return {
                ...je,
                ...findJob
            }
        })

        const completeJob = workspaceStorage.filter(je => je.influId == influId && je.jobStatus == "confirm").map(je => {
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

        const newWorkspaceStorage = [
            ...workspaceStorage,
            {
                jobEnrollId: workSpace.length + 1,
                jobId,
                influId,
                marketerId,
                jobStatus: "wait hiring"
            }
        ]

        localStorage.setItem('workspaceStorage', JSON.stringify(newWorkspaceStorage))


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

        const newWorkspaceStorage = workspaceStorage.filter(je => (je.jobId != jobId && je.influId == influId) || (je.influId != influId))
        localStorage.setItem('workspaceStorage', JSON.stringify(newWorkspaceStorage))

        return {
            data: "success"
        }
    } else if (arg.url == '/save-darft') {
        const token = Cookies.get('accessToken')
        if (!token) {
            return { error: { status: 401, data: "unauthorize" } }
        }
        const findToken = authenUsers.find(auth => auth.accessToken == token)
        const influId = findToken.influId

        const {
            content,
            pictureURL,
            videoURL,
            jobEnrollId
        } = arg.body

        const findJobEnrollId = workspaceStorage.find(je => je.influId == influId && je.jobEnrollId == jobEnrollId)

        findJobEnrollId.draft = [...findJobEnrollId.draft, {
            jobDraftId: findJobEnrollId.draft.length + 1,
            content,
            pictureURL,
            videoURL,
            status: "pending"
        }]

        localStorage.setItem('workspaceStorage', JSON.stringify(workspaceStorage))

        return {
            data: "success"
        }
    } else if (arg.url == '/save-post') {
        const token = Cookies.get('accessToken')
        if (!token) {
            return { error: { status: 401, data: "unauthorize" } }
        }
        const findToken = authenUsers.find(auth => auth.accessToken == token)
        const influId = findToken.influId

        const {
            content,
            pictureURL,
            videoURL,
            jobEnrollId
        } = arg.body

        const findJobEnrollId = workspaceStorage.find(je => je.influId == influId && je.jobEnrollId == jobEnrollId)

        findJobEnrollId.post = [...findJobEnrollId.post, {
            jobPostId: findJobEnrollId.post.length + 1,
            content,
            pictureURL,
            videoURL,
            status: "pending"
        }]

        localStorage.setItem('workspaceStorage', JSON.stringify(workspaceStorage))

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
            }),
            saveDraft: builder.mutation({
                query: ({
                    content,
                    pictureURL,
                    videoURL,
                    jobEnrollId
                }) => ({
                    url: "/save-darft",
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: {
                        content,
                        pictureURL,
                        videoURL,
                        jobEnrollId
                    }
                })
            }),
            savePost: builder.mutation({
                query: ({
                    content,
                    pictureURL,
                    videoURL,
                    jobEnrollId
                }) => ({
                    url: "/save-post",
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: {
                        content,
                        pictureURL,
                        videoURL,
                        jobEnrollId
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
    useCancelEnrollMutation,
    useSaveDraftMutation,
    useSavePostMutation
} = jobApi