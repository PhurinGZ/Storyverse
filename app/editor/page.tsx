"use client"

import { useState } from "react"
import { EditorTopBar } from "@/components/editor-top-bar"
import { WritingEditor } from "@/components/writing-editor"
import { AIChatPanel } from "@/components/ai-chat-panel"
import { EditorToolbar } from "@/components/editor-toolbar"

export default function EditorPage() {
  const [content, setContent] = useState(`# Chapter 1: The Beginning

The old lighthouse stood silently against the stormy sky, its beacon long extinguished. Sarah approached the weathered door, her heart pounding with anticipation and fear.

She had traveled across the country to reach this place, following clues left by her grandmother in a letter that arrived mysteriously after her death. The letter spoke of secrets hidden within these walls, of a family legacy that had been buried for generations.

As she pushed open the heavy wooden door, it creaked ominously on its hinges. The interior was shrouded in darkness, save for the pale moonlight filtering through the salt-stained windows...`)

  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">("saved")
  const [isChatOpen, setIsChatOpen] = useState(true)
  const [wordCount, setWordCount] = useState(0)
  const [autoSave, setAutoSave] = useState(true)

  const handleContentChange = (newContent: string) => {
    setContent(newContent)
    setSaveStatus("unsaved")

    // Calculate word count
    const words = newContent
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0)
    setWordCount(words.length)

    // Simulate auto-save
    if (autoSave) {
      setSaveStatus("saving")
      setTimeout(() => setSaveStatus("saved"), 1000)
    }
  }

  return (
    <div className="h-screen flex flex-col bg-white">
      <EditorTopBar projectTitle="The Midnight Chronicles" saveStatus={saveStatus} />

      <div className="flex-1 flex overflow-hidden">
        <div className={`flex-1 flex flex-col transition-all duration-300 ${isChatOpen ? "mr-80" : "mr-0"}`}>
          <WritingEditor content={content} onChange={handleContentChange} />
          <EditorToolbar wordCount={wordCount} autoSave={autoSave} onAutoSaveToggle={setAutoSave} />
        </div>

        <AIChatPanel isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} selectedText="" />
      </div>
    </div>
  )
}
