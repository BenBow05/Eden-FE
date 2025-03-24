"use client"

import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize the Gemini API with the provided key
const genAI = new GoogleGenerativeAI("AIzaSyDqa80UWZClAHQ8Y-6i5ljad_kxrtno1DM")
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" })

export interface PlantInfo {
  name: string
  scientificName: string
  growthStage: string
  isEdible: boolean
  timeToHarvest?: string
  careInstructions: string[]
}

export interface RecipeInfo {
  title: string
  description: string
  ingredients: string[]
  instructions: string[]
  prepTime: string
  cookTime: string
  difficulty: string
  tips: string[]
}

export async function identifyPlant(imageBase64: string): Promise<PlantInfo> {
  try {
    // Remove the data URL prefix to get just the base64 data
    const base64Data = imageBase64.split(",")[1]

    // Prompt for plant identification
    const prompt = `
      Analyze this plant image and provide detailed information in JSON format:
      {
        "name": "Common name of the plant",
        "scientificName": "Scientific name",
        "growthStage": "Current growth stage (Seed, Seedling, Young Growth, Mature, Harvest Ready)",
        "isEdible": true/false,
        "timeToHarvest": "Estimated time until harvest if not ready (or null if ready)",
        "careInstructions": ["Care instruction 1", "Care instruction 2", ...]
      }
      
      Be specific about the growth stage and whether the plant is edible at its current stage.
      If it's not a plant or you can't identify it, indicate that it's not a recognized plant.
    `

    // Create a part with the image data
    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: "image/jpeg",
      },
    }

    // Generate content with the image
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }, imagePart] }],
    })

    const responseText = result.response.text()

    // Extract JSON from the response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error("Failed to parse plant data from AI response")
    }

    const plantData = JSON.parse(jsonMatch[0]) as PlantInfo

    // Default values if the AI doesn't provide them
    return {
      name: plantData.name || "Unknown Plant",
      scientificName: plantData.scientificName || "Unknown Species",
      growthStage: plantData.growthStage || "Unknown",
      isEdible: plantData.isEdible || false,
      timeToHarvest: plantData.timeToHarvest || undefined,
      careInstructions: plantData.careInstructions || ["Water regularly", "Provide adequate sunlight"],
    }
  } catch (error) {
    console.error("Error identifying plant:", error)
    return {
      name: "Unknown Plant",
      scientificName: "Identification Failed",
      growthStage: "Unknown",
      isEdible: false,
      careInstructions: ["Unable to provide care instructions for unidentified plant"],
    }
  }
}

// Helper function to truncate text to a specific character limit
function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength - 3) + "..."
}

export async function generateRecipes(plantInfo: PlantInfo): Promise<RecipeInfo[]> {
  if (!plantInfo.isEdible) {
    return []
  }

  try {
    // Add a timestamp to ensure we get different results each time
    const timestamp = new Date().getTime()

    // Try to use the API with a timeout
    const timeoutPromise = new Promise<RecipeInfo[]>((_, reject) => {
      setTimeout(() => reject(new Error("API request timed out")), 10000)
    })

    const apiPromise = (async () => {
      try {
        const prompt = `
          Generate 1 simple recipe for ${plantInfo.name} at the ${plantInfo.growthStage} stage.
          
          Format the response as a JSON array with the following structure:
          [
            {
              "title": "Recipe title (max 30 chars)",
              "description": "Brief description (max 50 chars)",
              "ingredients": ["ingredient 1", "ingredient 2", ...],
              "instructions": ["step 1", "step 2", ...],
              "prepTime": "preparation time",
              "cookTime": "cooking time",
              "difficulty": "Easy/Medium/Hard",
              "tips": ["tip 1", "tip 2"]
            }
          ]
          
          STRICT REQUIREMENTS:
          1. Each instruction step MUST be under 60 characters
          2. Maximum 5 steps total
          3. Maximum 6 ingredients
          4. Maximum 2 tips, each under 60 characters
          5. Make sure the recipe is appropriate for the growth stage
          6. Only return the JSON array, nothing else
          7. Use extremely concise language
          8. IMPORTANT: Be creative and generate a UNIQUE recipe. Current timestamp: ${timestamp}
          9. If you've generated a recipe for this plant before, create something COMPLETELY DIFFERENT
          10. Vary cooking methods, flavors, and ingredients to ensure diversity
        `

        const result = await model.generateContent({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7, // Increased temperature for more variety
            maxOutputTokens: 500, // Limit total response length
          },
        })

        const responseText = result.response.text()

        // Extract JSON from the response
        const jsonMatch = responseText.match(/\[[\s\S]*\]/)
        if (!jsonMatch) {
          throw new Error("Failed to parse recipe data from AI response")
        }

        let recipeData = JSON.parse(jsonMatch[0]) as RecipeInfo[]

        // Post-process to enforce length limits
        recipeData = recipeData.map((recipe) => ({
          title: truncateText(recipe.title, 30),
          description: truncateText(recipe.description, 50),
          ingredients: recipe.ingredients.slice(0, 6).map((ingredient) => truncateText(ingredient, 40)),
          instructions: recipe.instructions.slice(0, 5).map((instruction) => truncateText(instruction, 60)),
          prepTime: recipe.prepTime,
          cookTime: recipe.cookTime,
          difficulty: recipe.difficulty,
          tips: (recipe.tips || []).slice(0, 2).map((tip) => truncateText(tip, 60)),
        }))

        return recipeData
      } catch (error) {
        console.error("API error:", error)
        throw error
      }
    })()

    // Race between the API call and the timeout
    return await Promise.race([apiPromise, timeoutPromise])
  } catch (error) {
    console.error("Error generating recipes:", error)

    // Check if it's a quota error (429)
    const errorMessage = error.toString().toLowerCase()
    const isQuotaError =
      errorMessage.includes("429") ||
      errorMessage.includes("quota") ||
      errorMessage.includes("exhausted") ||
      errorMessage.includes("rate limit")

    if (isQuotaError) {
      console.log("API quota exhausted, using fallback recipes")
    }

    // Return fallback recipes based on the plant type
    return getFallbackRecipes(plantInfo.name, plantInfo.growthStage)
  }
}

