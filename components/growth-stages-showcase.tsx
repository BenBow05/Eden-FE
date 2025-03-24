"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const growthStages = [
  {
    id: "seedling",
    name: "Seedling",
    description: "The early stage when the plant has just sprouted from the seed with its first leaves.",
    careTips: ["Keep soil consistently moist", "Provide gentle light", "Maintain warm temperature"],
    recipes: ["Microgreen Salad", "Sprout Sandwich Topping"],
  },
  {
    id: "young",
    name: "Young Growth",
    description: "The plant has established its root system and is developing more leaves and structure.",
    careTips: ["Regular watering", "Introduce fertilizer", "Ensure adequate spacing"],
    recipes: ["Young Herb Pesto", "Fresh Garden Salad"],
  },
  {
    id: "mature",
    name: "Mature Growth",
    description: "The plant is well-established with full foliage and may be beginning to flower or fruit.",
    careTips: ["Consistent watering schedule", "Support stems if needed", "Monitor for pests"],
    recipes: ["Herb-Infused Oils", "Vegetable Stir Fry"],
  },
  {
    id: "harvest",
    name: "Harvest Ready",
    description: "The plant has reached its peak and is ready for harvesting fruits, vegetables, or herbs.",
    careTips: ["Harvest in the morning", "Use sharp tools", "Pick regularly to encourage production"],
    recipes: ["Garden-to-Table Ratatouille", "Fresh Tomato Sauce"],
  },
]

export default function GrowthStagesShowcase() {
  const [activeStage, setActiveStage] = useState(growthStages[0])

  return (
    <div className="bg-white dark:bg-green-900 rounded-xl shadow-xl overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-6 lg:p-8">
          <div className="flex flex-wrap gap-2 mb-6">
            {growthStages.map((stage) => (
              <Button
                key={stage.id}
                variant={activeStage.id === stage.id ? "default" : "outline"}
                className={
                  activeStage.id === stage.id
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "border-green-600 text-green-700 hover:bg-green-50 dark:text-green-400 dark:border-green-500 dark:hover:bg-green-900"
                }
                onClick={() => setActiveStage(stage)}
              >
                {stage.name}
              </Button>
            ))}
          </div>

          <h3 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-4">{activeStage.name} Stage</h3>

          <p className="text-green-700 dark:text-green-400 mb-6">{activeStage.description}</p>

          <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Care Tips:</h4>
          <ul className="list-disc list-inside text-green-700 dark:text-green-400 mb-6 space-y-1">
            {activeStage.careTips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>

          <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Recipe Ideas:</h4>
          <div className="space-y-2">
            {activeStage.recipes.map((recipe, index) => (
              <Card key={index} className="border-green-100 dark:border-green-800">
                <CardContent className="p-3 flex items-center">
                  <div className="w-10 h-10 rounded overflow-hidden mr-3 flex-shrink-0">
                    <img
                      src="/placeholder.svg?height=100&width=100"
                      alt={recipe}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h5 className="font-medium text-green-800 dark:text-green-300">{recipe}</h5>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[3/4] relative overflow-hidden">
            <img
              src="/placeholder.svg?height=600&width=450"
              alt={`Plant in ${activeStage.name} stage`}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-2">
                {activeStage.name}
              </span>
              <h3 className="text-xl font-bold text-white">Tomato Plant</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

