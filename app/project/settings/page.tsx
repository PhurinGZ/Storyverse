"use client"

import { useState } from "react"
import { ProjectSettingsHeader } from "@/components/project-settings-header"
import { BasicSettings } from "@/components/basic-settings"
import { AIBehaviorSettings } from "@/components/ai-behavior-settings"
import { CollaborationSettings } from "@/components/collaboration-settings"
import { ProjectActions } from "@/components/project-actions"

// Mock project data
const mockProject = {
  id: "1",
  title: "The Lighthouse Keeper's Secret",
  genre: "Mystery",
  description:
    "A haunting tale of secrets buried for decades, where a lighthouse keeper must confront his past choices when a young woman arrives seeking answers about her missing father.",
  aiTone: "Dark",
  aiStyle: "Help with ideas",
  visibility: "Private",
  collaborators: [
    { id: "1", email: "sarah.writer@email.com", role: "Editor", status: "Active" },
    { id: "2", email: "john.beta@email.com", role: "Beta Reader", status: "Pending" },
  ],
}

export default function ProjectSettingsPage() {
  const [project, setProject] = useState(mockProject)
  const [hasChanges, setHasChanges] = useState(false)

  const handleProjectUpdate = (updates: Partial<typeof project>) => {
    setProject((prev) => ({ ...prev, ...updates }))
    setHasChanges(true)
  }

  const handleSave = () => {
    // Simulate save
    console.log("Saving project:", project)
    setHasChanges(false)
  }

  const handleArchive = () => {
    console.log("Archiving project:", project.id)
  }

  const handleDelete = () => {
    console.log("Deleting project:", project.id)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ProjectSettingsHeader projectTitle={project.title} hasChanges={hasChanges} />

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-8">
          <BasicSettings
            title={project.title}
            genre={project.genre}
            description={project.description}
            onUpdate={handleProjectUpdate}
          />

          <AIBehaviorSettings tone={project.aiTone} style={project.aiStyle} onUpdate={handleProjectUpdate} />

          <CollaborationSettings
            visibility={project.visibility}
            collaborators={project.collaborators}
            onUpdate={handleProjectUpdate}
          />

          <ProjectActions
            onSave={handleSave}
            onArchive={handleArchive}
            onDelete={handleDelete}
            hasChanges={hasChanges}
          />
        </div>
      </div>
    </div>
  )
}
