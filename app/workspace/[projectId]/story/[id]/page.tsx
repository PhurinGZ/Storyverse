"use client"

import { StoryHeader } from "@/components/story-header"
import { StoryContent } from "@/components/story-content"
import { StoryReactions } from "@/components/story-reactions"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

// Mock story data
const storyData = {
  id: "1",
  title: "The Lighthouse Keeper's Secret",
  author: {
    name: "Sarah Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    username: "sarahwrites",
  },
  tags: [
    { type: "genre", label: "Mystery", color: "bg-purple-100 text-purple-800" },
    { type: "collaboration", label: "AI Co-created", color: "bg-blue-100 text-blue-800" },
    { type: "status", label: "Open for Collaboration", color: "bg-green-100 text-green-800" },
  ],
  content: `The old lighthouse stood silently against the stormy sky, its beacon long extinguished. For thirty years, Thomas had been its keeper, watching over the treacherous coastline that had claimed so many ships. But tonight was different. Tonight, he would finally reveal the secret he had guarded all these years.

The wind howled through the cracks in the weathered stone walls as Thomas climbed the spiral staircase one last time. Each step echoed with memories of the past—of ships saved and lives lost, of the terrible choice he had made on that fateful night three decades ago.

At the top of the lighthouse, Thomas opened the old wooden chest he had hidden behind the great lens. Inside lay a collection of letters, yellowed with age, tied together with a faded blue ribbon. These were the letters from Captain Morrison's daughter, the ones that had arrived every month for years after her father's ship had vanished in the storm.

Thomas had never sent them back. He couldn't bring himself to tell her the truth—that her father's ship hadn't been lost to the storm, but to Thomas's own moment of weakness. On that terrible night, when two ships had been heading toward the rocks, Thomas had made an impossible choice. He could only save one.

The merchant vessel carried a hundred souls, families returning from distant lands. The other ship, Captain Morrison's, carried only a crew of twelve. The mathematics of morality seemed clear, but the weight of that decision had haunted Thomas every day since.

As he untied the ribbon with trembling fingers, Thomas wondered if he was doing the right thing. The letters contained not just a daughter's love for her lost father, but also clues to a treasure that Morrison had been carrying—a treasure that now lay at the bottom of the sea, along with the captain and his crew.

The first letter was dated just two months after the storm:

"Dear Father, I hope this letter finds you well. The authorities say your ship was lost, but I refuse to believe it. I know you're out there somewhere, perhaps stranded on some distant shore. I've been researching the route you were taking, and I believe I've found something important..."

Thomas's hands shook as he read. She had been so close to the truth, so determined to find her father. And he had kept these letters from the world, protecting his secret while she searched in vain.

The lighthouse beam had been extinguished for years now, replaced by modern navigation systems. But tonight, Thomas would light it one last time. Not to guide ships to safety, but to signal the end of his long vigil. Tomorrow, he would take these letters to the authorities. He would tell them about the choice he had made, about the treasure that lay beneath the waves, and about the daughter who deserved to know the truth about her father's fate.

As the great lens began to turn and the light swept across the dark waters, Thomas felt a weight lifting from his shoulders. The secret that had kept him prisoner for thirty years was finally ready to be set free. The lighthouse keeper's watch was coming to an end, but perhaps, in its ending, it would finally serve its true purpose—to bring someone safely home.`,
}

export default function StoryViewerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Button variant="ghost" size="sm" asChild className="text-gray-600 hover:text-gray-900">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Stories
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <StoryHeader title={storyData.title} author={storyData.author} tags={storyData.tags} />

          <StoryContent content={storyData.content} />

          <StoryReactions
            storyId={storyData.id}
            isOpenForCollaboration={storyData.tags.some((tag) => tag.type === "status" && tag.label.includes("Open"))}
          />
        </div>
      </div>
    </div>
  )
}
