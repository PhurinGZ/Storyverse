"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Bot, Info } from "lucide-react"

interface AIBehaviorSettingsProps {
  tone: string
  style: string
  onUpdate: (updates: { aiTone?: string; aiStyle?: string }) => void
}

const tones = [
  { value: "Light", label: "Light", description: "Optimistic, uplifting, and cheerful tone" },
  { value: "Dark", label: "Dark", description: "Serious, mysterious, and intense atmosphere" },
  { value: "Comedic", label: "Comedic", description: "Humorous, witty, and entertaining approach" },
  { value: "Epic", label: "Epic", description: "Grand, heroic, and dramatic storytelling" },
]

const styles = [
  {
    value: "Mimic your style",
    label: "Mimic Your Style",
    description: "AI learns from your writing and tries to match your voice and style",
  },
  {
    value: "Help with ideas",
    label: "Help with Ideas",
    description: "AI provides suggestions, plot points, and creative inspiration",
  },
  {
    value: "Write freely",
    label: "Write Freely",
    description: "AI writes in its own style while following your story direction",
  },
]

export function AIBehaviorSettings({ tone, style, onUpdate }: AIBehaviorSettingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-purple-600" />
          AI Behavior Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label>Preferred Tone</Label>
          <Select value={tone} onValueChange={(value) => onUpdate({ aiTone: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select AI tone..." />
            </SelectTrigger>
            <SelectContent>
              {tones.map((toneOption) => (
                <SelectItem key={toneOption.value} value={toneOption.value}>
                  <div className="flex flex-col">
                    <span className="font-medium">{toneOption.label}</span>
                    <span className="text-sm text-gray-500">{toneOption.description}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label>AI Writing Style</Label>
          <RadioGroup value={style} onValueChange={(value) => onUpdate({ aiStyle: value })} className="space-y-4">
            {styles.map((styleOption) => (
              <div key={styleOption.value} className="flex items-start space-x-3">
                <RadioGroupItem value={styleOption.value} id={styleOption.value} className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor={styleOption.value} className="font-medium cursor-pointer">
                    {styleOption.label}
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">{styleOption.description}</p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">AI Behavior Tips</p>
              <p>
                These settings help the AI understand how to assist with your writing. You can change them anytime, and
                the AI will adapt to your preferences as you continue working together.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
