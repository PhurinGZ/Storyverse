"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, ChevronRight, ChevronLeft, Copy, PlusCircle } from "lucide-react"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
}

interface AIChatPanelProps {
  autoContinue: boolean
  selectedText: string
  isOpen: boolean
  onToggle: () => void
  onInsertText?: (text: string) => void
}

const suggestionButtons = [
  { text: "แก้ไขย่อหน้า", icon: "✏️", prompt: "กรุณาช่วยปรับปรุงย่อหน้านี้ให้ดีขึ้น" },
  { text: "แนะนำพลิกโครงเรื่อง", icon: "🌟", prompt: "ช่วยแนะนำการพลิกโครงเรื่องที่น่าสนใจสำหรับเรื่องนี้ได้ไหม?" },
  { text: "บรรยายสถานที่", icon: "🏛️", prompt: "ช่วยเพิ่มรายละเอียดการบรรยายสถานที่ในฉากนี้" },
  { text: "เพิ่มบทสนทนา", icon: "💬", prompt: "ช่วยเพิ่มบทสนทนาในฉากนี้ได้ไหม?" },
  { text: "แรงจูงใจตัวละคร", icon: "🎭", prompt: "ช่วยพัฒนาแรงจูงใจของตัวละครตัวนี้" },
  { text: "เขียนต่อ", icon: "📝", prompt: "กรุณาเขียนต่อจากจุดที่ผมหยุดไว้" },
]

