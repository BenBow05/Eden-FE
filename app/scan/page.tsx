"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Camera, Upload, RefreshCw, Loader2, Clock, ChefHat, AlertCircle, Info, X } from "lucide-react"
import {
  identifyPlant,
  generateRecipes,
  type PlantInfo,
  type RecipeInfo,
} from "@/components/plant-identification-service"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Enhanced fallback recipes with more variety
const getFallbackRecipes = (plantName: string, growthStage: string) => {
  // Create a pool of recipes to randomly select from
  const recipePool: RecipeInfo[] = [
    {
      title: `Simple ${plantName} Salad`,
      description: `A refreshing salad featuring fresh ${plantName}.`,
      ingredients: [
        `Fresh ${plantName}`,
        "Mixed greens",
        "Cherry tomatoes",
        "Cucumber",
        "Red onion",
        "Vinaigrette dressing",
      ],
      instructions: [
        `Wash and prepare the ${plantName} and vegetables.`,
        "Chop all ingredients into bite-sized pieces.",
        "Combine in a large bowl.",
        "Drizzle with vinaigrette and toss gently.",
        "Serve immediately as a refreshing side dish.",
      ],
      prepTime: "10 mins",
      cookTime: "0 mins",
      difficulty: "Easy",
      tips: [
        "Add feta cheese or nuts for extra flavor and texture.",
        "Make ahead but add dressing just before serving.",
      ],
    },
    {
      title: `${plantName} Stir-Fry`,
      description: `A quick and flavorful stir-fry with ${plantName}.`,
      ingredients: [
        `${plantName}`,
        "Garlic (minced)",
        "Ginger (grated)",
        "Soy sauce",
        "Mixed vegetables",
        "Sesame oil",
      ],
      instructions: [
        "Heat oil in a wok or large pan over high heat.",
        "Add garlic and ginger, stir for 30 seconds.",
        `Add ${plantName} and vegetables, stir-fry 3-4 minutes.`,
        "Add soy sauce and sesame oil, toss to combine.",
        "Serve hot over rice or noodles.",
      ],
      prepTime: "15 mins",
      cookTime: "10 mins",
      difficulty: "Medium",
      tips: ["Cut all ingredients to similar sizes for even cooking.", "Don't overcrowd the pan for better browning."],
    },
    {
      title: `Roasted ${plantName}`,
      description: `Simple oven-roasted ${plantName} with herbs.`,
      ingredients: [
        `Fresh ${plantName}`,
        "Olive oil",
        "Garlic cloves",
        "Fresh herbs (rosemary, thyme)",
        "Salt and pepper",
        "Lemon juice",
      ],
      instructions: [
        "Preheat oven to 400°F (200°C).",
        `Toss ${plantName} with oil, garlic, and herbs.`,
        "Spread on baking sheet in single layer.",
        "Roast 20-25 minutes until tender and caramelized.",
        "Finish with lemon juice and serve warm.",
      ],
      prepTime: "10 mins",
      cookTime: "25 mins",
      difficulty: "Easy",
      tips: ["Don't crowd the baking sheet for better browning.", "Rotate pan halfway through for even cooking."],
    },
    {
      title: `${plantName} Soup`,
      description: `Comforting soup featuring ${plantName} as the star.`,
      ingredients: [`Fresh ${plantName}`, "Onion (diced)", "Vegetable broth", "Garlic", "Herbs", "Cream (optional)"],
      instructions: [
        "Sauté onion and garlic until soft.",
        `Add ${plantName} and cook for 2-3 minutes.`,
        "Pour in broth and bring to a simmer.",
        "Cook until vegetables are tender, about 15 minutes.",
        "Blend if desired, add cream, and serve hot.",
      ],
      prepTime: "15 mins",
      cookTime: "25 mins",
      difficulty: "Medium",
      tips: ["Use immersion blender for smoother texture.", "Garnish with fresh herbs and a swirl of cream."],
    },
    {
      title: `${plantName} Pesto`,
      description: `Homemade pesto using fresh ${plantName}.`,
      ingredients: [
        `Fresh ${plantName} leaves`,
        "Garlic cloves",
        "Pine nuts or walnuts",
        "Parmesan cheese",
        "Olive oil",
        "Lemon juice",
      ],
      instructions: [
        `Wash and dry ${plantName} leaves thoroughly.`,
        "Toast nuts lightly in a dry pan.",
        "Combine all ingredients except oil in food processor.",
        "Pulse while slowly adding oil until smooth.",
        "Use immediately or refrigerate with oil layer on top.",
      ],
      prepTime: "10 mins",
      cookTime: "5 mins",
      difficulty: "Easy",
      tips: ["Blanch leaves briefly for more vibrant color.", "Freeze in ice cube trays for easy portioning."],
    },
    {
      title: `Grilled ${plantName}`,
      description: `Smoky grilled ${plantName} with simple seasoning.`,
      ingredients: [
        `Fresh ${plantName}`,
        "Olive oil",
        "Garlic powder",
        "Italian seasoning",
        "Salt and pepper",
        "Lemon wedges",
      ],
      instructions: [
        "Preheat grill to medium-high heat.",
        `Toss ${plantName} with oil and seasonings.`,
        "Place on grill, cook 3-4 minutes per side.",
        "Remove when tender with nice grill marks.",
        "Serve with lemon wedges for squeezing.",
      ],
      prepTime: "10 mins",
      cookTime: "10 mins",
      difficulty: "Easy",
      tips: ["Use a grill basket for smaller pieces.", "Don't move too frequently to get good grill marks."],
    },
  ]

  // For young plants, add these specific recipes
  if (growthStage.toLowerCase().includes("young") || growthStage.toLowerCase().includes("seedling")) {
    recipePool.push({
      title: `Young ${plantName} Garnish`,
      description: `Delicate garnish using young ${plantName}.`,
      ingredients: [
        `Young ${plantName} leaves or shoots`,
        "Microgreens (optional)",
        "Edible flowers (optional)",
        "Olive oil",
        "Lemon zest",
        "Sea salt",
      ],
      instructions: [
        `Gently wash the young ${plantName}.`,
        "Pat dry with paper towels.",
        "Arrange on a serving plate.",
        "Drizzle with olive oil and sprinkle with sea salt.",
        "Add lemon zest and serve as a garnish.",
      ],
      prepTime: "5 mins",
      cookTime: "0 mins",
      difficulty: "Easy",
      tips: [`Young ${plantName} has a more delicate flavor.`, "Use as a garnish for soups, salads, or main dishes."],
    })

    recipePool.push({
      title: `${plantName} Microgreen Salad`,
      description: `Light salad highlighting young ${plantName}.`,
      ingredients: [
        `Young ${plantName} shoots`,
        "Assorted microgreens",
        "Thinly sliced radish",
        "Light vinaigrette",
        "Toasted seeds",
        "Edible flowers (optional)",
      ],
      instructions: [
        "Gently wash and dry all greens.",
        "Combine microgreens and young plant shoots.",
        "Add thinly sliced radish for crunch.",
        "Dress lightly with simple vinaigrette.",
        "Garnish with toasted seeds and edible flowers.",
      ],
      prepTime: "10 mins",
      cookTime: "0 mins",
      difficulty: "Easy",
      tips: [
        "Use the most delicate dressing to not overwhelm young plants.",
        "Serve immediately after dressing for best texture.",
      ],
    })
  }

  // Randomly select 2 recipes from the pool to ensure variety
  // Shuffle the array first
  const shuffledRecipes = [...recipePool].sort(() => Math.random() - 0.5)

  // Take the first 2 recipes (or fewer if the pool is smaller)
  return shuffledRecipes.slice(0, Math.min(2, shuffledRecipes.length))
}

