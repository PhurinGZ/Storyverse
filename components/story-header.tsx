"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Author {
  name: string
  avatar: string
  username: string
}

interface Tag {
  type: string
  label: string
  color: string
}

interface StoryHeaderProps {
  title: string
  author: Author
  tags: Tag[]
}

export function StoryHeader({ title, author, tags }: StoryHeaderProps) {
  return (
    <div className="p-8 pb-6 border-b border-gray-100">
      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">{title}</h1>

      {/* Author Info */}
      <div className="flex items-center gap-4 mb-6">
        <Avatar className="h-12 w-12">
          <AvatarImage src={author.avatar || "/placeholder.svg"} alt={author.name} />
          <AvatarFallback className="bg-purple-100 text-purple-700 font-semibold">
            {author.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-gray-900">{author.name}</h3>
          <p className="text-gray-600 text-sm">@{author.username}</p>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <Badge key={index} className={`${tag.color} border-0 font-medium px-3 py-1`}>
            {tag.label}
          </Badge>
        ))}
      </div>
    </div>
  )
}
