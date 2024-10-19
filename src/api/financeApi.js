import { createApi } from "@reduxjs/toolkit/query/react";
import { authenUsers, loginUsers } from "../shared/mockup/authenUser";
import Cookies from "js-cookie";
import { delay } from "../shared/utils/delay";
import { transactions } from "../shared/mockup/transaction";
import dayjs from 'dayjs'

const mockBaseQuery = async (arg) => {
    let transactionsStorage = localStorage.getItem('transactionsStorage')
    if (!transactionsStorage) {
        localStorage.setItem('transactionsStorage', JSON.stringify(transactions))
        transactionsStorage = transactions
    } else {
        transactionsStorage = JSON.parse(localStorage.getItem('transactionsStorage'))
    }

    if (arg.url == '/finance-transaction') {
        const token = Cookies.get('accessToken')
        if (!token) {
            return { error: { status: 401, data: "unauthorize" } }
        }
        const findToken = authenUsers.find(auth => auth.accessToken == token)
        const accountId = findToken.accountId

        const influTransactions = transactionsStorage.filter(t => t.sourceAccountId == accountId)
        await delay()

        influTransactions.sort((a, b) => b.transactionId - a.transactionId)

        return {
            data: influTransactions
        }
    } else if (arg.url == '/get-balance') {
        const token = Cookies.get('accessToken')
        if (!token) {
            return { error: { status: 401, data: "unauthorize" } }
        }
        const findToken = authenUsers.find(auth => auth.accessToken == token)
        const accountId = findToken.accountId
        const influTransactions = transactionsStorage.filter(t => t.sourceAccountId == accountId)
        influTransactions.sort((a, b) => b.transactionId - a.transactionId)

        return {
            data: influTransactions[0].balance
        }
    } else if (arg.url == '/deposit') {
        const token = Cookies.get('accessToken')
        if (!token) {
            return { error: { status: 401, data: "unauthorize" } }
        }
        const findToken = authenUsers.find(auth => auth.accessToken == token)
        const accountId = findToken.accountId

        const {
            amount,
            sourceAccountNumber,
            bank
        } = arg.body

        const influTransactions = transactionsStorage.filter(t => t.sourceAccountId == accountId)
        const balance = influTransactions[influTransactions.length - 1].balance
        const newInfluTransactions = [
            ...influTransactions,
            {
                transactionId: influTransactions.length + 1,
                amount: amount,
                balance: balance + amount,
                transactionType: 'deposit',
                sourceAccountId: accountId,
                destinationAccountId: null,
                createDate: dayjs().format('YYYY-MM-DD HH:mm'),
                status: "pending",
                remark: `ฝากเงิน จาก ${bank} เลขบัญชี ${sourceAccountNumber}`
            },
        ]

        localStorage.setItem('transactionsStorage', JSON.stringify(newInfluTransactions))
        return {
            data: "success"
        }
    } else if (arg.url == '/withdraw') {
        const token = Cookies.get('accessToken')
        if (!token) {
            return { error: { status: 401, data: "unauthorize" } }
        }
        const findToken = authenUsers.find(auth => auth.accessToken == token)
        const accountId = findToken.accountId

        const {
            amount,
            sourceAccountNumber,
            bank
        } = arg.body

        const influTransactions = transactionsStorage.filter(t => t.sourceAccountId == accountId)
        const balance = influTransactions[influTransactions.length - 1].balance
        const newInfluTransactions = [
            ...influTransactions,
            {
                transactionId: influTransactions.length + 1,
                amount: -amount,
                balance: balance - amount,
                transactionType: 'withdraw',
                sourceAccountId: accountId,
                destinationAccountId: null,
                createDate: dayjs().format('YYYY-MM-DD HH:mm'),
                status: "pending",
                remark: `ถอนเงิน ไปยัง ${bank} เลขบัญชี ${sourceAccountNumber}`
            },
        ]

        localStorage.setItem('transactionsStorage', JSON.stringify(newInfluTransactions))
        return {
            data: "success"
        }

    }
    return { error: { status: 404, data: 'Not found' } };
}


export const financeApi = createApi({
    reducerPath: "financeApi",
    baseQuery: mockBaseQuery,
    endpoints: (builder) => {
        return {
            finanaceTransactions: builder.query({
                query: () => ({
                    url: "/finance-transaction",
                    method: "GET",
                })
            }),
            getBalance: builder.query({
                query: () => ({
                    url: "/get-balance",
                    method: "GET",
                })
            }),
            deposit: builder.mutation({
                query: ({
                    amount,
                    sourceAccountNumber,
                    bank
                }) => ({
                    url: "/deposit",
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
            withdraw: builder.mutation({
                query: ({
                    amount,
                    sourceAccountNumber,
                    bank
                }) => ({
                    url: "/withdraw",
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
        }
    }
})

export const {
    useFinanaceTransactionsQuery,
    useGetBalanceQuery,
    useDepositMutation,
    useWithdrawMutation
} = financeApi