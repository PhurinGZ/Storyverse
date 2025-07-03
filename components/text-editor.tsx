"use client"

import { useEffect, useRef } from "react"

interface TextEditorProps {
  content: string
  onChange: (content: string) => void
}

export function TextEditor({ content, onChange }: TextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"
    }
  }, [content])

  return (
    <div className="flex-1 bg-white">
      <div className="h-full p-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Start writing your story..."
            className="w-full min-h-[calc(100vh-200px)] resize-none border-none outline-none text-stone-800 text-lg leading-relaxed font-serif placeholder:text-stone-400 bg-transparent"
            style={{
              fontFamily: '"Crimson Text", "Georgia", "Times New Roman", serif',
              lineHeight: "1.8",
              fontSize: "18px",
            }}
          />
        </div>
      </div>
    </div>
  )
}
