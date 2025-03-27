import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Camera, Sprout, BookOpen, Heart } from "lucide-react"
import PlantIdentificationDemo from "@/components/plant-identification-demo"
import FeatureCard from "@/components/feature-card"
import GrowthStagesShowcase from "@/components/growth-stages-showcase"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-green-50 to-green-100 dark:from-green-900 dark:to-green-950 py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-0 transform -translate-x-1/2">
            <Sprout className="h-96 w-96 text-green-300 dark:text-green-700 opacity-40" />
          </div>
          <div className="absolute right-0 bottom-0">
            <Heart className="h-64 w-64 text-green-300 dark:text-green-700 opacity-40" />
          </div>
          <div className="absolute left-0 bottom-1/4">
            <Heart className="h-48 w-48 text-green-300 dark:text-green-700 opacity-40" />
          </div>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-bold text-green-800 dark:text-green-300 mb-6">
                Grow, Identify, Cook
              </h1>
              <p className="text-xl md:text-2xl text-green-700 dark:text-green-400 mb-8">
                Your AI garden companion that identifies plants at any growth stage and suggests delicious recipes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                  <Camera className="mr-2 h-5 w-5" />
                  Scan a Plant
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-green-600 text-green-700 hover:bg-green-50 dark:text-green-400 dark:border-green-500 dark:hover:bg-green-900"
                >
                  Try for Free
                </Button>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-green-800">
                <img
                  src="/images/tomato-plant.png"
                  alt="Eden app interface showing tomato plant identification"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-6">
                  <div className="bg-white/90 dark:bg-green-950/90 rounded-xl p-4 w-full">
                    <p className="text-green-800 dark:text-green-300 font-medium">
                      Identified: <span className="font-bold">Tomato Plant (Container Variety)</span>
                    </p>
                    <p className="text-green-600 dark:text-green-400 text-sm">8 recipes available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-green-950">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 dark:text-green-300 mb-4">How Eden Works</h2>
            <p className="text-lg text-green-600 dark:text-green-400 max-w-3xl mx-auto">
              From seedling to harvest, Eden helps you identify plants and discover recipes at every stage of growth
            </p>
          </div>

          <PlantIdentificationDemo />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <FeatureCard
              icon={<Camera className="h-10 w-10" />}
              title="Scan & Identify"
              description="Take a photo of any plant in your garden, and our AI will identify it instantly, even at early growth stages."
            />
            <FeatureCard
              icon={<Sprout className="h-10 w-10" />}
              title="Growth Tracking"
              description="Get detailed information about your plant's current growth stage and care recommendations."
            />
            <FeatureCard
              icon={<BookOpen className="h-10 w-10" />}
              title="Recipe Suggestions"
              description="Discover delicious recipes tailored to your identified plants and their current harvest readiness."
            />
          </div>
        </div>
      </section>

      {/* Growth Stages */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-green-50 dark:bg-green-900">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 dark:text-green-300 mb-4">
              Accurate at Every Growth Stage
            </h2>
            <p className="text-lg text-green-600 dark:text-green-400 max-w-3xl mx-auto">
              Eden's AI can identify plants from seedling to harvest, providing stage-specific care tips and recipes
            </p>
          </div>

          <GrowthStagesShowcase />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-green-600 dark:bg-green-800">
        <div className="container mx-auto max-w-7xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Start Growing with Eden Today</h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Join thousands of gardeners who use Eden to identify plants and discover delicious recipes
          </p>
          <Button size="lg" className="bg-white text-green-700 hover:bg-green-50">
            Download Eden
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 dark:bg-green-950 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <Sprout className="h-8 w-8 mr-2" />
              <span className="text-2xl font-bold">Eden</span>
            </div>
            <div className="flex flex-wrap gap-6 justify-center">
              <Link href="#" className="text-green-200 hover:text-white">
                About
              </Link>
              <Link href="#" className="text-green-200 hover:text-white">
                Features
              </Link>
              <Link href="#" className="text-green-200 hover:text-white">
                Recipes
              </Link>
              <Link href="#" className="text-green-200 hover:text-white">
                Plant Guide
              </Link>
              <Link href="#" className="text-green-200 hover:text-white">
                Contact
              </Link>
            </div>
          </div>
          <div className="border-t border-green-700 mt-8 pt-8 text-center text-green-300">
            <p>© {new Date().getFullYear()} Eden. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

