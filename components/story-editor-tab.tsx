"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, 
  Save, 
  Check, 
  FileText, 
  Plus, 
  Trash2, 
  Edit3, 
  MessageSquare,
  Settings,
  BookOpen
} from "lucide-react";
import { WritingEditor } from "@/components/writing-editor";
import { AIChatPanel } from "@/components/ai-chat-panel";
import { EditorToolbar } from "@/components/editor-toolbar";
import Link from "next/link";

interface Chapter {
  id: string;
  title: string;
  content: string;
  wordCount: number;
  lastModified: Date;
}

export type AIMode = "suggestive" | "autocomplete" | "passive";

export function StoryEditorTab() {
  const [chapters, setChapters] = useState<Chapter[]>([
    {
      id: "1",
      title: "บทที่ 1: จุดเริ่มต้น",
      content: `# บทที่ 1: จุดเริ่มต้น

เริ่มเขียนเรื่องราวของคุณที่นี่... 

หอคอยแสงเก่าแก่ยืนตระหง่านท่ามกลางท้องฟ้าที่มีพายุโหมกระหน่ำ แสงสว่างของมันได้ดับลงไปนานแล้ว โทมัสเป็นผู้ดูแลหอคอยมาเป็นเวลาสามสิบปี คอยเฝ้าดูแนวชายฝั่งอันตรายที่เคยทำลายเรือเดินทะเลมากมาย แต่คืนนี้แตกต่าง คืนนี้เขาจะเปิดเผยความลับที่เขาเก็บงำมาตลอดหลายปี

ลมหอบหิมะผ่านรอยแตกในกำแพงหินที่ผุพังขณะที่โทมัสปีนบันไดเวียนขึ้นไปครั้งสุดท้าย แต่ละขั้นก้องกับความทรงจำแห่งอดีต—ของเรือที่ได้รับการช่วยเหลือและชีวิตที่สูญเสีย ของการเลือกที่น่าสะพรึงกลัวที่เขาทำในคืนแห่งโชคชะตานั้นเมื่อสามทศวรรษที่แล้ว`,
      wordCount: 125,
      lastModified: new Date()
    }
  ]);
  
  const [currentChapterId, setCurrentChapterId] = useState("1");
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">("saved");
  const [aiMode, setAIMode] = useState<AIMode>("suggestive");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [selectedText, setSelectedText] = useState("");
  const [editingChapterId, setEditingChapterId] = useState<string | null>(null);
  const [newChapterTitle, setNewChapterTitle] = useState("");
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const currentChapter = chapters.find(ch => ch.id === currentChapterId) || chapters[0];

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [currentChapter.content]);

  const handleContentChange = (newContent: string) => {
    // Calculate word count (remove HTML tags and count words)
    const words = newContent
      .replace(/<[^>]+>/g, " ")
      .replace(/[#*_`]/g, "")
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);

    const wordCount = words.length;

    setChapters(prev => prev.map(chapter => 
      chapter.id === currentChapterId 
        ? { 
            ...chapter, 
            content: newContent, 
            wordCount,
            lastModified: new Date()
          }
        : chapter
    ));

    setSaveStatus("unsaved");

    if (autoSave) {
      setTimeout(() => {
        setSaveStatus("saving");
        setTimeout(() => setSaveStatus("saved"), 1000);
      }, 2000);
    }
  };

  const handleChapterSelect = (chapterId: string) => {
    setCurrentChapterId(chapterId);
    setSaveStatus("saved");
  };

  const handleCreateChapter = () => {
    const newChapterId = (chapters.length + 1).toString();
    const newChapter: Chapter = {
      id: newChapterId,
      title: `บทที่ ${chapters.length + 1}`,
      content: `# บทที่ ${chapters.length + 1}\n\nเริ่มเขียนบทใหม่...`,
      wordCount: 3,
      lastModified: new Date()
    };

    setChapters(prev => [...prev, newChapter]);
    setCurrentChapterId(newChapterId);
  };

  const handleDeleteChapter = (chapterId: string) => {
    if (chapters.length <= 1) return;

    setChapters(prev => prev.filter(ch => ch.id !== chapterId));
    
    if (currentChapterId === chapterId) {
      const remainingChapters = chapters.filter(ch => ch.id !== chapterId);
      setCurrentChapterId(remainingChapters[0]?.id || "1");
    }
  };

  const handleRenameChapter = (chapterId: string, newTitle: string) => {
    setChapters(prev => prev.map(chapter =>
      chapter.id === chapterId
        ? { ...chapter, title: newTitle }
        : chapter
    ));
    setEditingChapterId(null);
    setNewChapterTitle("");
  };

  const startRenaming = (chapterId: string, currentTitle: string) => {
    setEditingChapterId(chapterId);
    setNewChapterTitle(currentTitle);
  };

  const handleInsertText = (text: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newContent = currentChapter.content.substring(0, start) + text + currentChapter.content.substring(end);

    handleContentChange(newContent);

    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + text.length;
      textarea.focus();
    }, 0);
  };

  const handleTextSelection = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    const selected = currentChapter.content.substring(textarea.selectionStart, textarea.selectionEnd);
    setSelectedText(selected);
  };

  const getSaveStatusIcon = () => {
    switch (saveStatus) {
      case "saved":
        return <Check className="h-4 w-4 text-green-600" />;
      case "saving":
        return <Save className="h-4 w-4 text-blue-600 animate-pulse" />;
      case "unsaved":
        return <Save className="h-4 w-4 text-orange-600" />;
    }
  };

  const getSaveStatusText = () => {
    switch (saveStatus) {
      case "saved":
        return "บันทึกแล้ว";
      case "saving":
        return "กำลังบันทึก...";
      case "unsaved":
        return "ยังไม่ได้บันทึก";
    }
  };

  const totalWordCount = chapters.reduce((sum, chapter) => sum + chapter.wordCount, 0);

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="h-16 bg-white border-b border-stone-200 px-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild className="text-stone-600 hover:text-stone-900">
            <Link href="/workspace">
              <ArrowLeft className="h-4 w-4 mr-2" />
              กลับสู่พื้นที่ทำงาน
            </Link>
          </Button>
          <div className="h-6 w-px bg-stone-300" />
          <h1 className="text-lg font-semibold text-stone-900">AI Writing Studio</h1>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsChatOpen(!isChatOpen)}
            className={isChatOpen ? "bg-blue-50 border-blue-200" : ""}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            AI Assistant
          </Button>
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
        {/* Left Sidebar - Chapter Selector */}
        <div className="w-64 border-r border-stone-200 bg-stone-50 flex flex-col">
          <div className="p-4 border-b border-stone-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-stone-800 flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                บทต่างๆ
              </h3>
              <Button
                onClick={handleCreateChapter}
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Badge variant="secondary" className="bg-stone-100 text-stone-700">
              {totalWordCount} คำทั้งหมด
            </Badge>
          </div>

          <div className="flex-1 overflow-auto p-2">
            {chapters.map((chapter) => (
              <div
                key={chapter.id}
                className={`p-3 mb-2 rounded-lg cursor-pointer transition-colors ${
                  currentChapterId === chapter.id
                    ? "bg-blue-100 border border-blue-200"
                    : "bg-white hover:bg-stone-100 border border-transparent"
                }`}
                onClick={() => handleChapterSelect(chapter.id)}
              >
                {editingChapterId === chapter.id ? (
                  <div className="space-y-2">
                    <Input
                      value={newChapterTitle}
                      onChange={(e) => setNewChapterTitle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleRenameChapter(chapter.id, newChapterTitle);
                        } else if (e.key === "Escape") {
                          setEditingChapterId(null);
                          setNewChapterTitle("");
                        }
                      }}
                      onBlur={() => handleRenameChapter(chapter.id, newChapterTitle)}
                      className="h-8 text-sm"
                      autoFocus
                    />
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm text-stone-800 truncate">
                        {chapter.title}
                      </h4>
                      <div className="flex gap-1">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            startRenaming(chapter.id, chapter.title);
                          }}
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                        >
                          <Edit3 className="h-3 w-3" />
                        </Button>
                        {chapters.length > 1 && (
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteChapter(chapter.id);
                            }}
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-stone-500">
                      {chapter.wordCount} คำ
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col">
          {/* Chapter Header */}
          <div className="h-14 border-b border-stone-200 px-6 flex items-center justify-between bg-white">
            <div>
              <h2 className="text-lg font-semibold text-stone-800">
                {currentChapter.title}
              </h2>
              <p className="text-sm text-stone-500">
                {currentChapter.wordCount} คำ • แก้ไขล่าสุด: {currentChapter.lastModified.toLocaleTimeString('th-TH')}
              </p>
            </div>
            <Badge variant="secondary" className="bg-stone-100 text-stone-700">
              บทที่ {currentChapterId} จาก {chapters.length}
            </Badge>
          </div>

          {/* Text Editor */}
          <div className="flex-1 p-8 overflow-auto">
            <div className="max-w-4xl mx-auto">
              <textarea
                ref={textareaRef}
                value={currentChapter.content}
                onChange={(e) => handleContentChange(e.target.value)}
                onSelect={handleTextSelection}
                placeholder="เริ่มเขียนเรื่องราวของคุณ..."
                className="w-full min-h-[600px] resize-none border-none outline-none text-stone-800 text-lg leading-relaxed font-serif placeholder:text-stone-400 bg-transparent"
                style={{
                  fontFamily: '"Sarabun", "Crimson Text", "Georgia", "Times New Roman", serif',
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
                <span>{currentChapter.wordCount} คำ</span>
              </div>
              <span>
                บทที่ {currentChapterId} จาก {chapters.length}
              </span>
            </div>
            <div>
              บันทึกล่าสุด: {saveStatus === "saved" ? "เมื่อสักครู่" : "กำลังบันทึก..."}
            </div>
          </div>
        </div>

        {/* AI Chat Panel */}
        {isChatOpen && (
          <div className="w-80 border-l border-stone-200 bg-white">
            <AIChatPanel
              isOpen={isChatOpen}
              onToggle={() => setIsChatOpen(!isChatOpen)}
              selectedText={selectedText}
              onInsertText={handleInsertText}
              currentContent={currentChapter.content}
              aiMode={aiMode}
            />
          </div>
        )}
      </div>
    </div>
  );
}