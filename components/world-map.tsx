"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Map, Upload, Maximize2 } from "lucide-react"

interface WorldMapProps {
  mapImage?: string
}

export function WorldMap({ mapImage }: WorldMapProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Map className="h-5 w-5 text-blue-600" />
            World Map
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Upload Map
            </Button>
            <Button variant="outline" size="sm">
              <Maximize2 className="h-4 w-4 mr-2" />
              Full View
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ aspectRatio: "3/2" }}>
          {mapImage ? (
            <img src={mapImage || "/placeholder.svg"} alt="World Map" className="w-full h-full object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <Map className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-medium">No map uploaded</p>
                <p className="text-sm">Upload an image or create a new map</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
