"use client"

import { useState } from "react"

interface Toast {
  title: string
  description?: string
  variant?: "default" | "destructive"
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = ({ title, description, variant = "default" }: Toast) => {
    console.log(`Toast [${variant}]: ${title}${description ? ` - ${description}` : ""}`)

    // Simple implementation - just log for now
    const newToast = { title, description, variant }
    setToasts((prev) => [...prev, newToast])

    // Auto remove after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t !== newToast))
    }, 3000)
  }

  return { toast, toasts }
}
