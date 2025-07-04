import { AlertTriangle, Trash2 } from "lucide-react"

interface DangerZoneProps {
  onDelete: () => void
}

export default function DangerZone({ onDelete }: DangerZoneProps) {
  return (
    <div className="border-t pt-8">
      <h3 className="text-lg font-semibold text-red-600 mb-6 flex items-center">
        <AlertTriangle className="h-5 w-5 mr-2" />
        Danger Zone
      </h3>
      <div className="border border-red-200 rounded-lg p-6 bg-red-50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-red-800">Delete Project</p>
            <p className="text-sm text-red-600">This action cannot be undone</p>
          </div>
          <button 
            onClick={onDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  )
}