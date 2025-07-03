"use client";

import { useState } from "react";
import { 
  PlusIcon, 
  TrashIcon, 
  PencilIcon, 
  CheckIcon,
  XMarkIcon,
  DocumentTextIcon 
} from "@heroicons/react/24/outline";

interface Chapter {
  id: string;
  title: string;
  content: string;
  wordCount: number;
  lastModified: Date;
}

interface ChapterSelectorProps {
  chapters: Chapter[];
  currentChapterId: string;
  onChapterSelect: (chapterId: string) => void;
  onCreateChapter: () => void;
  onDeleteChapter: (chapterId: string) => void;
  onRenameChapter: (chapterId: string, newTitle: string) => void;
}

export function ChapterSelector({
  chapters,
  currentChapterId,
  onChapterSelect,
  onCreateChapter,
  onDeleteChapter,
  onRenameChapter
}: ChapterSelectorProps) {
  const [editingChapterId, setEditingChapterId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const handleStartEdit = (chapter: Chapter) => {
    setEditingChapterId(chapter.id);
    setEditTitle(chapter.title);
  };

  const handleSaveEdit = () => {
    if (editingChapterId && editTitle.trim()) {
      onRenameChapter(editingChapterId, editTitle.trim());
    }
    setEditingChapterId(null);
    setEditTitle("");
  };

  const handleCancelEdit = () => {
    setEditingChapterId(null);
    setEditTitle("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveEdit();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("th-TH", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-800">บทต่างๆ</h3>
          <button
            onClick={onCreateChapter}
            className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="เพิ่มบทใหม่"
          >
            <PlusIcon className="w-5 h-5" />
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          {chapters.length} บท
        </p>
      </div>

      {/* Chapter List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2 space-y-1">
          {chapters.map((chapter) => (
            <div
              key={chapter.id}
              className={`group relative rounded-lg border transition-all duration-200 ${
                currentChapterId === chapter.id
                  ? "bg-blue-50 border-blue-200 shadow-sm"
                  : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm"
              }`}
            >
              <div
                className="p-3 cursor-pointer"
                onClick={() => onChapterSelect(chapter.id)}
              >
                <div className="flex items-start space-x-3">
                  <DocumentTextIcon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                    currentChapterId === chapter.id ? "text-blue-600" : "text-gray-400"
                  }`} />
                  
                  <div className="flex-1 min-w-0">
                    {editingChapterId === chapter.id ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          autoFocus
                        />
                        <button
                          onClick={handleSaveEdit}
                          className="p-1 text-green-600 hover:bg-green-50 rounded"
                        >
                          <CheckIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="p-1 text-gray-500 hover:bg-gray-50 rounded"
                        >
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <h4 className={`font-medium truncate ${
                          currentChapterId === chapter.id ? "text-blue-900" : "text-gray-900"
                        }`}>
                          {chapter.title}
                        </h4>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-gray-500">
                            {chapter.wordCount} คำ
                          </span>
                          <span className="text-xs text-gray-400">
                            {formatDate(chapter.lastModified)}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              {editingChapterId !== chapter.id && (
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex space-x-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartEdit(chapter);
                      }}
                      className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"
                      title="แก้ไขชื่อ"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    {chapters.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`คุณต้องการลบ "${chapter.title}" หรือไม่?`)) {
                            onDeleteChapter(chapter.id);
                          }
                        }}
                        className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                        title="ลบบท"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="text-xs text-gray-500">
          <div className="flex justify-between">
            <span>คำทั้งหมด:</span>
            <span className="font-medium">
              {chapters.reduce((sum, ch) => sum + ch.wordCount, 0).toLocaleString()} คำ
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}