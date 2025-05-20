// 

import { formatResponse } from "../../services/formatResponse";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDG-ruNPHBmXaV0Pc2n8uL8UmrY0ytghxs");

export async function* streamGeminiMessage(prompt, history = []) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const formattedHistory = history.map(msg => ({
    role: msg.role,
    parts: [{ text: msg.parts[0].text || msg.parts[0] }]
  }));

  const chat = model.startChat({ history: formattedHistory });

  const stream = await chat.sendMessageStream(prompt);

  for await (const chunk of stream.stream) {
    yield chunk.text();
  }
}

const ChatBubble = ({ sender, text }) => {
  return (
    <div className={`flex mb-4 ${sender === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-3/4 rounded-lg px-4 py-2 ${
          sender === "user"
            ? "bg-[#66cc1d] text-white rounded-br-none"
            : "bg-gray-100 text-gray-800 rounded-bl-none"
        }`}
      >
        {sender === "bot" ? (
          <div className="">
            {formatResponse(text)}
          </div>
        ) : (
          <div className="whitespace-pre-wrap">{text}</div>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;