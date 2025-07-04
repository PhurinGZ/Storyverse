// components/workspace-sidebar.tsx (Updated for dynamic routing)
"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { BarChart3, Edit3, Users, Clock, Globe, BookOpen, Menu, X, ArrowLeft, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname, useParams } from "next/navigation"

interface WorkspaceSidebarProps {
  isCollapsed?: boolean
  onToggle?: () => void
}

export function WorkspaceSidebar({ 
  isCollapsed = false, 
  onToggle 
}: WorkspaceSidebarProps) {
  const pathname = usePathname()
  const params = useParams()
  const projectId = params.projectId as string

  const navigationItems = [
    { id: "overview", label: "Overview", icon: BarChart3, href: `/workspace/${projectId}` },
    { id: "editor", label: "Story Editor", icon: Edit3, href: `/workspace/${projectId}/ai-writing` },
    { id: "characters", label: "Characters", icon: Users, href: `/workspace/${projectId}/characters` },
    { id: "timeline", label: "Timeline", icon: Clock, href: `/workspace/${projectId}/timeline` },
    { id: "worldbuilding", label: "Worldbuilding", icon: Globe, href: `/workspace/${projectId}/worldbuilding` },
    { id: "settings", label: "Settings", icon: Settings, href: `/workspace/${projectId}/settings` },
  ]

  const isActive = (href: string) => {
    if (href === `/workspace/${projectId}`) {
      return pathname === `/workspace/${projectId}`
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Toggle Button - visible when sidebar is collapsed */}
      {isCollapsed && onToggle && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="fixed top-4 left-4 z-50 bg-gray-900 text-white hover:bg-gray-800"
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}

      <aside 
        className={cn(
          "bg-gray-900 text-white flex flex-col transition-all duration-300 ease-in-out z-20",
          isCollapsed ? "w-0 overflow-hidden" : "w-64"
        )}
      >
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <BookOpen className="h-6 w-6 text-blue-400 flex-shrink-0" />
            <span className="font-semibold text-lg whitespace-nowrap">Creative Studio</span>
          </div>
          {onToggle && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="text-gray-400 hover:text-white hover:bg-gray-800 flex-shrink-0"
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Back to Projects Link */}
        <div className="p-4 border-b border-gray-700">
          <Link href="/projects">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-gray-300 hover:text-white hover:bg-gray-800"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Button>
          </Link>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              
              return (
                <Link key={item.id} href={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-3 h-12 text-left font-medium transition-colors",
                      active
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "text-gray-300 hover:text-white hover:bg-gray-800",
                    )}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span className="whitespace-nowrap">{item.label}</span>
                  </Button>
                </Link>
              )
            })}
          </div>
        </nav>
      </aside>
    </>
  )
}