export const transactions = [
    {
        transactionId: 1,
        amount: 500,
        balance: 500,
        transactionType: 'deposit',
        sourceAccountId: 1,
        destinationAccountId: null,
        createDate: "2024-10-19 13:53",
        status: "approve",
        remark: "ฝากเงิน จาก Bangkok Bank เลขบัญชี 123456789"
    },
    {
        transactionId: 2,
        amount: 1000,
        balance: 1500,
        transactionType: 'deposit',
        sourceAccountId: 1,
        destinationAccountId: null,
        createDate: "2024-10-19 13:54",
        status: "approve",
        remark: "ฝากเงิน จาก Bangkok Bank เลขบัญชี 123456789"
    },
    {
        transactionId: 3,
        amount: -500,
        balance: 1000,
        transactionType: 'withdraw',
        sourceAccountId: 1,
        destinationAccountId: null,
        createDate: "2024-10-19 13:55",
        status: "approve",
        remark: "ถอนเงิน ไปยัง Bangkok Bank เลขบัญชี 123456789"
    },
    {
        transactionId: 4,
        amount: -200,
        balance: 800,
        transactionType: 'transfer',
        sourceAccountId: 1,
        destinationAccountId: 2,
        createDate: "2024-10-19 13:56",
        status: "approve",
        remark: "โอนเงิน จาก Bangkok Bank เลขบัญชี 123456789 ไปยัง Siam Commercial Bank เลขบัญชี 987654321"
    },
    {
        transactionId: 5,
        amount: 500,
        balance: 1300,
        transactionType: 'received',
        sourceAccountId: 1,
        destinationAccountId: 2,
        createDate: "2024-10-19 13:57",
        status: "approve",
        remark: "รับเงินโอน จาก Siam Commercial Bank เลขบัญชี 987654321 เข้า Bangkok Bank เลขบัญชี 123456789"
    },
]