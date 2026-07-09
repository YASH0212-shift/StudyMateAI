import { useState, useEffect, useRef } from "react";
import { chat } from "../services/api";
import ReactMarkdown from "react-markdown";
function ChatBox({ documentId }) {

    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const chatContainerRef = useRef(null);
    useEffect(() => {

    if (chatContainerRef.current) {

        chatContainerRef.current.scrollTop =
            chatContainerRef.current.scrollHeight;

    }

}, [messages, loading]);
    const handleSend = async () => {

        if (!question.trim()) return;

        const userQuestion = question;

       setMessages((prev) => [
    ...prev,
    {
        sender: "user",
        text: userQuestion,
    },
]);
        setQuestion("");

        setLoading(true);

        try {

            const response = await chat(
                userQuestion,
                documentId
            );

            setMessages((prev) => [
    ...prev,
    {
        sender: "ai",
        text: response.answer,
        pages: response.pages,
    },
]);

        } catch (error) {

            console.log(error);

            setMessages((prev) => [
                ...prev,
                {
                    sender: "ai",
                    text: "❌ Something went wrong.",
                },
            ]);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="bg-white rounded-2xl shadow-xl p-6">

            <h2 className="text-2xl font-bold mb-6">
                💬 Chat
            </h2>

            {/* Chat Area */}

            <div
    ref={chatContainerRef}
    className="space-y-4 h-[500px] overflow-y-auto border rounded-xl p-4 bg-gray-50"
>

                {messages.length === 0 && (

                    <div className="text-center text-gray-400 mt-20">

                        👋 Ask me anything from your uploaded PDF.

                    </div>

                )}

                {messages.map((msg, index) => (

                    <div
                        key={index}
                        className={`flex ${
                            msg.sender === "user"
                                ? "justify-end"
                                : "justify-start"
                        }`}
                    >

                        <div
                            className={`max-w-[75%] rounded-2xl px-5 py-3 shadow ${
                                msg.sender === "user"
                                    ? "bg-blue-600 text-white"
                                    : "bg-white"
                            }`}
                        >

                            <p className="font-semibold mb-1">

                                {msg.sender === "user"
                                    ? "👤 You"
                                    : "🤖 StudyMate AI"}

                            </p>

                            <div className="prose prose-sm max-w-none">
    <ReactMarkdown>
        {msg.text}
    </ReactMarkdown>
</div>
                          {msg.pages && (
    <div className="flex flex-wrap gap-2 mt-3">
        {msg.pages.map((page) => (
            <span
                key={page}
                className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full"
            >
                📄 Page {page}
            </span>
        ))}
    </div>
)}
                        </div>

                    </div>

                ))}

                {loading && (

                    <div className="flex justify-start">

                        <div className="bg-white rounded-2xl px-5 py-3 shadow animate-pulse">

                            🤖 StudyMate AI is thinking...

                        </div>

                    </div>

                )}

            </div>

            {/* Input */}

            <div className="flex gap-3 mt-6">

                <input

                    type="text"

                    value={question}

                    placeholder="Ask anything from your PDF..."

                    onChange={(e) => setQuestion(e.target.value)}

                    onKeyDown={(e) => {

                        if (e.key === "Enter") {

                            handleSend();

                        }

                    }}

                    className="flex-1 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"

                />

                <button

                    onClick={handleSend}

                    disabled={loading}

                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 rounded-xl"

                >

                    {loading ? "..." : "Send"}

                </button>

            </div>

        </div>

    );

}

export default ChatBox;