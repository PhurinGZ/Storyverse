interface CollaborationSettingsProps {
  allowCollaboration: boolean
  onToggleCollaboration: (value: boolean) => void
}

export default function CollaborationSettings({ 
  allowCollaboration, 
  onToggleCollaboration 
}: CollaborationSettingsProps) {
  return (
    <div className="border-t pt-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Collaboration Settings</h3>
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div>
          <p className="text-sm font-medium text-gray-700">Allow Collaboration</p>
          <p className="text-sm text-gray-500">Enable others to contribute to your project</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={allowCollaboration}
            onChange={(e) => onToggleCollaboration(e.target.checked)}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>
    </div>
  )
}