// Add this new function to provide fallback recipes when the API is unavailable
function getFallbackRecipes(plantName: string, growthStage: string): RecipeInfo[] {
  // Generic recipe that can be adapted to most edible plants
  const genericRecipe: RecipeInfo = {
    title: `Simple ${plantName} Dish`,
    description: `A quick and easy way to enjoy fresh ${plantName}`,
    ingredients: [
      `Fresh ${plantName}`,
      "Olive oil",
      "Salt and pepper",
      "Garlic (minced)",
      "Lemon juice",
      "Fresh herbs (optional)",
    ],
    instructions: [
      `Wash and prepare the ${plantName}`,
      "Heat olive oil in a pan over medium heat",
      "Add garlic and cook until fragrant",
      `Add ${plantName} and cook until tender`,
      "Season with salt, pepper, and lemon juice",
    ],
    prepTime: "10 minutes",
    cookTime: "15 minutes",
    difficulty: "Easy",
    tips: [`Choose the freshest ${plantName} for best flavor`, "Adjust seasonings to your taste preference"],
  }

  // Salad recipe variation
  const saladRecipe: RecipeInfo = {
    title: `Fresh ${plantName} Salad`,
    description: `A refreshing salad featuring ${plantName}`,
    ingredients: [
      `Fresh ${plantName}`,
      "Mixed greens",
      "Cherry tomatoes",
      "Cucumber",
      "Vinaigrette dressing",
      "Nuts or seeds (optional)",
    ],
    instructions: [
      `Wash and prepare the ${plantName} and other vegetables`,
      "Chop all ingredients into bite-sized pieces",
      "Combine all vegetables in a large bowl",
      "Drizzle with vinaigrette dressing",
      "Toss gently and serve immediately",
    ],
    prepTime: "15 minutes",
    cookTime: "0 minutes",
    difficulty: "Easy",
    tips: [
      "Add protein like grilled chicken or tofu for a complete meal",
      "Make your own vinaigrette with oil, vinegar, and herbs",
    ],
  }

  // Return different recipes based on growth stage
  if (growthStage.toLowerCase().includes("young") || growthStage.toLowerCase().includes("seedling")) {
    return [
      {
        title: `Young ${plantName} Garnish`,
        description: `Delicate garnish using young ${plantName}`,
        ingredients: [
          `Young ${plantName} leaves or shoots`,
          "Microgreens (optional)",
          "Edible flowers (optional)",
          "Olive oil",
          "Lemon zest",
          "Sea salt",
        ],
        instructions: [
          `Gently wash the young ${plantName}`,
          "Pat dry with paper towels",
          "Arrange on a serving plate",
          "Drizzle with olive oil and sprinkle with sea salt",
          "Add lemon zest and serve as a garnish",
        ],
        prepTime: "5 minutes",
        cookTime: "0 minutes",
        difficulty: "Easy",
        tips: [`Young ${plantName} has a more delicate flavor`, "Use as a garnish for soups, salads, or main dishes"],
      },
    ]
  } else if (growthStage.toLowerCase().includes("mature") || growthStage.toLowerCase().includes("harvest")) {
    // Return both recipes for mature plants
    return [genericRecipe, saladRecipe]
  } else {
    // Default case
    return [genericRecipe]
  }
}

