"use client"

import { useState } from "react"
import { WritingHeader } from "@/components/writing-header"
import { TextEditor } from "@/components/text-editor"
import { AIChatPanel } from "@/components/ai-chat-panel"

export default function AIWriterPage() {
  const [content, setContent] = useState(`# Chapter 1: The Awakening

The morning mist clung to the cobblestone streets of Elderbrook like a whispered secret. Sarah pulled her coat tighter as she walked toward the old bookshop, her footsteps echoing in the quiet dawn. She had no idea that this ordinary Tuesday would change everything.

The brass bell above the door chimed as she entered, and the familiar scent of aged paper and leather bindings welcomed her. But something was different today. A book she'd never seen before sat open on the counter, its pages glowing with a soft, ethereal light.

"Curious, isn't it?" came a voice from the shadows.

Sarah spun around to find an elderly woman emerging from between the towering shelves. Her eyes held the depth of centuries, and when she smiled, Sarah felt as though she was looking at someone who had witnessed the birth of stories themselves.

"I've been waiting for you, dear," the woman continued, her voice like rustling parchment. "The book has been waiting too."`)

  const [writingMode, setWritingMode] = useState<"solo" | "ai">("ai")
  const [autoContinue, setAutoContinue] = useState(false)

  return (
    <div className="h-screen bg-stone-50 flex flex-col">
      <WritingHeader
        projectName="The Enchanted Bookshop"
        writingMode={writingMode}
        onModeChange={setWritingMode}
        autoContinue={autoContinue}
        onAutoContinueChange={setAutoContinue}
      />

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col">
          <TextEditor content={content} onChange={setContent} />
        </div>

        {writingMode === "ai" && (
          <div className="w-96 border-l border-stone-200">
            <AIChatPanel autoContinue={autoContinue} selectedText="" />
          </div>
        )}
      </div>
    </div>
  )
}
