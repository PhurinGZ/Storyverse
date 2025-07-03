"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Save, Archive, Trash2 } from "lucide-react"

interface ProjectActionsProps {
  onSave: () => void
  onArchive: () => void
  onDelete: () => void
  hasChanges: boolean
}

export function ProjectActions({ onSave, onArchive, onDelete, hasChanges }: ProjectActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = () => {
    setIsDeleting(true)
    onDelete()
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-medium text-gray-900">Project Actions</h3>
            <p className="text-sm text-gray-600">Save your changes or manage your project</p>
          </div>

          <div className="flex items-center gap-3">
            <Button onClick={onSave} disabled={!hasChanges} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Save className="h-4 w-4 mr-2" />
              {hasChanges ? "Save Changes" : "Saved"}
            </Button>

            <Button
              variant="outline"
              onClick={onArchive}
              className="border-amber-300 text-amber-700 hover:bg-amber-50 bg-transparent"
            >
              <Archive className="h-4 w-4 mr-2" />
              Archive Project
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50 bg-transparent">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Project
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your project and remove all associated
                    data, including chapters, characters, and collaboration history.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    {isDeleting ? "Deleting..." : "Delete Project"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
