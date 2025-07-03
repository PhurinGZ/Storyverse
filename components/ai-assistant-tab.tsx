"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, User, Send, Sparkles, Zap, MessageSquare } from "lucide-react"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
}

export function AIAssistantTab() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hello! I'm your AI writing assistant for Chronicles of Thalara. I can help you continue your story, suggest plot twists, improve dialogue, develop characters, and much more. What would you like to work on today?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const actionButtons = [
    { text: "Continue Story", icon: Sparkles, prompt: "Please continue writing from where I left off in the story" },
    { text: "Suggest Twist", icon: Zap, prompt: "Can you suggest an interesting plot twist for the current chapter?" },
    { text: "Fix Dialogue", icon: MessageSquare, prompt: "Help me improve the dialogue in this scene" },
  ]

  const handleSendMessage = (message?: string) => {
    const messageText = message || inputValue.trim()
    if (!messageText) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: messageText,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content:
          "Great question! For Chronicles of Thalara, I suggest building on the magical tension you've established. Here's what could happen next:\n\nAs Lyra enters the Council chamber, she notices the ley line crystals are pulsing erratically—something that hasn't happened in centuries. The eldest Council member reveals that the Convergence isn't just a magical event, but a test that will determine whether Thalara survives or falls into the void between worlds.\n\nThis creates immediate stakes and explains why Lyra's role is so crucial. Would you like me to help develop this scene further?",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 2000)
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 p-6 bg-gray-50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Bot className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">AI Writing Assistant</h2>
            <p className="text-gray-600">Your creative companion for Chronicles of Thalara</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] ${message.type === "user" ? "order-2" : "order-1"}`}>
                <div className="flex items-center gap-2 mb-2">
                  {message.type === "ai" ? (
                    <Bot className="h-4 w-4 text-blue-600" />
                  ) : (
                    <User className="h-4 w-4 text-gray-600" />
                  )}
                  <span className="text-sm font-medium text-gray-700">
                    {message.type === "ai" ? "AI Assistant" : "You"}
                  </span>
                  <span className="text-xs text-gray-500">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
                <div
                  className={`rounded-2xl px-6 py-4 ${
                    message.type === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 border border-gray-200 text-gray-800"
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[80%]">
                <div className="flex items-center gap-2 mb-2">
                  <Bot className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">AI Assistant</span>
                </div>
                <div className="bg-gray-100 border border-gray-200 rounded-2xl px-6 py-4">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Action Buttons and Input */}
      <div className="border-t border-gray-200 p-6 bg-gray-50">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Quick Action Buttons */}
          <div className="flex gap-3">
            {actionButtons.map((action, index) => {
              const Icon = action.icon
              return (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => handleSendMessage(action.prompt)}
                  className="gap-2 bg-white hover:bg-gray-50"
                >
                  <Icon className="h-4 w-4" />
                  {action.text}
                </Button>
              )
            })}
          </div>

          {/* Message Input */}
          <div className="flex gap-3">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Ask the AI for help with your story..."
              className="flex-1 bg-white"
            />
            <Button onClick={() => handleSendMessage()} disabled={!inputValue.trim() || isTyping}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
