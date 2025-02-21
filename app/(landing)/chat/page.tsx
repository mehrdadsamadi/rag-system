"use client";
import {useEffect, useState} from "react";

export default function Chat() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<string[]>([]);
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:4000/chat");

        ws.onopen = () => console.log("Connected to WebSocket");
        ws.onmessage = (event) => {
            setMessages((prev) => [...prev, `🤖: ${event.data}`]);
        };
        ws.onclose = () => console.log("WebSocket closed");

        setSocket(ws);

        return () => ws.close();
    }, []);

    const sendMessage = () => {
        if (!socket || !message.trim()) return;
        socket.send(message);
        setMessages((prev) => [...prev, `🧑: ${message}`]);
        setMessage("");
    };

    return (
        <div className="flex flex-col items-center p-6 w-full max-w-md mx-auto">
            <div className="w-full h-80 border p-2 overflow-y-auto bg-gray-100 text-black">
                {messages.map((msg, i) => (
                    <div key={i} className="p-1">
                        {msg}
                    </div>
                ))}
            </div>
            <div className="flex w-full mt-4">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    className="flex-1 p-2 border text-black"
                    placeholder="سوال خود را بپرسید..."
                />
                <button onClick={sendMessage} className="ml-2 p-2 bg-blue-500 text-white rounded-lg">
                    ارسال
                </button>
            </div>
        </div>
    );
}