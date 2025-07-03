"use client";

import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface WritingEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function WritingEditor({ content, onChange }: WritingEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editorProps: {
      attributes: {
        class:
          "prose max-w-none w-full min-h-[calc(100vh-200px)] resize-none border-none outline-none text-gray-900 text-lg leading-relaxed font-serif placeholder:text-gray-400 bg-transparent",
      },
    },
    onUpdate({ editor }) {
      const html = editor.getHTML();
      onChange(html);
    },
  });

  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="flex-1 p-8 overflow-auto">
      <div className="max-w-4xl mx-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
