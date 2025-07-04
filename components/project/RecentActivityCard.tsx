import React from 'react'

interface ActivityItem {
  id: number
  type: string
  message: string
  project: string
  time: string
  icon: string
}

export function RecentActivityCard({ activities }: { activities: ActivityItem[] }) {
  return (
    <div className="bg-white border rounded-xl shadow-sm p-5">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">กิจกรรมล่าสุด</h3>
      <ul className="space-y-4">
        {activities.map((activity) => (
          <li key={activity.id} className="flex items-start gap-3">
            <div className="text-2xl">{activity.icon}</div>
            <div className="text-sm text-gray-700">
              {activity.message}{" "}
              <span className="font-semibold text-blue-600">{activity.project}</span>
              <div className="text-xs text-gray-400">{activity.time}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
