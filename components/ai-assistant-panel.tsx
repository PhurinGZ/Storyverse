"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Bot, User, Send, RotateCcw, Plus, Sparkles, Edit, Users, Zap } from "lucide-react"
import type { AIMode } from "@/components/writing-interface"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
  canInsert?: boolean
}

interface AIAssistantPanelProps {
  currentContent: string
  selectedText: string
  onInsertText: (text: string) => void
  aiMode: AIMode
}

const suggestionButtons = [
  {
    id: "next-paragraph",
    label: "Suggest next paragraph",
    icon: Sparkles,
    prompt: "Based on the current story, suggest what should happen in the next paragraph",
  },
  {
    id: "fix-sentence",
    label: "Fix this sentence",
    icon: Edit,
    prompt: "Help me improve the writing quality of the selected text",
  },
  {
    id: "describe-character",
    label: "Describe character",
    icon: Users,
    prompt: "Help me add more descriptive details about a character in this scene",
  },
  {
    id: "plot-twist",
    label: "Plot twist",
    icon: Zap,
    prompt: "Suggest an interesting plot twist that could happen at this point in the story",
  },
]

export function AIAssistantPanel({ currentContent, selectedText, onInsertText, aiMode }: AIAssistantPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: `Hello! I'm your AI writing companion. I'm currently in ${aiMode} mode.\n\nI can help you:\n• Continue your story\n• Improve your prose\n• Develop characters\n• Suggest plot developments\n\nHow can I assist you with your writing today?`,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputValue.trim()
    if (!text) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: text,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        {
          content: `Here's a suggestion for continuing your story:\n\n"These were the letters from Captain Morrison's daughter, the ones that had arrived every month for years after her father's ship had vanished in the storm. Thomas had never sent them back. He couldn't bring himself to tell her the truth—that her father's ship hadn't been lost to the storm, but to Thomas's own moment of weakness."\n\nThis reveals Thomas's guilt and creates emotional depth. Would you like me to expand on this further?`,
          canInsert: true,
        },
        {
          content: `I notice you're working on a lighthouse keeper story with themes of secrets and guilt. Here are some suggestions:\n\n• Develop the backstory of the "terrible choice" Thomas made\n• Add sensory details about the lighthouse environment\n• Consider introducing the captain's daughter as a character\n• Explore Thomas's emotional state through his actions\n\nWhich direction interests you most?`,
          canInsert: false,
        },
        {
          content: `Based on your selected text, here's an improved version:\n\n"The wind shrieked through the ancient stone, its voice carrying the lament of thirty years' worth of secrets. Thomas's weathered hands trembled as he ascended the spiral staircase, each step a pilgrimage through decades of carefully buried guilt."\n\nThis version adds more atmospheric detail and emotional weight.`,
          canInsert: true,
        },
      ]

      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: randomResponse.content,
        timestamp: new Date(),
        canInsert: randomResponse.canInsert,
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleSuggestionClick = (suggestion: (typeof suggestionButtons)[0]) => {
    let prompt = suggestion.prompt
    if (selectedText && suggestion.id === "fix-sentence") {
      prompt += `:\n\n"${selectedText}"`
    }
    handleSendMessage(prompt)
  }

  const handleRegenerateResponse = (messageId: string) => {
    // Remove the message and regenerate
    setMessages((prev) => prev.filter((msg) => msg.id !== messageId))
    setIsTyping(true)

    setTimeout(() => {
      const newResponse: Message = {
        id: Date.now().toString(),
        type: "ai",
        content:
          "Here's an alternative suggestion:\n\nThe lighthouse stood like a sentinel against time itself, its weathered stones bearing witness to countless storms and secrets. Thomas felt the weight of three decades pressing down on him as he climbed toward his final reckoning.\n\nThis version emphasizes the passage of time and builds toward a climactic moment.",
        timestamp: new Date(),
        canInsert: true,
      }
      setMessages((prev) => [...prev, newResponse])
      setIsTyping(false)
    }, 1200)
  }

  return (
    <div className="h-full flex flex-col bg-white border-l border-stone-200">
      {/* Header */}
      <div className="p-4 border-b border-stone-200 bg-stone-50">
        <div className="flex items-center gap-2 mb-2">
          <Bot className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-stone-900">AI Writing Assistant</h3>
        </div>
        <p className="text-sm text-stone-600">Collaborate with AI to enhance your storytelling</p>
      </div>

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id}>
              <div className={`flex ${message.type === "user" ? "justify-end" : "justify-start"} mb-2`}>
                <div className={`max-w-[85%] ${message.type === "user" ? "order-2" : "order-1"}`}>
                  <div className="flex items-center gap-2 mb-1">
                    {message.type === "ai" ? (
                      <Bot className="h-3 w-3 text-blue-600" />
                    ) : (
                      <User className="h-3 w-3 text-stone-600" />
                    )}
                    <span className="text-xs font-medium text-stone-700">
                      {message.type === "ai" ? "AI Assistant" : "You"}
                    </span>
                    <span className="text-xs text-stone-500">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <div
                    className={`rounded-xl px-3 py-2 ${
                      message.type === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-stone-100 border border-stone-200 text-stone-800"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  </div>
                </div>
              </div>

              {/* AI Message Actions */}
              {message.type === "ai" && (
                <div className="flex items-center gap-2 ml-6 mb-4">
                  {message.canInsert && (
                    <Button
                      onClick={() => {
                        // Extract insertable text (usually after quotes or specific formatting)
                        const match = message.content.match(/"([^"]+)"/g)
                        if (match) {
                          const textToInsert = match[0].replace(/"/g, "")
                          onInsertText(textToInsert)
                        } else {
                          // If no quotes, try to extract paragraph after colon
                          const lines = message.content.split("\n")
                          const insertableLine = lines.find((line) => line.trim() && !line.includes("Here's"))
                          if (insertableLine) {
                            onInsertText(insertableLine.trim())
                          }
                        }
                      }}
                      size="sm"
                      className="gap-1 h-7 text-xs bg-blue-600 hover:bg-blue-700"
                    >
                      <Plus className="h-3 w-3" />
                      Insert to story
                    </Button>
                  )}
                  <Button
                    onClick={() => handleRegenerateResponse(message.id)}
                    variant="outline"
                    size="sm"
                    className="gap-1 h-7 text-xs"
                  >
                    <RotateCcw className="h-3 w-3" />
                    Regenerate
                  </Button>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[85%]">
                <div className="flex items-center gap-2 mb-1">
                  <Bot className="h-3 w-3 text-blue-600" />
                  <span className="text-xs font-medium text-stone-700">AI Assistant</span>
                </div>
                <div className="bg-stone-100 border border-stone-200 rounded-xl px-3 py-2">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" />
                    <div
                      className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Suggestion Buttons */}
      <div className="p-4 border-t border-stone-200 bg-stone-50">
        <div className="grid grid-cols-2 gap-2 mb-3">
          {suggestionButtons.map((suggestion) => {
            const Icon = suggestion.icon
            return (
              <Button
                key={suggestion.id}
                variant="outline"
                size="sm"
                onClick={() => handleSuggestionClick(suggestion)}
                className="justify-start gap-2 h-auto py-2 text-xs bg-white hover:bg-stone-50 text-stone-700"
              >
                <Icon className="h-3 w-3" />
                <span className="truncate">{suggestion.label}</span>
              </Button>
            )
          })}
        </div>

        <Separator className="my-3" />

        {/* Message Input */}
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
            placeholder="Ask for writing help..."
            className="flex-1 text-sm bg-white"
          />
          <Button
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isTyping}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  )
}
