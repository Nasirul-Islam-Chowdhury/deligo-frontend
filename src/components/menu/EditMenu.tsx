"use client"

import type React from "react"
import { useForm } from "react-hook-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X, Upload } from "lucide-react"
import { useUpdateMenuMutation } from "@/redux/api/menuApi"
import { useState, useEffect } from "react"
import { toast } from "sonner"

interface EditMenuModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  menu: {
    _id: string
    name: string
    price: number
    description?: string
    images?: string[]
  }
}

interface MenuFormData {
  name: string
  description: string
  price: number
}

export function EditMenuModal({ open, onOpenChange, menu }: EditMenuModalProps) {
  const [updateMenu, { isLoading }] = useUpdateMenuMutation()
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>(menu.images || [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MenuFormData>({
    defaultValues: {
      name: menu.name,
      description: menu.description || "",
      price: menu.price,
    },
  })

  // Reset form when menu changes
  useEffect(() => {
    reset({
      name: menu.name,
      description: menu.description || "",
      price: menu.price,
    })
    setImagePreviews(menu.images || [])
    setImageFiles([])
  }, [menu, reset])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const newFiles = Array.from(files)
      setImageFiles((prev) => [...prev, ...newFiles])

      // Create previews for new files
      newFiles.forEach((file) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          setImagePreviews((prev) => [...prev, reader.result as string])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeImage = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index))
    if (index >= (menu.images?.length || 0)) {
      const fileIndex = index - (menu.images?.length || 0)
      setImageFiles((prev) => prev.filter((_, i) => i !== fileIndex))
    }
  }

  const onSubmit = async (data: MenuFormData) => {


    try {
      const formData = new FormData()
      formData.append("name", data.name)
      formData.append("price", data.price.toString())

      if (data.description) {
        formData.append("description", data.description)
      }


      await updateMenu({ id: menu._id, data: formData }).unwrap()

      toast("Menu item updated successfully")

      onOpenChange(false)
    } catch (error) {
      console.error("Failed to update menu:", error)
      toast("Failed to update menu item. Please try again.")
    }
  }

  const handleDialogInteractOutside = (event: Event) => {
    event.preventDefault()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" onInteractOutside={handleDialogInteractOutside}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">Edit Menu Item</DialogTitle>
          <DialogDescription className="text-gray-600">Update the details of your menu item.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
          {/* Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="images" className="text-sm font-semibold text-gray-700">
              Menu Item Images
            </Label>

            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mb-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative w-full h-32 rounded-lg overflow-hidden border-2 border-gray-200">
                    <img
                      src={preview || "/placeholder.svg"}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload Button */}
            <label
              htmlFor="images"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex flex-col items-center justify-center">
                <Upload className="w-8 h-8 mb-2 text-gray-400" />
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Click to add more images</span>
                </p>
                <p className="text-xs text-gray-500">PNG, JPG or WEBP</p>
              </div>
              <input
                id="images"
                type="file"
                className="hidden"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
              />
            </label>
          </div>

          {/* Menu Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
              Menu Item Name *
            </Label>
            <Input
              id="name"
              {...register("name", {
                required: "Menu name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
              placeholder="e.g., Margherita Pizza"
              className="w-full"
            />
            {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-semibold text-gray-700">
              Description
            </Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Describe your menu item..."
              className="w-full min-h-[100px]"
            />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price" className="text-sm font-semibold text-gray-700">
              Price ($) *
            </Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              {...register("price", {
                required: "Price is required",
                min: {
                  value: 0.01,
                  message: "Price must be greater than 0",
                },
                valueAsNumber: true,
              })}
              placeholder="e.g., 12.99"
              className="w-full"
            />
            {errors.price && <p className="text-sm text-red-600">{errors.price.message}</p>}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset()
                setImageFiles([])
                setImagePreviews(menu.images || [])
                onOpenChange(false)
              }}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Updating...
                </>
              ) : (
                "Update Menu Item"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
