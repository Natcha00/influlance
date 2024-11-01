import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { supabase } from "../../shared/supabase";

const mockBaseQuery = async (arg) => {
    if (arg.url == '/finance-transaction') {
        const token = Cookies.get('accessToken')
        if (!token) {
            return { error: { status: 401, data: "unauthorize" } }
        }
        const { data: findToken, error } = await supabase
            .from("influencer")
            .select()
            .eq("accessToken", token)
            .single()

        if (error) {
            return { error: { status: 500, data: "Internal Server Error" } }
        }

        if (!findToken) {
            return { error: { status: 401, data: "unauthorize" } }
        }

        const accountId = findToken.accountId

        console.log('accountId', accountId)
        const { data: transaction, error: transactionError } = await supabase
            .from("transaction")
            .select()
            .eq("sourceAccountId", accountId)
            .order("createDate", { ascending: false })

        return {
            data: transaction
        }
    } else if (arg.url == '/get-balance') {
        const token = Cookies.get('accessToken')
        if (!token) {
            return { error: { status: 401, data: "unauthorize" } }
        }
        const { data: findToken, error } = await supabase
            .from("influencer")
            .select()
            .eq("accessToken", token)
            .single()

        if (error) {
            return { error: { status: 500, data: "Internal Server Error" } }
        }

        if (!findToken) {
            return { error: { status: 401, data: "unauthorize" } }
        }

        const accountId = findToken.accountId

        const { data: lastTransaction, error: lastTransactionError } = await supabase
            .from("transaction")
            .select()
            .eq("sourceAccountId", accountId)
            .order("createDate", { ascending: false })

        const balance = lastTransaction[0]?.balance || 0

        return {
            data: balance
        }
    } else if (arg.url == '/withdraw') {
        const token = Cookies.get('accessToken')
        if (!token) {
            return { error: { status: 401, data: "unauthorize" } }
        }
        const { data: findToken, error } = await supabase
            .from("influencer")
            .select()
            .eq("accessToken", token)
            .single()

        if (error) {
            return { error: { status: 500, data: "Internal Server Error" } }
        }

        if (!findToken) {
            return { error: { status: 401, data: "unauthorize" } }
        }

        const accountId = findToken.accountId

        const {
            amount,
            sourceAccountNumber,
            bank
        } = arg.body

        const { data: lastTransaction, error: lastTransactionError } = await supabase
            .from("transaction")
            .select()
            .eq("sourceAccountId", accountId)
            .order("createDate", { ascending: false })

        const balance = lastTransaction[0]?.balance || 0

        const { data: insertTransaction, error: insertTransactionError } = await supabase
            .from("transaction")
            .insert([
                {
                    amount: amount,
                    balance: balance - amount,
                    transactionType: 'withdraw',
                    sourceAccountId: accountId,
                    destinationAccountId: null,
                    status: "success",
                    remark: `ถอนเงิน ไปยัง ${bank} เลขบัญชี ${sourceAccountNumber}`
                }
            ])

        if (insertTransactionError) {
            return { error: { status: 500, data: "Internal Server Error" } }
        }


        return {
            data: "success"
        }
    }
    return { error: { status: 404, data: 'Not found' } };
}


export const financeApi = createApi({
    reducerPath: "financeApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BACKEND_URL,
        prepareHeaders: (headers) => {
            const token = Cookies.get('accessToken')
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
        }
    }),
    endpoints: (builder) => {
        return {
            finanaceTransactions: builder.query({
                query: () => ({
                    url: "/influencer/finance/finance-transaction",
                    method: "GET",
                })
            }),
            getBalance: builder.query({
                query: () => ({
                    url: "/influencer/finance/get-balance",
                    method: "GET",
                }),
                transformResponse: (response) => response.balance
            }),
            withdraw: builder.mutation({
                query: ({
                    amount,
                    sourceAccountNumber,
                    bank
                }) => ({
                    url: "/influencer/finance/withdraw",
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: {
                        amount,
                        sourceAccountNumber,
                        bank
                    }
                })
            }),
            deposit: builder.mutation({
                query: ({
                    amount,
                    sourceAccountNumber,
                    bank
                }) => ({
                    url: "/influencer/finance/deposit",
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: {
                        amount,
                        sourceAccountNumber,
                        bank
                    }
                })
            })

        }
    }
})

export const {
    useFinanaceTransactionsQuery,
    useGetBalanceQuery,
    useWithdrawMutation,
    useDepositMutation

} = financeApi