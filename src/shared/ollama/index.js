import ollama from 'ollama'

export const ollamaGenerateContent = async (contentTitle) => {
    const response = await ollama.chat({
        model: 'phi3.5',
        messages: [
            { role: 'user', content: `ฉันเป็น influencer ฉันต้องเขียนโพสต์ลง social` },
            { role: 'user', content: `ช่วยเขียน content เกี่ยวกับเรื่อง ${contentTitle} เป็นภาษาไทยให้ที` }
        ],
    })
    return response
}