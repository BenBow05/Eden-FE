import type { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="border-green-100 dark:border-green-800 hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center text-green-600 dark:text-green-300 mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-green-800 dark:text-green-300 mb-2">{title}</h3>
        <p className="text-green-600 dark:text-green-400">{description}</p>
      </CardContent>
    </Card>
  )
}

