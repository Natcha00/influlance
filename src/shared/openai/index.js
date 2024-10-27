import OpenAI from 'openai';

const client = new OpenAI({
    baseURL: "http://localhost:11434/v1", 
    apiKey: "NO_NEED_URL", 
    dangerouslyAllowBrowser: true,
    
});

export const openAiGenerateContent = async (contentTitle) => {
    const chatCompletion = await client.chat.completions.create({
        messages: [{ role: 'user', content: `ช่วยเขียน content เกี่ยวกับเรื่อง ${contentTitle} เป็นภาษาไทยให้ที` }],
        model: 'phi3.5',
    });

    return chatCompletion.choices[0].message.content;
}
