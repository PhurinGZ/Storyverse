interface PrivacyOptionsProps {
  allowAnonymousFeedback: boolean
  showInDiscovery: boolean
  onToggleAnonymousFeedback: (value: boolean) => void
  onToggleShowInDiscovery: (value: boolean) => void
}

export default function PrivacyOptions({ 
  allowAnonymousFeedback, 
  showInDiscovery, 
  onToggleAnonymousFeedback,
  onToggleShowInDiscovery
}: PrivacyOptionsProps) {
  return (
    <div className="border-t pt-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Additional Privacy Options</h3>
      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm font-medium text-gray-700">Allow Anonymous Feedback</p>
            <p className="text-sm text-gray-500">Let visitors leave feedback without signing up</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer"
              checked={allowAnonymousFeedback}
              onChange={(e) => onToggleAnonymousFeedback(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm font-medium text-gray-700">Show in Discovery</p>
            <p className="text-sm text-gray-500">Include project in public discovery feeds</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer"
              checked={showInDiscovery}
              onChange={(e) => onToggleShowInDiscovery(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  )
}