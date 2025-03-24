"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Filter, Clock, ChefHat, Leaf } from "lucide-react"
import RecipeDetailDialog from "@/components/recipe-detail-dialog"

// Sample recipe data
const recipes = [
  {
    id: 1,
    name: "Garden Fresh Tomato Salsa",
    description: "A vibrant salsa made with fresh tomatoes, perfect for using your garden harvest.",
    prepTime: "15 mins",
    difficulty: "Easy",
    plantStage: "Harvest Ready",
    plantName: "Tomato",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["tomato", "onion", "cilantro"],
  },
  {
    id: 2,
    name: "Basil Pesto Pasta",
    description: "Homemade pesto sauce using fresh basil leaves from your garden.",
    prepTime: "20 mins",
    difficulty: "Medium",
    plantStage: "Mature Growth",
    plantName: "Basil",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["basil", "garlic", "pine nuts"],
  },
  {
    id: 3,
    name: "Zucchini Fritters",
    description: "Crispy fritters made with garden-fresh zucchini and herbs.",
    prepTime: "25 mins",
    difficulty: "Medium",
    plantStage: "Harvest Ready",
    plantName: "Zucchini",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["zucchini", "herbs"],
  },
  {
    id: 4,
    name: "Microgreen Salad",
    description: "A nutritious salad featuring homegrown microgreens and a light vinaigrette.",
    prepTime: "10 mins",
    difficulty: "Easy",
    plantStage: "Seedling",
    plantName: "Microgreens",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["microgreens", "lettuce"],
  },
  {
    id: 5,
    name: "Herb-Infused Olive Oil",
    description: "Flavorful olive oil infused with garden herbs, perfect for dipping or cooking.",
    prepTime: "5 mins + infusion time",
    difficulty: "Easy",
    plantStage: "Young Growth",
    plantName: "Herbs",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["herbs", "rosemary", "thyme"],
  },
  {
    id: 6,
    name: "Stuffed Bell Peppers",
    description: "Garden bell peppers stuffed with a savory mixture of rice, vegetables, and herbs.",
    prepTime: "40 mins",
    difficulty: "Medium",
    plantStage: "Harvest Ready",
    plantName: "Bell Pepper",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["bell pepper", "rice", "herbs"],
  },
]

export default function RecipesPage() {
  const [activeStage, setActiveStage] = useState<string | null>(null)
  const [selectedRecipe, setSelectedRecipe] = useState<any | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredRecipes = activeStage ? recipes.filter((recipe) => recipe.plantStage === activeStage) : recipes

  const handleRecipeClick = (recipe: any) => {
    setSelectedRecipe(recipe)
    setIsDialogOpen(true)
  }

  return (
    <div className="container mx-auto max-w-7xl py-8 px-4">
      <h1 className="text-3xl font-bold text-green-800 dark:text-green-300 mb-2 text-center">
        Garden-to-Table Recipes
      </h1>
      <p className="text-center text-green-600 dark:text-green-400 mb-8 max-w-3xl mx-auto">
        Discover delicious recipes using plants from your garden at every growth stage
      </p>

      {/* Search and Filter */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
            <input
              type="text"
              placeholder="Search recipes, ingredients, or plants..."
              className="w-full pl-10 pr-4 py-2 border border-green-200 dark:border-green-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-green-950 text-green-800 dark:text-green-300"
            />
          </div>
          <Button
            variant="outline"
            className="border-green-600 text-green-700 hover:bg-green-50 dark:text-green-400 dark:border-green-500 dark:hover:bg-green-900"
          >
            <Filter className="mr-2 h-5 w-5" />
            Filters
          </Button>
        </div>
      </div>

      {/* Growth Stage Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Button
          variant={activeStage === null ? "default" : "outline"}
          className={
            activeStage === null
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "border-green-600 text-green-700 hover:bg-green-50 dark:text-green-400 dark:border-green-500 dark:hover:bg-green-900"
          }
          onClick={() => setActiveStage(null)}
        >
          All Stages
        </Button>
        <Button
          variant={activeStage === "Seedling" ? "default" : "outline"}
          className={
            activeStage === "Seedling"
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "border-green-600 text-green-700 hover:bg-green-50 dark:text-green-400 dark:border-green-500 dark:hover:bg-green-900"
          }
          onClick={() => setActiveStage("Seedling")}
        >
          Seedling
        </Button>
        <Button
          variant={activeStage === "Young Growth" ? "default" : "outline"}
          className={
            activeStage === "Young Growth"
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "border-green-600 text-green-700 hover:bg-green-50 dark:text-green-400 dark:border-green-500 dark:hover:bg-green-900"
          }
          onClick={() => setActiveStage("Young Growth")}
        >
          Young Growth
        </Button>
        <Button
          variant={activeStage === "Mature Growth" ? "default" : "outline"}
          className={
            activeStage === "Mature Growth"
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "border-green-600 text-green-700 hover:bg-green-50 dark:text-green-400 dark:border-green-500 dark:hover:bg-green-900"
          }
          onClick={() => setActiveStage("Mature Growth")}
        >
          Mature Growth
        </Button>
        <Button
          variant={activeStage === "Harvest Ready" ? "default" : "outline"}
          className={
            activeStage === "Harvest Ready"
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "border-green-600 text-green-700 hover:bg-green-50 dark:text-green-400 dark:border-green-500 dark:hover:bg-green-900"
          }
          onClick={() => setActiveStage("Harvest Ready")}
        >
          Harvest Ready
        </Button>
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <Card
            key={recipe.id}
            className="overflow-hidden hover:shadow-lg transition-shadow border-green-100 dark:border-green-800"
          >
            <div className="relative">
              <img src={recipe.image || "/placeholder.svg"} alt={recipe.name} className="w-full h-48 object-cover" />
              <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                {recipe.plantStage}
              </div>
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-green-800 dark:text-green-300 mb-2">{recipe.name}</h3>
              <p className="text-green-600 dark:text-green-400 mb-4 line-clamp-2">{recipe.description}</p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-green-600 dark:text-green-400 text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  {recipe.prepTime}
                </div>
                <div className="flex items-center text-green-600 dark:text-green-400 text-sm">
                  <ChefHat className="h-4 w-4 mr-1" />
                  {recipe.difficulty}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {recipe.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-300 px-2 py-1 rounded-full text-xs"
                  >
                    <Leaf className="h-3 w-3 inline mr-1" />
                    {tag}
                  </span>
                ))}
              </div>

              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={() => handleRecipeClick(recipe)}
              >
                View Recipe
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recipe Detail Dialog */}
      {selectedRecipe && (
        <RecipeDetailDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          recipe={{
            name: selectedRecipe.name,
            description: selectedRecipe.description,
            plantName: selectedRecipe.plantName,
            growthStage: selectedRecipe.plantStage,
          }}
        />
      )}
    </div>
  )
}

