// app/workspace/[projectId]/layout.tsx
"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { WorkspaceHeader } from "@/components/workspace-header"
import { WorkspaceSidebar } from "@/components/workspace-sidebar"
import { WorkspaceProvider } from "../workspace-context"

// Mock function to fetch project data - replace with your actual API call
async function getProjectData(projectId: string) {
  // This would normally be an API call
  const mockProjects = [
    {
      id: "1",
      title: "Chronicles of Thalara",
      genre: "Epic Fantasy",
      wordCount: 45780,
      chapters: 12,
      lastUpdated: "2 hours ago",
      collaborators: 3,
      status: "active",
      description: "A mystical realm where ancient magic flows through crystalline ley lines...",
      tags: ["Magic", "Adventure", "Dragons", "Political Intrigue"],
      members: [
        { name: "Sarah Chen", role: "Author", avatar: "/placeholder.svg?height=32&width=32" },
        { name: "Alex Rivera", role: "Co-Author", avatar: "/placeholder.svg?height=32&width=32" },
        { name: "Maya Patel", role: "Editor", avatar: "/placeholder.svg?height=32&width=32" },
      ],
      summary: "In the mystical realm of Thalara, where ancient magic flows through crystalline ley lines, a young mage discovers she holds the key to preventing an interdimensional war that threatens to tear apart the fabric of reality itself.",
      stats: {
        wordCount: 45780,
        chapters: 12,
        lastUpdate: "2 hours ago"
      }
    },
    {
      id: "2",
      title: "The Lighthouse Keeper's Secret",
      genre: "Mystery",
      wordCount: 23450,
      chapters: 8,
      lastUpdated: "1 day ago",
      collaborators: 1,
      status: "active",
      description: "Thomas has guarded his secret for thirty years, but tonight everything changes...",
      tags: ["Mystery", "Thriller", "Coastal", "Secrets"],
      members: [
        { name: "Thomas Wright", role: "Author", avatar: "/placeholder.svg?height=32&width=32" },
      ],
      summary: "Thomas has guarded his secret for thirty years, but tonight everything changes when a mysterious woman arrives at his lighthouse during the worst storm in decades.",
      stats: {
        wordCount: 23450,
        chapters: 8,
        lastUpdate: "1 day ago"
      }
    },
    {
      id: "3",
      title: "Neon Dreams",
      genre: "Cyberpunk",
      wordCount: 67200,
      chapters: 15,
      lastUpdated: "3 days ago",
      collaborators: 2,
      status: "active",
      description: "In Neo-Tokyo 2087, a hacker discovers a conspiracy that threatens reality itself...",
      tags: ["Cyberpunk", "Hacking", "Future", "Conspiracy"],
      members: [
        { name: "Kenji Nakamura", role: "Author", avatar: "/placeholder.svg?height=32&width=32" },
        { name: "Luna Rodriguez", role: "Co-Author", avatar: "/placeholder.svg?height=32&width=32" },
      ],
      summary: "In Neo-Tokyo 2087, a hacker discovers a conspiracy that threatens reality itself as the boundaries between digital and physical worlds begin to blur.",
      stats: {
        wordCount: 67200,
        chapters: 15,
        lastUpdate: "3 days ago"
      }
    },
    // Add more projects as needed...
  ]

  return mockProjects.find(p => p.id === projectId) || null
}

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const params = useParams()
  const projectId = params.projectId as string
  const [projectData, setProjectData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadProject() {
      try {
        setLoading(true)
        const data = await getProjectData(projectId)
        
        if (!data) {
          setError("Project not found")
          return
        }
        
        setProjectData(data)
      } catch (err) {
        setError("Failed to load project")
        console.error("Error loading project:", err)
      } finally {
        setLoading(false)
      }
    }

    if (projectId) {
      loadProject()
    }
  }, [projectId])

  if (loading) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading project...</p>
        </div>
      </div>
    )
  }

  if (error || !projectData) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error || "Project not found"}
          </div>
          <a href="/projects" className="text-blue-600 hover:text-blue-800">
            ← Back to Projects
          </a>
        </div>
      </div>
    )
  }

  return (
    <WorkspaceProvider projectData={projectData}>
      <WorkspaceLayoutContent>{children}</WorkspaceLayoutContent>
    </WorkspaceProvider>
  )
}

function WorkspaceLayoutContent({ children }: { children: React.ReactNode }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <WorkspaceHeader />

      <div className="flex-1 flex overflow-hidden">
        <WorkspaceSidebar 
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        <main className="flex-1 overflow-auto bg-white">
          {children}
        </main>
      </div>
    </div>
  )
}