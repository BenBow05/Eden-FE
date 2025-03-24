"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Loader2, ChefHat, Clock, Utensils, AlertCircle } from "lucide-react"
import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize the Gemini API with the provided key
const genAI = new GoogleGenerativeAI("AIzaSyDqa80UWZClAHQ8Y-6i5ljad_kxrtno1DM")
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" })

interface AIRecipeGeneratorProps {
  plantName: string
  growthStage: string
  recipeIdea: string
}

interface RecipeDetails {
  title: string
  description: string
  ingredients: string[]
  instructions: string[]
  prepTime: string
  cookTime: string
  difficulty: string
  tips: string[]
}

export default function AIRecipeGenerator({ plantName, growthStage, recipeIdea }: AIRecipeGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [recipe, setRecipe] = useState<RecipeDetails | null>(null)
  const [error, setError] = useState<string | null>(null)

  const generateRecipe = async () => {
    setIsGenerating(true)
    setError(null)

    try {
      const prompt = `
        Create a detailed recipe for ${recipeIdea} using ${plantName} at the ${growthStage} stage.
        
        Format the response as a JSON object with the following structure:
        {
          "title": "Recipe title",
          "description": "Brief description of the dish",
          "ingredients": ["ingredient 1", "ingredient 2", ...],
          "instructions": ["step 1", "step 2", ...],
          "prepTime": "preparation time",
          "cookTime": "cooking time",
          "difficulty": "Easy/Medium/Hard",
          "tips": ["tip 1", "tip 2", ...]
        }
        
        Make sure the recipe is appropriate for the growth stage of the plant, and include any special preparation techniques needed.
        Only return the JSON object, nothing else.
      `

      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      })

      const responseText = result.response.text()

      // Extract JSON from the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error("Failed to parse recipe data from AI response")
      }

      const recipeData = JSON.parse(jsonMatch[0]) as RecipeDetails
      setRecipe(recipeData)
    } catch (err) {
      console.error("Error generating recipe:", err)
      setError("Failed to generate recipe. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div>
      {!recipe && !isGenerating && !error && (
        <Card className="border-green-100 dark:border-green-800">
          <CardHeader>
            <CardTitle className="text-green-800 dark:text-green-300">{recipeIdea}</CardTitle>
            <CardDescription className="text-green-600 dark:text-green-400">
              Generate a detailed recipe using {plantName} at its {growthStage.toLowerCase()} stage
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={generateRecipe} className="w-full bg-green-600 hover:bg-green-700 text-white">
              <ChefHat className="mr-2 h-5 w-5" />
              Generate Recipe
            </Button>
          </CardFooter>
        </Card>
      )}

      {isGenerating && (
        <Card className="border-green-100 dark:border-green-800">
          <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[200px]">
            <Loader2 className="h-10 w-10 text-green-600 dark:text-green-400 animate-spin mb-4" />
            <p className="text-green-800 dark:text-green-300 text-center">Crafting your {recipeIdea} recipe...</p>
            <p className="text-green-600 dark:text-green-400 text-sm text-center mt-2">
              Our AI chef is working on a delicious recipe just for you
            </p>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card className="border-red-200 dark:border-red-800">
          <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[200px]">
            <AlertCircle className="h-10 w-10 text-red-600 dark:text-red-400 mb-4" />
            <p className="text-red-800 dark:text-red-300 text-center">{error}</p>
            <Button
              onClick={generateRecipe}
              variant="outline"
              className="mt-4 border-red-600 text-red-700 hover:bg-red-50 dark:text-red-400 dark:border-red-500 dark:hover:bg-red-900/20"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}

      {recipe && (
        <Card className="border-green-100 dark:border-green-800">
          <CardHeader>
            <CardTitle className="text-green-800 dark:text-green-300">{recipe.title}</CardTitle>
            <CardDescription className="text-green-600 dark:text-green-400">{recipe.description}</CardDescription>
            <div className="flex flex-wrap gap-4 mt-2">
              <div className="flex items-center text-green-600 dark:text-green-400 text-sm">
                <Clock className="h-4 w-4 mr-1" />
                Prep: {recipe.prepTime}
              </div>
              <div className="flex items-center text-green-600 dark:text-green-400 text-sm">
                <Utensils className="h-4 w-4 mr-1" />
                Cook: {recipe.cookTime}
              </div>
              <div className="flex items-center text-green-600 dark:text-green-400 text-sm">
                <ChefHat className="h-4 w-4 mr-1" />
                {recipe.difficulty}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">Ingredients</h3>
              <ul className="list-disc list-inside text-green-700 dark:text-green-400 space-y-1">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">Instructions</h3>
              <ol className="list-decimal list-inside text-green-700 dark:text-green-400 space-y-2">
                {recipe.instructions.map((step, index) => (
                  <li key={index} className="pl-1">
                    <span className="ml-1">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {recipe.tips && recipe.tips.length > 0 && (
              <div>
                <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">Chef's Tips</h3>
                <ul className="list-disc list-inside text-green-700 dark:text-green-400 space-y-1">
                  {recipe.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => setRecipe(null)}
              variant="outline"
              className="w-full border-green-600 text-green-700 hover:bg-green-50 dark:text-green-400 dark:border-green-500 dark:hover:bg-green-900"
            >
              Generate Another Recipe
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