export default function ScanPage() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [plantInfo, setPlantInfo] = useState<PlantInfo | null>(null)
  const [recipes, setRecipes] = useState<RecipeInfo[]>([])
  const [activeTab, setActiveTab] = useState("info")
  const [error, setError] = useState<string | null>(null)
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeInfo | null>(null)
  const [recipeIndex, setRecipeIndex] = useState(0) // Track which recipe we're showing

  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if there's a captured image in localStorage
    const storedImage = localStorage.getItem("capturedImage")
    if (storedImage) {
      setCapturedImage(storedImage)
      // Clear the stored image
      localStorage.removeItem("capturedImage")
    } else {
      startCamera()
    }

    // Cleanup on unmount
    return () => {
      stopCamera()
    }
  }, [])

  // When we have a captured image, analyze it
  useEffect(() => {
    if (capturedImage && !isAnalyzing && !plantInfo) {
      analyzeImage(capturedImage)
    }
  }, [capturedImage])

  // Ensure modal is scrolled to top when opened
  useEffect(() => {
    if (selectedRecipe && modalRef.current) {
      const contentDiv = modalRef.current.querySelector(".modal-content")
      if (contentDiv) {
        contentDiv.scrollTop = 0
      }
    }
  }, [selectedRecipe])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      setError("Could not access camera. Please check permissions and try again.")
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
  }

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas")
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      const ctx = canvas.getContext("2d")

      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)
        const imageDataUrl = canvas.toDataURL("image/jpeg")
        setCapturedImage(imageDataUrl)
        stopCamera()
      }
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageDataUrl = event.target?.result as string
        setCapturedImage(imageDataUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeImage = async (imageUrl: string) => {
    setIsAnalyzing(true)
    setError(null)
    setPlantInfo(null)
    setRecipes([])
    setSelectedRecipe(null)
    setRecipeIndex(0)

    try {
      // Identify the plant
      const identifiedPlant = await identifyPlant(imageUrl)
      setPlantInfo(identifiedPlant)

      // Generate recipes if the plant is edible
      if (identifiedPlant.isEdible) {
        const recipeResults = await generateRecipes(identifiedPlant)
        setRecipes(recipeResults)
      }
    } catch (err) {
      console.error("Error analyzing image:", err)
      setError("Failed to analyze the image. Please try again.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const resetScan = () => {
    setCapturedImage(null)
    setPlantInfo(null)
    setRecipes([])
    setError(null)
    setActiveTab("info")
    setSelectedRecipe(null)
    setRecipeIndex(0)
    startCamera()
  }

  const getGrowthStageColor = (stage: string) => {
    switch (stage.toLowerCase()) {
      case "seed":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
      case "seedling":
        return "bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-300"
      case "young growth":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300"
      case "mature":
        return "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300"
      case "harvest ready":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const generateNewRecipe = async (plantInfo: PlantInfo) => {
    if (!plantInfo) return

    // Increment recipe index to get a different recipe
    const nextIndex = (recipeIndex + 1) % 3 // Cycle through 3 variations
    setRecipeIndex(nextIndex)

    setRecipes([])
    setSelectedRecipe(null)

    // Show loading state
    const loadingElement = document.getElementById("recipe-loading")
    if (loadingElement) {
      loadingElement.style.display = "flex"
    }

    try {
      // Try to get recipes from API first
      try {
        const newRecipes = await generateRecipes(plantInfo)
        setRecipes(newRecipes)
        setError(null) // Clear any previous errors
      } catch (apiErr) {
        console.error("API error, using fallbacks:", apiErr)

        // If API fails, use fallbacks with the current index for variety
        const fallbackRecipes = getFallbackRecipes(plantInfo.name, plantInfo.growthStage)

        // Modify the recipes slightly based on the index to create variation
        const variedRecipes = fallbackRecipes.map((recipe) => {
          // Create a copy to modify
          const newRecipe = { ...recipe }

          // Add some variation based on index
          if (nextIndex === 1) {
            newRecipe.title = `Zesty ${recipe.title}`
            newRecipe.description = `A tangy twist on ${recipe.description.toLowerCase()}`
            // Add lemon/lime to ingredients if not already there
            if (
              !recipe.ingredients.some((i) => i.toLowerCase().includes("lemon") || i.toLowerCase().includes("lime"))
            ) {
              newRecipe.ingredients = [
                ...recipe.ingredients.slice(0, -1),
                "Lemon or lime juice",
                recipe.ingredients[recipe.ingredients.length - 1],
              ]
            }
            // Modify a cooking step
            if (recipe.instructions.length > 2) {
              const newInstructions = [...recipe.instructions]
              newInstructions[1] = newInstructions[1] + " Add citrus zest for extra flavor."
              newRecipe.instructions = newInstructions
            }
          } else if (nextIndex === 2) {
            newRecipe.title = `Spicy ${recipe.title}`
            newRecipe.description = `A hot and flavorful version of ${recipe.description.toLowerCase()}`
            // Add spice to ingredients if not already there
            if (
              !recipe.ingredients.some((i) => i.toLowerCase().includes("chili") || i.toLowerCase().includes("pepper"))
            ) {
              newRecipe.ingredients = [
                ...recipe.ingredients.slice(0, -1),
                "Red pepper flakes or chili",
                recipe.ingredients[recipe.ingredients.length - 1],
              ]
            }
            // Modify a cooking step
            if (recipe.instructions.length > 2) {
              const newInstructions = [...recipe.instructions]
              newInstructions[1] = newInstructions[1] + " Add chili flakes for heat."
              newRecipe.instructions = newInstructions
            }
          }

          return newRecipe
        })

        setRecipes(variedRecipes)
        setError("AI service temporarily unavailable. Showing sample recipes instead.")
      }
    } catch (err) {
      console.error("Error generating new recipe:", err)
      setError("Failed to generate a new recipe. Please try again.")

      // Last resort fallback
      const emergencyRecipes = getFallbackRecipes(plantInfo.name, plantInfo.growthStage)
      setRecipes(emergencyRecipes)
    }
  }

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <h1 className="text-3xl font-bold text-green-800 dark:text-green-300 mb-6 text-center">Scan Your Plant</h1>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          {!capturedImage ? (
            <div className="relative">
              <video ref={videoRef} autoPlay playsInline className="w-full aspect-[4/3] object-cover bg-black" />
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                <div className="flex justify-center space-x-4">
                  <Button onClick={captureImage} className="bg-green-600 hover:bg-green-700 text-white">
                    <Camera className="mr-2 h-5 w-5" />
                    Capture
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-white/90 border-green-600 text-green-700 hover:bg-green-50 dark:bg-green-950/90 dark:text-green-400 dark:border-green-500 dark:hover:bg-green-900"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="mr-2 h-5 w-5" />
                    Upload
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="relative">
                <img
                  src={capturedImage || "/placeholder.svg?height=400&width=600"}
                  alt="Captured plant"
                  className="w-full aspect-[4/3] object-cover"
                />
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="flex flex-col items-center">
                      <Loader2 className="h-12 w-12 text-white animate-spin" />
                      <p className="text-white mt-4 text-lg">Analyzing plant...</p>
                    </div>
                  </div>
                )}

                {plantInfo && (
                  <div className="absolute top-2 right-2">
                    <Badge className={getGrowthStageColor(plantInfo.growthStage)}>{plantInfo.growthStage}</Badge>
                  </div>
                )}

                <Button
                  onClick={resetScan}
                  variant="outline"
                  size="icon"
                  className="absolute top-2 left-2 bg-white/80 hover:bg-white border-gray-300 dark:bg-black/80 dark:hover:bg-black/90 dark:border-gray-700"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>

              {error && !plantInfo ? (
                <div className="p-6 flex flex-col items-center">
                  <AlertCircle className="h-12 w-12 text-red-500 mb-2" />
                  <p className="text-red-600 dark:text-red-400 text-center mb-4">{error}</p>
                  <Button onClick={resetScan} className="bg-green-600 hover:bg-green-700 text-white">
                    <RefreshCw className="mr-2 h-5 w-5" />
                    Try Again
                  </Button>
                </div>
              ) : plantInfo ? (
                <div className="p-6">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-1">{plantInfo.name}</h2>
                    <p className="text-green-600 dark:text-green-400 italic mb-4">{plantInfo.scientificName}</p>

                    <Tabs defaultValue="info" value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="info">Plant Info</TabsTrigger>
                        <TabsTrigger value="recipes" disabled={!plantInfo.isEdible}>
                          Recipes {plantInfo.isEdible ? `(${recipes.length})` : ""}
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="info" className="mt-4">
                        {!plantInfo.isEdible && (
                          <Card className="mb-4 border-amber-200 dark:border-amber-800">
                            <CardContent className="pt-6">
                              <div className="flex items-start">
                                <Info className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-amber-700 dark:text-amber-400 font-medium">
                                    Not Edible at Current Stage
                                  </p>
                                  <p className="text-amber-600 dark:text-amber-500 text-sm mt-1">
                                    This plant is not ready for harvest.{" "}
                                    {plantInfo.timeToHarvest
                                      ? `Continue to cultivate for approximately ${plantInfo.timeToHarvest} before harvesting.`
                                      : "Continue to cultivate until it reaches maturity."}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )}

                        <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">Care Instructions:</h3>
                        <ul className="list-disc list-inside text-green-700 dark:text-green-400 space-y-1 mb-4">
                          {plantInfo.careInstructions.map((tip, index) => (
                            <li key={index}>{tip}</li>
                          ))}
                        </ul>

                        {plantInfo.isEdible && (
                          <Button
                            onClick={() => setActiveTab("recipes")}
                            className="w-full bg-green-600 hover:bg-green-700 text-white mt-4"
                          >
                            <ChefHat className="mr-2 h-5 w-5" />
                            View Recipes
                          </Button>
                        )}
                      </TabsContent>

                      <TabsContent value="recipes" className="mt-4">
                        {recipes.length === 0 ? (
                          <div id="recipe-loading" className="flex flex-col items-center py-8">
                            <Loader2 className="h-8 w-8 text-green-500 animate-spin mb-4" />
                            <p className="text-green-700 dark:text-green-400 text-center">
                              Generating recipes for {plantInfo.name}...
                            </p>
                            {error && (
                              <p className="text-amber-600 dark:text-amber-400 text-center mt-2 text-sm">{error}</p>
                            )}
                          </div>
                        ) : (
                          <div className="space-y-6">
                            {error && (
                              <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-md p-3 mb-4">
                                <p className="text-amber-700 dark:text-amber-400 text-sm flex items-center">
                                  <Info className="h-4 w-4 mr-2 flex-shrink-0" />
                                  {error}
                                </p>
                              </div>
                            )}
                            {recipes.map((recipe, index) => (
                              <Card key={index} className="border-green-100 dark:border-green-800">
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-green-800 dark:text-green-300">{recipe.title}</CardTitle>
                                  <CardDescription className="text-green-600 dark:text-green-400">
                                    {recipe.description}
                                  </CardDescription>
                                  <div className="flex flex-wrap gap-4 mt-2">
                                    <div className="flex items-center text-green-600 dark:text-green-400 text-sm">
                                      <Clock className="h-4 w-4 mr-1" />
                                      Prep: {recipe.prepTime}
                                    </div>
                                    <div className="flex items-center text-green-600 dark:text-green-400 text-sm">
                                      <Clock className="h-4 w-4 mr-1" />
                                      Cook: {recipe.cookTime}
                                    </div>
                                    <div className="flex items-center text-green-600 dark:text-green-400 text-sm">
                                      <ChefHat className="h-4 w-4 mr-1" />
                                      {recipe.difficulty}
                                    </div>
                                  </div>
                                </CardHeader>
                                <CardContent className="pt-0 p-6">
                                  <div>
                                    <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">
                                      Ingredients
                                    </h3>
                                    <div className="grid grid-cols-1 gap-y-1">
                                      {recipe.ingredients.slice(0, 3).map((ingredient, idx) => (
                                        <div key={idx} className="flex items-start">
                                          <span className="text-green-500 mr-1.5">•</span>
                                          <span className="text-sm text-green-700 dark:text-green-400">
                                            {ingredient}
                                          </span>
                                        </div>
                                      ))}
                                      {recipe.ingredients.length > 3 && (
                                        <div className="text-sm text-green-600 dark:text-green-400 mt-1">
                                          +{recipe.ingredients.length - 3} more ingredients
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  <div className="flex justify-between mt-4">
                                    <Button
                                      onClick={() => setSelectedRecipe(recipe)}
                                      className="bg-green-600 hover:bg-green-700 text-white"
                                    >
                                      View Full Recipe
                                    </Button>
                                    <Button
                                      onClick={() => generateNewRecipe(plantInfo)}
                                      variant="outline"
                                      className="border-green-600 text-green-700 hover:bg-green-50 dark:text-green-400 dark:border-green-500 dark:hover:bg-green-900"
                                    >
                                      Generate Another
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        )}
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              ) : (
                <div className="p-6 flex justify-center">
                  <Button
                    onClick={resetScan}
                    variant="outline"
                    className="border-green-600 text-green-700 hover:bg-green-50 dark:text-green-400 dark:border-green-500 dark:hover:bg-green-900"
                  >
                    <RefreshCw className="mr-2 h-5 w-5" />
                    Retake Photo
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Full Recipe Modal - Improved for better scrolling */}
      {selectedRecipe && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-hidden"
          ref={modalRef}
        >
          <div className="bg-white dark:bg-green-950 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-green-800 flex justify-between items-center">
              <h3 className="text-xl font-bold text-green-800 dark:text-green-300">{selectedRecipe.title}</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedRecipe(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="overflow-y-auto p-4 flex-grow modal-content">
              <p className="text-green-600 dark:text-green-400 mb-4">{selectedRecipe.description}</p>

              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center text-green-600 dark:text-green-400 text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  Prep: {selectedRecipe.prepTime}
                </div>
                <div className="flex items-center text-green-600 dark:text-green-400 text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  Cook: {selectedRecipe.cookTime}
                </div>
                <div className="flex items-center text-green-600 dark:text-green-400 text-sm">
                  <ChefHat className="h-4 w-4 mr-1" />
                  {selectedRecipe.difficulty}
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Ingredients</h4>
                <div className="grid grid-cols-1 gap-y-1">
                  {selectedRecipe.ingredients.map((ingredient, idx) => (
                    <div key={idx} className="flex items-start">
                      <span className="text-green-500 mr-1.5">•</span>
                      <span className="text-sm text-green-700 dark:text-green-400">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Instructions</h4>
                <div className="space-y-2">
                  {selectedRecipe.instructions.map((step, idx) => (
                    <div key={idx} className="flex items-start">
                      <span className="text-green-500 font-medium mr-2 min-w-[20px]">{idx + 1}.</span>
                      <span className="text-sm text-green-700 dark:text-green-400">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedRecipe.tips && selectedRecipe.tips.length > 0 && (
                <div>
                  <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Chef's Tips</h4>
                  <div className="space-y-1">
                    {selectedRecipe.tips.map((tip, idx) => (
                      <div key={idx} className="flex items-start">
                        <span className="text-green-500 mr-1.5">•</span>
                        <span className="text-sm text-green-700 dark:text-green-400">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-green-800">
              <Button
                onClick={() => {
                  setSelectedRecipe(null)
                  generateNewRecipe(plantInfo!)
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Generate Another Recipe
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

