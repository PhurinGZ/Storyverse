import { Save, Edit } from "lucide-react"

interface HeaderProps {
  projectTitle: string
  hasChanges: boolean
  onSaveChanges: () => void
}

export default function Header({ projectTitle, hasChanges, onSaveChanges }: HeaderProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Project Settings</h1>
            <p className="text-gray-600 mt-1 flex items-center">
              <Edit className="h-4 w-4 mr-2" />
              {projectTitle}
            </p>
          </div>
          {hasChanges && (
            <button 
              onClick={onSaveChanges}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Save className="h-4 w-4" />
              <span>Save Changes</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}