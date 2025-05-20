import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDG-ruNPHBmXaV0Pc2n8uL8UmrY0ytghxs");

export async function sendGeminiMessage(prompt, history = []) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Convert history to proper format
    const formattedHistory = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.parts[0].text || msg.parts[0] }] // Handle both string and object parts
    }));

    const chat = model.startChat({
      history: formattedHistory,
    });

    const result = await chat.sendMessage(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}


