"use client"

interface StoryContentProps {
  content: string
}

export function StoryContent({ content }: StoryContentProps) {
  // Split content into paragraphs
  const paragraphs = content.split("\n\n").filter((p) => p.trim())

  return (
    <div className="px-8 py-8">
      <article className="prose prose-lg prose-gray max-w-none">
        <div
          className="text-gray-800 leading-relaxed"
          style={{
            fontFamily: '"Georgia", "Times New Roman", serif',
            fontSize: "1.125rem",
            lineHeight: "1.8",
          }}
        >
          {paragraphs.map((paragraph, index) => {
            // Check if paragraph is a letter (starts with quotes)
            const isLetter = paragraph.trim().startsWith('"') && paragraph.trim().endsWith('"')

            return (
              <p
                key={index}
                className={`mb-6 ${isLetter ? "italic pl-6 border-l-4 border-blue-200 bg-blue-50/30 py-4 px-6 rounded-r-lg" : ""}`}
              >
                {paragraph}
              </p>
            )
          })}
        </div>
      </article>
    </div>
  )
}
