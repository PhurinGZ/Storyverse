import { Settings, Users, Shield, Bell, LucideIcon } from "lucide-react"

interface Tab {
  id: string
  label: string
  icon: LucideIcon
}

interface SidebarNavigationProps {
  activeTab: string
  onTabChange: (tabId: string) => void
}

export default function SidebarNavigation({ activeTab, onTabChange }: SidebarNavigationProps) {
  const tabs: Tab[] = [
    { id: "general", label: "General", icon: Settings },
    { id: "team", label: "Team", icon: Users },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell }
  ]

  return (
    <div className="lg:col-span-1">
      <nav className="space-y-2 sticky top-8">
        {tabs.map(tab => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all transform hover:scale-105 ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                  : "text-gray-700 hover:bg-white/60 hover:shadow-md"
              }`}
            >
              <Icon className="h-5 w-5 mr-3" />
              {tab.label}
            </button>
          )
        })}
      </nav>
    </div>
  )
}