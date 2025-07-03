"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, Check, FileText, PanelRightOpen, PanelRightClose } from "lucide-react"
import { AIAssistantPanel } from "@/components/ai-assistant-panel"
import { AIModeToggle } from "@/components/ai-mode-toggle"
import Link from "next/link"

export type AIMode = "suggestive" | "autocomplete" | "passive"

export function WritingInterface() {
  const [currentChapter, setCurrentChapter] = useState("1")
  const [aiMode, setAIMode] = useState<AIMode>("suggestive")
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">("saved")
  const [wordCount, setWordCount] = useState(247)
  const [showAIPanel, setShowAIPanel] = useState(true)
  const [content, setContent] = useState(`# Chapter 1: The Lighthouse Keeper's Secret

The old lighthouse stood silently against the stormy sky, its beacon long extinguished. Thomas had been its keeper for thirty years, watching over the treacherous coastline that had claimed so many ships. But tonight was different. Tonight, he would finally reveal the secret he had guarded all these years.

The wind howled through the cracks in the weathered stone walls as Thomas climbed the spiral staircase one last time. Each step echoed with memories of the past—of ships saved and lives lost, of the terrible choice he had made on that fateful night three decades ago.

At the top of the lighthouse, Thomas opened the old wooden chest he had hidden behind the great lens. Inside lay a collection of letters, yellowed with age, tied together with a faded blue ribbon.`)

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const chapters = Array.from({ length: 8 }, (_, i) => ({
    id: (i + 1).toString(),
    title: `Chapter ${i + 1}`,
  }))

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"
    }
  }, [content])

  const handleContentChange = (newContent: string) => {
    setContent(newContent)
    setSaveStatus("unsaved")

    // Calculate word count
    const words = newContent
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0)
    setWordCount(words.length)

    // Auto-save simulation
    setTimeout(() => {
      setSaveStatus("saving")
      setTimeout(() => setSaveStatus("saved"), 1000)
    }, 2000)
  }

  const handleInsertText = (text: string) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const newContent = content.substring(0, start) + text + content.substring(end)

    setContent(newContent)
    handleContentChange(newContent)

    // Set cursor position after inserted text
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + text.length
      textarea.focus()
    }, 0)
  }

  const getSaveStatusIcon = () => {
    switch (saveStatus) {
      case "saved":
        return <Check className="h-4 w-4 text-green-600" />
      case "saving":
        return <Save className="h-4 w-4 text-blue-600 animate-pulse" />
      case "unsaved":
        return <Save className="h-4 w-4 text-orange-600" />
    }
  }

  const getSaveStatusText = () => {
    switch (saveStatus) {
      case "saved":
        return "All changes saved"
      case "saving":
        return "Saving changes..."
      case "unsaved":
        return "Unsaved changes"
    }
  }

  const getSelectedText = () => {
    const textarea = textareaRef.current
    if (!textarea) return ""
    return content.substring(textarea.selectionStart, textarea.selectionEnd)
  }

  const toggleAIPanel = () => {
    setShowAIPanel(!showAIPanel)
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="h-16 bg-white border-b border-stone-200 px-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild className="text-stone-600 hover:text-stone-900">
            <Link href="/workspace">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Workspace
            </Link>
          </Button>
          <div className="h-6 w-px bg-stone-300" />
          <h1 className="text-lg font-semibold text-stone-900">AI Writing Studio</h1>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleAIPanel}
            className="flex items-center gap-2"
          >
            {showAIPanel ? (
              <>
                <PanelRightClose className="h-4 w-4" />
                Hide AI Panel
              </>
            ) : (
              <>
                <PanelRightOpen className="h-4 w-4" />
                Show AI Panel
              </>
            )}
          </Button>
          <div className="h-6 w-px bg-stone-300" />
          <AIModeToggle mode={aiMode} onModeChange={setAIMode} />
          <div className="h-6 w-px bg-stone-300" />
          <div className="flex items-center gap-2 text-sm">
            {getSaveStatusIcon()}
            <span
              className={`font-medium ${
                saveStatus === "saved"
                  ? "text-green-600"
                  : saveStatus === "saving"
                    ? "text-blue-600"
                    : "text-orange-600"
              }`}
            >
              {getSaveStatusText()}
            </span>
          </div>
        </div>
      </header>

      {/* Main Interface */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column - Story Editor */}
        <div 
          className={`flex flex-col bg-white transition-all duration-300 ${
            showAIPanel ? 'w-[70%] border-r border-stone-200' : 'w-full'
          }`}
        >
          {/* Chapter Selector */}
          <div className="h-14 border-b border-stone-200 px-6 flex items-center justify-between bg-stone-50">
            <Select value={currentChapter} onValueChange={setCurrentChapter}>
              <SelectTrigger className="w-48 bg-white">
                <SelectValue placeholder="Select chapter..." />
              </SelectTrigger>
              <SelectContent>
                {chapters.map((chapter) => (
                  <SelectItem key={chapter.id} value={chapter.id}>
                    {chapter.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-stone-100 text-stone-700">
                Chronicles of Thalara
              </Badge>
              {!showAIPanel && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleAIPanel}
                  className="flex items-center gap-2"
                >
                  <PanelRightOpen className="h-4 w-4" />
                  Show AI Panel
                </Button>
              )}
            </div>
          </div>

          {/* Text Editor */}
          <div className="flex-1 p-8 overflow-auto">
            <div className="max-w-4xl mx-auto">
              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => handleContentChange(e.target.value)}
                placeholder="Start writing your story..."
                className="w-full min-h-[600px] resize-none border-none outline-none text-stone-800 text-lg leading-relaxed font-serif placeholder:text-stone-400 bg-transparent"
                style={{
                  fontFamily: '"Crimson Text", "Georgia", "Times New Roman", serif',
                  lineHeight: "1.8",
                }}
              />
            </div>
          </div>

          {/* Bottom Status Bar */}
          <div className="h-12 border-t border-stone-200 px-6 flex items-center justify-between bg-stone-50 text-sm text-stone-600">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span>{wordCount} words</span>
              </div>
              <span>
                Chapter {currentChapter} of {chapters.length}
              </span>
            </div>
            <div>Last saved: {saveStatus === "saved" ? "just now" : "saving..."}</div>
          </div>
        </div>

        {/* Right Column - AI Assistant */}
        <div 
          className={`bg-stone-50 transition-all duration-300 ${
            showAIPanel ? 'w-[30%] opacity-100' : 'w-0 opacity-0 overflow-hidden'
          }`}
        >
          {showAIPanel && (
            <AIAssistantPanel
              currentContent={content}
              selectedText={getSelectedText()}
              onInsertText={handleInsertText}
              aiMode={aiMode}
            />
          )}
        </div>
      </div>
    </div>
  )
}