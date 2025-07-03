"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Globe, Edit } from "lucide-react"
import Link from "next/link"

interface WorldbuildingHeaderProps {
  worldName: string
  description: string
}

export function WorldbuildingHeader({ worldName, description }: WorldbuildingHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="sm" asChild className="text-gray-600 hover:text-gray-900">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Edit className="h-4 w-4" />
            Edit World
          </Button>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
            <Globe className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{worldName}</h1>
            <p className="text-gray-600 text-lg leading-relaxed max-w-4xl">{description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
