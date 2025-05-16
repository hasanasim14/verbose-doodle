"use client";

import type React from "react";
import { ArrowUp, Clock } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Message() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionid, setSessionid] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Save cursor position
  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;

    const userQuery = message.trim();
    setMessages((prev) => [...prev, { role: "user", content: userQuery }]);
    setMessage("");
    setIsLoading(true);

    const timeout = 30 * 1000;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const res = await fetch("/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: userQuery,
          sessionid: sessionid,
        }),
        signal: controller.signal,
      });

      if (!res.ok) throw new Error(`API responded with status: ${res.status}`);

      const data = await res.json();

      if (data.data?.sessionID) {
        setSessionid(data.data.sessionID);
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

      {/* Chat area*/}
      <div className="flex-1 overflow-y-auto bg-white">
        <div className="p-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-600 my-8">
              <p className="text-s">
                Ask us anything. We&apos;re here to help :)
              </p>
            </div>
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
      <div className="px-4 pt-2 border-t bg-white">
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
              onClick={sendMessage}
              disabled={isLoading || !message.trim()}
              className="ml-2 bg-gray-200 rounded-full p-2 hover:bg-gray-300 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <Clock className="h-5 w-5 text-gray-500" />
              ) : (
                <ArrowUp className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
