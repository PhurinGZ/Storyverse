"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen } from "lucide-react"

interface BasicSettingsProps {
  title: string
  genre: string
  description: string
  onUpdate: (updates: { title?: string; genre?: string; description?: string }) => void
}

const genres = [
  "Fantasy",
  "Science Fiction",
  "Mystery",
  "Romance",
  "Thriller",
  "Horror",
  "Historical Fiction",
  "Contemporary Fiction",
  "Young Adult",
  "Literary Fiction",
  "Adventure",
  "Comedy",
  "Drama",
  "Other",
]

export function BasicSettings({ title, genre, description, onUpdate }: BasicSettingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-600" />
          Basic Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="project-title">Project Title</Label>
          <Input
            id="project-title"
            value={title}
            onChange={(e) => onUpdate({ title: e.target.value })}
            placeholder="Enter your project title..."
            className="text-lg font-medium"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="genre">Genre</Label>
          <Select value={genre} onValueChange={(value) => onUpdate({ genre: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select a genre..." />
            </SelectTrigger>
            <SelectContent>
              {genres.map((genreOption) => (
                <SelectItem key={genreOption} value={genreOption}>
                  {genreOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Summary/Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => onUpdate({ description: e.target.value })}
            placeholder="Describe your story, its themes, and what makes it unique..."
            className="min-h-[120px] resize-none"
          />
          <p className="text-sm text-gray-500">
            This description will be visible to collaborators and readers if you make your project public.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
