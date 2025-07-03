"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface AddEventButtonProps {
  onClick: () => void
}

export function AddEventButton({ onClick }: AddEventButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-8 right-8 h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 z-50"
      size="icon"
    >
      <Plus className="h-6 w-6" />
      <span className="sr-only">Add new event</span>
    </Button>
  )
}
