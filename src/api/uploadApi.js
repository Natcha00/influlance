import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authenUsers, loginUsers } from "../shared/mockup/authenUser";
import Cookies from "js-cookie";
import { delay } from "../shared/utils/delay";



export const uploadApi = createApi({
    reducerPath: "uploadApi",
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    endpoints: (builder) => {
        return {
            upload: builder.mutation({
                query: ({ image }) => {
                    const formData = new FormData();
                    formData.append('image', image);
                    return {
                        url: "/upload-image",
                        method: "POST",
                        body: formData
                    }
                }
            })


        }
    }
})

export const {
    useUploadMutation
} = uploadApi