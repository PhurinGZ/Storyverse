import React from 'react'

interface EmailFrequencyProps {
  emailFrequency: string
  setEmailFrequency: (frequency: string) => void
}

const EmailFrequency: React.FC<EmailFrequencyProps> = ({ 
  emailFrequency, 
  setEmailFrequency 
}) => {
  const frequencyOptions = [
    {
      value: "instant",
      label: "Instant",
      description: "Receive notifications immediately"
    },
    {
      value: "daily",
      label: "Daily Digest",
      description: "Receive a daily summary"
    },
    {
      value: "weekly",
      label: "Weekly Digest",
      description: "Receive a weekly summary"
    },
    {
      value: "never",
      label: "Never",
      description: "Turn off all email notifications"
    }
  ]

  return (
    <div className="border-t pt-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Email Frequency</h3>
      <div className="space-y-4">
        {frequencyOptions.map((option) => (
          <div 
            key={option.value}
            onClick={() => setEmailFrequency(option.value)}
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
              emailFrequency === option.value 
                ? "border-blue-500 bg-blue-50" 
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">{option.label}</p>
                <p className="text-xs text-gray-500">{option.description}</p>
              </div>
              <input
                type="radio"
                name="emailFrequency"
                checked={emailFrequency === option.value}
                onChange={() => setEmailFrequency(option.value)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EmailFrequency