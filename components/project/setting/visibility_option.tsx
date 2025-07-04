import { LucideIcon } from "lucide-react"

interface VisibilityOptionProps {
  id: string
  icon: LucideIcon
  title: string
  description: string
  isSelected: boolean
  onSelect: (value: string) => void
}

export default function VisibilityOption({ 
  id, 
  icon: Icon, 
  title, 
  description, 
  isSelected, 
  onSelect 
}: VisibilityOptionProps) {
  return (
    <div 
      onClick={() => onSelect(id)}
      className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
        isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-full ${isSelected ? "bg-blue-100" : "bg-gray-100"}`}>
            <Icon className="h-6 w-6 text-gray-600" />
          </div>
          <div>
            <p className="text-lg font-medium text-gray-700">{title}</p>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
        <input
          type="radio"
          name="visibility"
          checked={isSelected}
          onChange={() => onSelect(id)}
          className="h-5 w-5 text-blue-600 focus:ring-blue-500"
        />
      </div>
    </div>
  )
}