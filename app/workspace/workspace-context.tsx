// app/workspace/workspace-context.tsx (Updated)
"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface ProjectData {
  id: string
  title: string
  genre: string
  wordCount: number
  chapters: number
  lastUpdated: string
  collaborators: number
  status: string
  description: string
  tags: string[]
  members: Array<{
    name: string
    role: string
    avatar: string
  }>
  summary: string
  stats: {
    wordCount: number
    chapters: number
    lastUpdate: string
  }
}

interface WorkspaceContextType {
  saveStatus: "saved" | "saving" | "unsaved"
  setSaveStatus: (status: "saved" | "saving" | "unsaved") => void
  projectData: ProjectData
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined)

export function WorkspaceProvider({ 
  children, 
  projectData 
}: { 
  children: ReactNode
  projectData: ProjectData
}) {
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">("saved")

  return (
    <WorkspaceContext.Provider value={{ saveStatus, setSaveStatus, projectData }}>
      {children}
    </WorkspaceContext.Provider>
  )
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext)
  if (!context) {
    throw new Error("useWorkspace must be used within WorkspaceProvider")
  }
  return context
}