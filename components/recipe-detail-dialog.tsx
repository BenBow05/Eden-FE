"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import AIRecipeGenerator from "./ai-recipe-generator"
import { Leaf } from "lucide-react"

interface RecipeDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  recipe: {
    name: string
    description: string
    plantName?: string
    growthStage?: string
  }
}

export default function RecipeDetailDialog({ isOpen, onClose, recipe }: RecipeDetailDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-green-800 dark:text-green-300">{recipe.name}</DialogTitle>
          <DialogDescription className="text-green-600 dark:text-green-400">{recipe.description}</DialogDescription>
          {recipe.plantName && recipe.growthStage && (
            <div className="flex items-center mt-2">
              <Leaf className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600 dark:text-green-400">
                Using {recipe.plantName} at {recipe.growthStage.toLowerCase()} stage
              </span>
            </div>
          )}
        </DialogHeader>

        <div className="py-4">
          <AIRecipeGenerator
            plantName={recipe.plantName || "tomato"}
            growthStage={recipe.growthStage || "Mature"}
            recipeIdea={recipe.name}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

