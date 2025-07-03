"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Heart, Bookmark, Share2, MessageCircle, Edit3 } from "lucide-react"

interface StoryReactionsProps {
  storyId: string
  isOpenForCollaboration?: boolean
}

export function StoryReactions({ storyId, isOpenForCollaboration = false }: StoryReactionsProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [likeCount, setLikeCount] = useState(247)
  const [commentCount] = useState(18)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "The Lighthouse Keeper's Secret",
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      // You could show a toast notification here
    }
  }

  const handleComment = () => {
    // Scroll to comments section or open comments modal
    console.log("Opening comments...")
  }

  const handleContinueStory = () => {
    // Navigate to editor with this story as base
    console.log("Continue story...")
  }

  return (
    <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-100">
      <div className="flex items-center justify-between">
        {/* Reaction Buttons */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`gap-2 ${isLiked ? "text-red-600 hover:text-red-700" : "text-gray-600 hover:text-gray-900"}`}
          >
            <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
            <span className="font-medium">{likeCount}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleBookmark}
            className={`gap-2 ${isBookmarked ? "text-blue-600 hover:text-blue-700" : "text-gray-600 hover:text-gray-900"}`}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
            <span className="font-medium">Save</span>
          </Button>

          <Button variant="ghost" size="sm" onClick={handleShare} className="gap-2 text-gray-600 hover:text-gray-900">
            <Share2 className="h-4 w-4" />
            <span className="font-medium">Share</span>
          </Button>

          <Button variant="ghost" size="sm" onClick={handleComment} className="gap-2 text-gray-600 hover:text-gray-900">
            <MessageCircle className="h-4 w-4" />
            <span className="font-medium">{commentCount}</span>
          </Button>
        </div>

        {/* Continue Story Button */}
        {isOpenForCollaboration && (
          <>
            <Separator orientation="vertical" className="h-6" />
            <Button onClick={handleContinueStory} className="bg-purple-600 hover:bg-purple-700 text-white gap-2">
              <Edit3 className="h-4 w-4" />
              Continue the Story
            </Button>
          </>
        )}
      </div>

      {/* Stats */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <span>{likeCount} likes</span>
          <span>{commentCount} comments</span>
          <span>1.2k views</span>
          <span>Published 3 days ago</span>
        </div>
      </div>
    </div>
  )
}
