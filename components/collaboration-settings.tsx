"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Users, Mail, Plus, X, Check, Clock } from "lucide-react"

interface Collaborator {
  id: string
  email: string
  role: string
  status: "Active" | "Pending" | "Declined"
}

interface CollaborationSettingsProps {
  visibility: string
  collaborators: Collaborator[]
  onUpdate: (updates: { visibility?: string; collaborators?: Collaborator[] }) => void
}

const visibilityOptions = [
  {
    value: "Private",
    label: "Private",
    description: "Only you can see and edit this project",
  },
  {
    value: "Public",
    label: "Public",
    description: "Anyone can view this project, but only you can edit",
  },
  {
    value: "Collaborative",
    label: "Collaborative",
    description: "Invited collaborators can view and contribute to this project",
  },
]

export function CollaborationSettings({ visibility, collaborators, onUpdate }: CollaborationSettingsProps) {
  const [inviteEmail, setInviteEmail] = useState("")

  const handleInviteCollaborator = () => {
    if (!inviteEmail.trim()) return

    const newCollaborator: Collaborator = {
      id: Date.now().toString(),
      email: inviteEmail.trim(),
      role: "Collaborator",
      status: "Pending",
    }

    onUpdate({ collaborators: [...collaborators, newCollaborator] })
    setInviteEmail("")
  }

  const handleRemoveCollaborator = (collaboratorId: string) => {
    onUpdate({ collaborators: collaborators.filter((c) => c.id !== collaboratorId) })
  }

  const getStatusIcon = (status: Collaborator["status"]) => {
    switch (status) {
      case "Active":
        return <Check className="h-3 w-3 text-green-600" />
      case "Pending":
        return <Clock className="h-3 w-3 text-yellow-600" />
      case "Declined":
        return <X className="h-3 w-3 text-red-600" />
    }
  }

  const getStatusColor = (status: Collaborator["status"]) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-200"
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Declined":
        return "bg-red-100 text-red-800 border-red-200"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-green-600" />
          Collaboration Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label>Project Visibility</Label>
          <RadioGroup
            value={visibility}
            onValueChange={(value) => onUpdate({ visibility: value })}
            className="space-y-4"
          >
            {visibilityOptions.map((option) => (
              <div key={option.value} className="flex items-start space-x-3">
                <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor={option.value} className="font-medium cursor-pointer">
                    {option.label}
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>

        {(visibility === "Collaborative" || visibility === "Public") && (
          <div className="space-y-4">
            <div className="space-y-3">
              <Label>Invite Collaborators</Label>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter email address..."
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleInviteCollaborator()}
                  className="flex-1"
                />
                <Button onClick={handleInviteCollaborator} disabled={!inviteEmail.trim()}>
                  <Plus className="h-4 w-4 mr-2" />
                  Invite
                </Button>
              </div>
            </div>

            {collaborators.length > 0 && (
              <div className="space-y-3">
                <Label>Current Collaborators ({collaborators.length})</Label>
                <div className="space-y-2">
                  {collaborators.map((collaborator) => (
                    <div
                      key={collaborator.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                    >
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="font-medium text-gray-900">{collaborator.email}</p>
                          <p className="text-sm text-gray-600">{collaborator.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`${getStatusColor(collaborator.status)} flex items-center gap-1`}>
                          {getStatusIcon(collaborator.status)}
                          {collaborator.status}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveCollaborator(collaborator.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
