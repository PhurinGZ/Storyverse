// app/workspace/[projectId]/page.tsx (Overview page for specific project)
"use client"

import { useWorkspace } from "../workspace-context"
import { OverviewTab } from "@/components/overview-tab"

export default function ProjectOverviewPage() {
  const { projectData } = useWorkspace()

  return <OverviewTab projectData={projectData} />
}