import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});
const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

export async function geminiGenerateContent(topic) {
    const chatSession = model.startChat({
        generationConfig,
        history: [
        ],
    });

    const result = await chatSession.sendMessage(`ฉันเป็นอินฟลูเอนเซอร์ ฉันต้องการเขียนเนื้อหาเกี่ยวกับเรื่อง ${topic} ให้ที ขอแบบกระชับที่สุด`);

    return result.response.text()
}


