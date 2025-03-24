"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Camera } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface CameraButtonProps {
  onCapture?: (imageDataUrl: string) => void
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  buttonText?: string
}

export function CameraButton({
  onCapture,
  variant = "default",
  size = "default",
  className = "",
  buttonText = "Scan Plant",
}: CameraButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setIsCameraActive(true)
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
      setIsCameraActive(false)
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

        if (onCapture) {
          onCapture(imageDataUrl)
        }

        setIsOpen(false)
      }
    }
  }

  useEffect(() => {
    if (isOpen) {
      startCamera()
    } else {
      stopCamera()
    }

    return () => {
      stopCamera()
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button variant={variant} size={size} className={className} onClick={() => setIsOpen(true)}>
        <Camera className="mr-2 h-5 w-5" />
        {buttonText}
      </Button>
      <DialogContent className="sm:max-w-md p-0">
        <DialogHeader className="p-4 flex-row justify-between items-center">
          <DialogTitle>Take a Photo</DialogTitle>
          {/* Only one close button */}
        </DialogHeader>
        <div className="relative">
          <video ref={videoRef} autoPlay playsInline className="w-full aspect-[4/3] object-cover bg-black" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute inset-x-0 bottom-0 p-4 flex justify-center">
              <Button
                onClick={captureImage}
                className="bg-green-600 hover:bg-green-700 text-white rounded-full h-14 w-14 flex items-center justify-center"
                disabled={!isCameraActive}
              >
                <Camera className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

