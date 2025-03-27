"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Camera, RefreshCw } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import RecipeDetailDialog from "./recipe-detail-dialog"

export default function PlantIdentificationDemo() {
  const [isScanning, setIsScanning] = useState(false)
  const [isIdentified, setIsIdentified] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState<any | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleScan = () => {
    setIsScanning(true)
    // Simulate AI processing time
    setTimeout(() => {
      setIsScanning(false)
      setIsIdentified(true)
    }, 2000)
  }

  const handleReset = () => {
    setIsIdentified(false)
  }

  const handleRecipeClick = (recipe: any) => {
    setSelectedRecipe(recipe)
    setIsDialogOpen(true)
  }

  return (
    <div className="bg-white dark:bg-green-900 rounded-xl shadow-xl overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative">
          <div className="aspect-[4/3] relative overflow-hidden">
            <img
              src={isIdentified ? "/placeholder.svg?height=400&width=600" : "/placeholder.svg?height=400&width=600"}
              alt="Plant sample"
              className="w-full h-full object-cover"
            />

            {isScanning && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <RefreshCw className="h-12 w-12 text-white animate-spin" />
                  <p className="text-white mt-4 text-lg">Analyzing plant...</p>
                </div>
              </div>
            )}

            {isIdentified && (
              <div className="absolute inset-0">
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Identified
                </div>
                <div className="absolute inset-0 border-4 border-green-500 pointer-events-none"></div>
              </div>
            )}
          </div>

          <div className="p-4 bg-green-50 dark:bg-green-800 flex justify-center">
            {!isIdentified ? (
              <Button onClick={handleScan} disabled={isScanning} className="bg-green-600 hover:bg-green-700 text-white">
                <Camera className="mr-2 h-5 w-5" />
                {isScanning ? "Scanning..." : "Scan Plant"}
              </Button>
            ) : (
              <Button
                onClick={handleReset}
                variant="outline"
                className="border-green-600 text-green-700 hover:bg-green-50 dark:text-green-400 dark:border-green-500 dark:hover:bg-green-900"
              >
                <RefreshCw className="mr-2 h-5 w-5" />
                Scan Another
              </Button>
            )}
          </div>
        </div>

        <div className="p-6">
          {!isIdentified ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <Camera className="h-16 w-16 text-green-200 mb-4" />
              <h3 className="text-xl font-semibold text-green-800 dark:text-green-300 mb-2">Scan Any Plant</h3>
              <p className="text-green-600 dark:text-green-400">
                Take a photo of your plant and our AI will identify it, determine its growth stage, and suggest recipes.
              </p>
            </div>
          ) : (
            <div className="h-full flex flex-col">
              <h3 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-4">
                Tomato Plant (Solanum lycopersicum)
              </h3>
              <div className="mb-4">
                <span className="inline-block bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                  Fruiting Stage
                </span>
              </div>
              <p className="text-green-700 dark:text-green-400 mb-6">
                Your tomato plant is in its fruiting stage. The plant is healthy with several ripe and ripening
                tomatoes. This appears to be a dwarf or container variety suitable for small spaces.
              </p>

              <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Care Tips:</h4>
              <ul className="list-disc list-inside text-green-700 dark:text-green-400 mb-6 space-y-1">
                <li>Water consistently, keeping soil evenly moist</li>
                <li>Ensure at least 6-8 hours of direct sunlight</li>
                <li>Support the plant if stems become heavy with fruit</li>
                <li>Harvest tomatoes when they're fully colored and slightly soft</li>
              </ul>

              <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Recipe Suggestions:</h4>
              <Card
                className="mb-2 cursor-pointer hover:bg-green-50 dark:hover:bg-green-800/50 transition-colors"
                onClick={() =>
                  handleRecipeClick({
                    name: "Fresh Tomato Salsa",
                    description: "Perfect for ripe cherry tomatoes",
                    plantName: "Tomato",
                    growthStage: "Fruiting Stage",
                  })
                }
              >
                <CardContent className="p-3 flex items-center">
                  <div className="w-12 h-12 rounded overflow-hidden mr-3 flex-shrink-0">
                    <img
                      src="/placeholder.svg?height=100&width=100"
                      alt="Fresh Tomato Salsa"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h5 className="font-medium text-green-800 dark:text-green-300">Fresh Tomato Salsa</h5>
                    <p className="text-sm text-green-600 dark:text-green-400">Perfect for ripe cherry tomatoes</p>
                  </div>
                </CardContent>
              </Card>
              <Card
                className="mb-2 cursor-pointer hover:bg-green-50 dark:hover:bg-green-800/50 transition-colors"
                onClick={() =>
                  handleRecipeClick({
                    name: "Cherry Tomato Pasta",
                    description: "Simple and delicious weeknight dinner",
                    plantName: "Tomato",
                    growthStage: "Fruiting Stage",
                  })
                }
              >
                <CardContent className="p-3 flex items-center">
                  <div className="w-12 h-12 rounded overflow-hidden mr-3 flex-shrink-0">
                    <img
                      src="/placeholder.svg?height=100&width=100"
                      alt="Cherry Tomato Pasta"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h5 className="font-medium text-green-800 dark:text-green-300">Cherry Tomato Pasta</h5>
                    <p className="text-sm text-green-600 dark:text-green-400">Simple and delicious</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Recipe Detail Dialog */}
      {selectedRecipe && (
        <RecipeDetailDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} recipe={selectedRecipe} />
      )}
    </div>
  )
}

