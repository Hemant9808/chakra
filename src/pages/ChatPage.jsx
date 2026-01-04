import React, { useRef, useState, useEffect } from "react";
import ChatBubble from "../components/Chat/ChatBubble";
import { sendGeminiMessage } from "../services/geminiService";
import { Send, Sparkles } from "lucide-react";

const TOPICS = [
  { label: "Health & Wellness", prompt: "I want to discuss about health and wellness." },
  { label: "Product Information", prompt: "I want to know about your products." },
  { label: "Order & Delivery", prompt: "I have questions about order and delivery." },
  { label: "General Inquiry", prompt: "I have a general question." },
];

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Namaste! How can I assist you on your wellness journey today?", type: "init" },
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
        { sender: "bot", text: "I apologize, but I am having trouble connecting right now. Please try again later." },
      ]);
    }
    setLoading(false);
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
        { sender: "bot", text: "I apologize, but I am having trouble connecting right now." },
      ]);
    }
    setLoading(false);
  };

  // Auto-scroll effect
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

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
    // Background: Cream
    <div className="flex flex-col h-screen bg-[#FDFBF7] relative overflow-hidden">

      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C17C3A]/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header Area (Visual only) */}
      <div className="bg-[#2A3B28] p-4 text-center shadow-md z-10">
        <h1 className="text-[#FDFBF7] font-serif font-bold text-lg flex items-center justify-center gap-2">
          <Sparkles size={16} className="text-[#C17C3A]" /> Ayucan Wellness Assistant
        </h1>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 z-0" style={{ paddingBottom: "100px" }}>
        {messages.map((msg, idx) => (
          <ChatBubble key={idx} sender={msg.sender} text={msg.text} />
        ))}

        {loading && (
          <div className="flex justify-start mb-4">
            <div className="bg-[#EADDCF] text-[#2A3B28] rounded-2xl rounded-tl-none py-3 px-4 shadow-sm animate-pulse">
              Thinking...
            </div>
          </div>
        )}

        <div ref={chatEndRef} />

        {!topicSelected && (
          <div className="mt-8">
            <p className="text-center text-[#715036]/60 text-sm mb-4 font-bold uppercase tracking-wider">Suggested Topics</p>
            <div className="flex flex-wrap justify-center gap-3">
              {TOPICS.map((topic) => (
                <button
                  key={topic.label}
                  className="bg-white border border-[#715036]/10 text-[#2A3B28] px-5 py-3 rounded-xl font-medium hover:bg-[#C17C3A] hover:text-white hover:border-[#C17C3A] transition-all duration-300 shadow-sm text-sm"
                  onClick={() => handleTopicSelect(topic)}
                  disabled={loading}
                >
                  {topic.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="absolute w-full bottom-0 bg-[#2A3B28] p-4 pb-6 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-20">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <input
            className="flex-1 bg-[#FDFBF7]/10 text-[#FDFBF7] placeholder-[#FDFBF7]/40 border border-[#FDFBF7]/20 rounded-full px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#C17C3A] focus:bg-[#FDFBF7]/20 transition-all backdrop-blur-sm"
            type="text"
            placeholder={topicSelected ? "Ask a follow-up question..." : "Select a topic above to start..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={loading || !topicSelected}
          />
          <button
            onClick={handleSend}
            className={`p-4 rounded-full transition-all duration-300 shadow-lg ${loading || !input.trim() || !topicSelected
                ? "bg-[#715036]/50 text-white/50 cursor-not-allowed"
                : "bg-[#C17C3A] text-white hover:bg-white hover:text-[#C17C3A] transform hover:scale-105"
              }`}
            disabled={loading || !input.trim() || !topicSelected}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;