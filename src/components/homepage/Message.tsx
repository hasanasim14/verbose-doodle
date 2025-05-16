"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { setTempSessionID, getTempSessionID } from "@/lib/tempStore";
import { ArrowUp, Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";
import HomePage from "./Home";
// import HomePage from "./home-page";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Message({
  onUrlDetected,
}: {
  onUrlDetected: (url: string) => void;
}) {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showHomePage, setShowHomePage] = useState(true);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prevMessagesLength = useRef(0);

  const fetchExistingMessages = async (sessionId: string) => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/chatHistory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sessionid: sessionId }),
        }
      );

      if (!res.ok) throw new Error("API Not working");

      const data = await res.json();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const transformedMessages = data.map((msg: any) => ({
        role: msg.type === "user" ? "user" : "assistant",
        content: msg.content,
      }));

      if (transformedMessages.length > 0) {
        setShowHomePage(false);
      }

      setMessages(transformedMessages);
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    const sessionId = getTempSessionID();
    if (sessionId) {
      fetchExistingMessages(sessionId);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

    if (messages.length > prevMessagesLength.current) {
      const newMessages = messages.slice(prevMessagesLength.current);
      newMessages.forEach((msg) => {
        if (msg.role === "assistant") {
          const urlRegex =
            /(?:https?:\/\/[^\s]+)|(?:\[([^\]]+)\]$$(https?:\/\/[^\s)]+)$$)/g;
          let match;

          while ((match = urlRegex.exec(msg.content)) !== null) {
            const url = match[2] || match[0];
            if (url && onUrlDetected) {
              onUrlDetected(url);
            }
          }
        }
      });
    }

    // Update the previous messages length
    prevMessagesLength.current = messages.length;
  }, [messages, onUrlDetected]);

  // Save cursor position
  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  const sendMessage = async (customMessage?: string) => {
    const userQuery = customMessage || message.trim();

    if (!userQuery || isLoading) return;

    setShowHomePage(false);
    setMessages((prev) => [...prev, { role: "user", content: userQuery }]);
    setMessage("");
    setIsLoading(true);

    const timeout = 30 * 1000;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: userQuery,
          sessionid: getTempSessionID(),
        }),
        signal: controller.signal,
      });

      if (!res.ok) throw new Error(`API responded with status: ${res.status}`);

      const data = await res.json();

      if (data.data?.sessionID) {
        setTempSessionID(data?.data?.sessionID);
      }

      // Add assistant response to chat
      const assistantMessage =
        data.data?.Message || "I couldn't process that request.";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: assistantMessage },
      ]);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("API Error:", error);
        const errorMessage =
          error.name === "AbortError"
            ? "Sorry, the chat API took too long to respond. Please try again later."
            : "Sorry, there was an error processing your request. Please try again at a later time";

        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: errorMessage },
        ]);
      }
    } finally {
      clearTimeout(timeoutId);
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleCardClick = (content: string) => {
    sendMessage(content);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center p-4 border-b bg-white">
        <div className="flex items-center">
          <div>
            <h2 className="font-bold text-xl">M&P Support</h2>
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto bg-white">
        <div className="p-4">
          {showHomePage && messages.length === 0 ? (
            <HomePage onCardClick={handleCardClick} />
          ) : (
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg px-4 py-2 ${
                      msg.role === "user"
                        ? "bg-[#f46117] text-white text-sm"
                        : "bg-gray-200 text-gray-800 text-sm"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    ) : (
                      <div className="whitespace-pre-wrap">
                        <ReactMarkdown
                          components={{
                            /* eslint-disable @typescript-eslint/no-unused-vars */
                            a: ({ node, ...props }) => (
                              <a
                                className="text-blue-600 underline hover:text-blue-800"
                                target="_blank"
                                rel="noopener noreferrer"
                                {...props}
                              />
                            ),
                            /* eslint-disable @typescript-eslint/no-unused-vars */
                            pre: ({ node, ...props }) => (
                              <pre
                                className="bg-gray-100 p-2 rounded my-2 overflow-x-auto"
                                {...props}
                              />
                            ),
                            /* eslint-disable @typescript-eslint/no-unused-vars */
                            code: ({ node, ...props }) => (
                              <code
                                className="bg-gray-100 rounded px-1 py-0.5"
                                {...props}
                              />
                            ),
                            /* eslint-disable @typescript-eslint/no-unused-vars */
                            strong: ({ node, ...props }) => (
                              <strong className="font-bold" {...props} />
                            ),
                            /* eslint-disable @typescript-eslint/no-unused-vars */
                            em: ({ node, ...props }) => (
                              <em className="italic" {...props} />
                            ),
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-200 text-gray-800 rounded-lg px-4 py-2">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
                      <div
                        className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Message input */}
      <div className="px-4 py-3 border-t bg-white">
        <div className="bg-gray-100 rounded-3xl p-2 border border-gray-300">
          <div className="flex items-center">
            <Textarea
              ref={inputRef}
              placeholder="Message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border-none bg-transparent resize-none px-2 py-1 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none shadow-none flex-1 min-h-[20px] max-h-[80px] text-sm"
              style={{ border: "none", outline: "none", boxShadow: "none" }}
              disabled={isLoading}
            />
            <button
              onClick={() => sendMessage()}
              disabled={isLoading || !message.trim()}
              className={`ml-2 rounded-full p-2 cursor-pointer disabled:opacity-50 ${
                message.trim()
                  ? "bg-[#f46117] hover:bg-[#e05615]"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {isLoading ? (
                <Clock
                  className={`h-5 w-5 ${
                    message.trim() ? "text-white" : "text-gray-500"
                  }`}
                />
              ) : (
                <ArrowUp
                  className={`h-5 w-5 ${
                    message.trim() ? "text-white" : "text-gray-500"
                  }`}
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