export function AIChatPanel({ autoContinue, selectedText, isOpen, onToggle, onInsertText }: AIChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "สวัสดีครับ! ผม StoryAI ผู้ช่วยเขียนเรื่องของคุณ ผมพร้อมช่วยคุณระดมความคิด ปรับปรุงการเขียน พัฒนาตัวละคร และเอาชนะปัญหาเขียนไม่ออก วันนี้คุณอยากให้ผมช่วยอะไรครับ?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async (message?: string) => {
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

    // Simulate AI response with different types of responses
    setTimeout(() => {
      const aiResponses = [
        "นี่เป็นทิศทางที่น่าสนใจมากสำหรับเรื่องของคุณ! นี่คือข้อเสนอแนะของผม:\n\nลองเพิ่มรายละเอียดทางประสาทสัมผัสเพื่อให้ผู้อ่านดื่มด่ำกับเรื่อง เช่น บรรยายเนื้อสัมผัสของหน้ากระดาษ อุณหภูมิของแสงที่เรืองแสง หรือเสียงที่เกิดขึ้นเมื่อสัมผัส\n\nคุณอาจต้องการสำรวจเรื่องราวลึกลับของผู้หญิงคนนั้น บางทีเธออาจเป็นผู้พิทักษ์หนังสือวิเศษ หรือเธออาจถูกขังอยู่ในร้านหนังสือมาหลายศตวรรษ รอคนที่เหมาะสมมาถึง",
        "ผมชอบบรรยากาศในตอนต้นมาก! หมอกและก้อนหินปูถนนสร้างอารมณ์ลึกลับได้สมบูรณ์แบบ นี่คือไอเดียที่จะช่วยเสริมฉากนี้:\n\n• เพิ่มความคิดในใจของซาร่าเพื่อแสดงสภาวะทางอารมณ์\n• บรรยายภายในร้านหนังสือให้ละเอียดกว่านี้ - อะไรทำให้วันนี้รู้สึกแตกต่าง?\n• พิจารณาการทำนายล่วงหน้า - บางทีซาร่าอาจสังเกตเห็นการเปลี่ยนแปลงเล็กๆ น้อยๆ อื่นที่บอกใบ้ถึงเวทมนตร์ที่จะมา\n\nคุณอยากให้ผมช่วยพัฒนาองค์ประกอบไหนต่อครับ?",
        "คำถามดีมาก! สำหรับฉากนี้ ผมแนะนำให้สร้างความตึงเครียดผ่านจังหวะและบทสนทนา:\n\n\"ซาร่าหยุดเดินหน้าประตูร้านหนังสือ มือสั่นขณะจับมือจับประตู เธอได้ยินเสียงกระซิบที่แปลกประหลาดดังมาจากข้างใน แต่เมื่อเธอเงี่ยหูฟัง เสียงนั้นกลับหายไป ด้านหลังกระจกร้าน เงาดำเคลื่อนไหวช้าๆ ราวกับมีใครกำลังรอเธออยู่\"\n\nนี่จะสร้างความระทึกใจตามธรรมชาติพร้อมพัฒนาตัวละคร คุณอยากให้ผมเขียนต่อไหมครับ?",
        "นี่คือข้อความที่ผมแนะนำให้เพิ่มเข้าไป:\n\nลมเซาผ่านใบไผ่แห้งที่หลังคาบ้านเก่า ส่งเสียงกรอบแกรบที่ฟังดูเหมือนใครกำลังกระซิบคำเตือน โทมัสหยุดเดิน หัวใจเต้นแรงขึ้น เขารู้ว่าความลับที่เขาเก็บงำมาตลอดหลายปีจะต้องถูกเปิดเผยในคืนนี้ ไม่ว่าผลที่ตามมาจะเป็นอย่างไร\n\nเขาหยิบโคมไฟเก่าแก่จากโต๊ะไม้ผุ แสงไฟน้ำเงินอ่อนๆ ลอยตัวขึ้นจากภายในแก้ว พลังงานเวทมนตร์โบราณที่เขาเก็บซ่อนมาตลอด",
      ]

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)]

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: randomResponse,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleSuggestionClick = (suggestion: (typeof suggestionButtons)[0]) => {
    let prompt = suggestion.prompt
    if (selectedText && suggestion.text.includes("แก้ไข")) {
      prompt += `:\n\n"${selectedText}"`
    }
    handleSendMessage(prompt)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  const handleInsertText = (text: string) => {
    if (onInsertText) {
      onInsertText(text)
    }
  }

  // Extract insertable text from AI responses (look for quoted text or specific patterns)
  const extractInsertableText = (content: string) => {
    // Look for quoted text between quotes
    const quotedMatch = content.match(/"([^"]+)"/g)
    if (quotedMatch) {
      return quotedMatch[0].replace(/"/g, '')
    }
    
    // Look for text after specific keywords like "นี่คือข้อความที่ผมแนะนำให้เพิ่มเข้าไป:"
    const insertTextMatch = content.match(/นี่คือข้อความที่.*?:\s*\n\n(.+?)(?=\n\n|$)/s)
    if (insertTextMatch) {
      return insertTextMatch[1].trim()
    }
    
    // If it's a short response (less than 200 chars), treat it as insertable
    if (content.length < 200 && !content.includes('?') && !content.includes('นี่คือ')) {
      return content.trim()
    }
    
    return null
  }

  // Toggle button that's always visible
  const ToggleButton = () => (
    <Button
      onClick={onToggle}
      variant="outline"
      size="sm"
      className={`fixed top-1/2 -translate-y-1/2 z-50 bg-white border border-stone-200 hover:bg-stone-50 shadow-md ${
        isOpen ? "right-80" : "right-4"
      } transition-all duration-300`}
    >
      {isOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
    </Button>
  )

  return (
    <>
      <ToggleButton />
      <div
        className={`fixed right-0 top-0 h-full bg-stone-50 shadow-lg transition-all duration-300 z-40 ${
          isOpen ? "w-80 translate-x-0" : "w-80 translate-x-full"
        }`}
      >
        {/* Chat Header */}
        <div className="p-4 border-b border-stone-200 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Bot className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-stone-900">StoryAI Assistant</h3>
                <p className="text-sm text-stone-600">ผู้ช่วยเขียนเรื่องของคุณ</p>
              </div>
            </div>
            <Button
              onClick={onToggle}
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Chat Messages */}
        <ScrollArea className="flex-1 p-4 h-[calc(100vh-280px)]" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] ${message.type === "user" ? "order-2" : "order-1"}`}>
                  <div className="flex items-center gap-2 mb-1">
                    {message.type === "ai" ? (
                      <Bot className="h-4 w-4 text-blue-600" />
                    ) : (
                      <User className="h-4 w-4 text-stone-600" />
                    )}
                    <span className="text-sm font-medium text-stone-700">
                      {message.type === "ai" ? "StoryAI" : "คุณ"}
                    </span>
                    <span className="text-xs text-stone-500">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      message.type === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-white border border-stone-200 text-stone-800"
                    }`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    
                    {/* Action buttons for AI messages */}
                    {message.type === "ai" && (
                      <div className="flex gap-2 mt-3 pt-2 border-t border-stone-100">
                        <Button
                          onClick={() => handleCopyText(message.content)}
                          size="sm"
                          variant="ghost"
                          className="h-7 px-2 text-xs text-stone-600 hover:text-stone-800"
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          คัดลอก
                        </Button>
                        
                        {/* Show insert button if there's insertable text */}
                        {extractInsertableText(message.content) && (
                          <Button
                            onClick={() => {
                              const insertableText = extractInsertableText(message.content)
                              if (insertableText) {
                                handleInsertText(insertableText)
                              }
                            }}
                            size="sm"
                            variant="ghost"
                            className="h-7 px-2 text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                          >
                            <PlusCircle className="h-3 w-3 mr-1" />
                            แทรกลงเนื้อหา
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[85%]">
                  <div className="flex items-center gap-2 mb-1">
                    <Bot className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-stone-700">StoryAI</span>
                  </div>
                  <div className="bg-white border border-stone-200 rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-stone-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-2 h-2 bg-stone-400 rounded-full animate-bounce"
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
        <div className="p-4 border-t border-stone-200 bg-white">
          <div className="mb-3">
            <p className="text-sm font-medium text-stone-700 mb-2">คำแนะนำด่วน:</p>
            <div className="grid grid-cols-2 gap-2">
              {suggestionButtons.slice(0, 4).map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="justify-start gap-2 h-auto py-2 px-3 text-left bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-700"
                >
                  <span>{suggestion.icon}</span>
                  <span className="text-xs">{suggestion.text}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="ขอความช่วยเหลือจาก StoryAI สำหรับการเขียนของคุณ..."
              className="flex-1 bg-stone-50 border-stone-200 focus:border-blue-500 focus:ring-blue-500"
            />
            <Button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isTyping}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}