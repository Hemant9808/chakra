import React, { useRef, useState } from "react";
import ChatBubble from "../components/Chat/ChatBubble";
import { sendGeminiMessage } from "../services/geminiService";

const TOPICS = [
  { label: "Health & Wellness", prompt: "I want to discuss about health and wellness." },
  { label: "Product Information", prompt: "I want to know about your products." },
  { label: "Order & Delivery", prompt: "I have questions about order and delivery." },
  { label: "General Inquiry", prompt: "I have a general question." },
];

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "What you want to discuss with me?", type: "init" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [context, setContext] = useState([]); // for Gemini context
  const [topicSelected, setTopicSelected] = useState(false);
  const chatEndRef = useRef(null);

  const handleTopicSelect = async (topic) => {
    setTopicSelected(true);
    setMessages((msgs) => [
      ...msgs,
      { sender: "user", text: topic.label },
    ]);
    setLoading(true);
    
    try {
      // Send the initial prompt directly
      const geminiReply = await sendGeminiMessage(topic.prompt);
      
      setMessages((msgs) => [
        ...msgs,
        { sender: "bot", text: geminiReply },
      ]);
      
      // Initialize context with both messages
      setContext([
        { role: "user", parts: [{ text: topic.prompt }] },
        { role: "model", parts: [{ text: geminiReply }] }
      ]);
    } catch (e) {
      console.error(e);
      setMessages((msgs) => [
        ...msgs,
        { sender: "bot", text: "Sorry, something went wrong." },
      ]);
    }
    setLoading(false);
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { sender: "user", text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);
    
    try {
      const geminiReply = await sendGeminiMessage(input, context);
      
      setMessages((msgs) => [
        ...msgs,
        { sender: "bot", text: geminiReply },
      ]);
      
      // Update context with both messages
      setContext((ctx) => [
        ...ctx,
        { role: "user", parts: [{ text: input }] },
        { role: "model", parts: [{ text: geminiReply }] }
      ]);
    } catch (e) {
      console.error(e);
      setMessages((msgs) => [
        ...msgs,
        { sender: "bot", text: "Sorry, something went wrong." },
      ]);
    }
    setLoading(false);
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  // const handleTopicSelect = async (topic) => {
  //   setTopicSelected(true);
  //   setMessages((msgs) => [
  //     ...msgs,
  //     { sender: "user", text: topic.label },
  //   ]);
  //   setLoading(true);
  //   // Set system context for Gemini
  //   const systemMsg = {
  //     role: "user",
  //     parts: [topic.prompt],
  //   };
  //   setContext([systemMsg]);
  //   try {
  //     const geminiReply = await sendGeminiMessage(topic.prompt, []);
  //     setMessages((msgs) => [
  //       ...msgs,
  //       { sender: "bot", text: geminiReply },
  //     ]);
  //   } catch (e) {
  //     setMessages((msgs) => [
  //       ...msgs,
  //       { sender: "bot", text: "Sorry, something went wrong." },
  //     ]);
  //   }
  //   setLoading(false);
  //   setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  // };

  // const handleSend = async () => {
  //   if (!input.trim() || loading) return;
  //   const userMsg = { sender: "user", text: input };
  //   setMessages((msgs) => [...msgs, userMsg]);
  //   setInput("");
  //   setLoading(true);
  //   try {
  //     const geminiReply = await sendGeminiMessage(input, context);
  //     setMessages((msgs) => [
  //       ...msgs,
  //       { sender: "bot", text: geminiReply },
  //     ]);
  //     setContext((ctx) => [
  //       ...ctx,
  //       { role: "user", parts: [input] },
  //       { role: "model", parts: [geminiReply] },
  //     ]);
  //   } catch (e) {
  //     setMessages((msgs) => [
  //       ...msgs,
  //       { sender: "bot", text: "Sorry, something went wrong." },
  //     ]);
  //   }
  //   setLoading(false);
  //   setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  // };

  return (
    <div className="flex flex-col bg-white">
      <div className="flex-1 overflow-y-auto px-4 py-6 " style={{ maxHeight: "80vh" }}>
        {messages.map((msg, idx) => (
          <ChatBubble key={idx} sender={msg.sender} text={msg.text} />
        ))}
        {loading && <ChatBubble sender="bot" text="..." />}
        <div ref={chatEndRef} />
        {!topicSelected && (
          <div className="flex flex-wrap gap-3 mt-4">
            {TOPICS.map((topic) => (
              <button
                key={topic.label}
                className="bg-[#e5dac3] text-black px-4 py-2 rounded-full font-semibold hover:bg-[#d4c0a8] transition-colors duration-200 shadow"
                onClick={() => handleTopicSelect(topic)}
                disabled={loading}
              >
                {topic.label}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className=" rounded-t-4xl pb-6 absolute w-full bottom-0 px-4 py-3 bg-[#e8f2ee] flex items-center">
        <input
          className="flex-1 shadow-lg border border-white shadow-top rounded-full px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-[#66cc1d]"
          type="text"
          placeholder="Message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          disabled={loading || !topicSelected}
        />
        <button
          onClick={handleSend}
          className="bg-[#66cc1d] text-white px-5 py-2 rounded-full font-semibold hover:bg-[#4fa30f] transition-colors duration-300"
          disabled={loading || !input.trim() || !topicSelected}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage; 

