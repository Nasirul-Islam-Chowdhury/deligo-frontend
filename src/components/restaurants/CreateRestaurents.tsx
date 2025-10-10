"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Upload, Plus, ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useGetAllMenusQuery } from "@/redux/api/menuApi";
import { useCreateRestaurentMutation } from "@/redux/api/restaurentApi";
import { CreateMenuModal } from "./CreateMenu";

interface CreateRestaurantModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateRestaurantModal({
  open,
  onOpenChange,
}: CreateRestaurantModalProps) {
  const { data: menu, refetch } = useGetAllMenusQuery({});
  const [createRestaurent, { isLoading }] = useCreateRestaurentMutation();
  const [formData, setFormData] = useState({
    name: "",
    cuisineType: "",
    deliveryTime: "",
  });
  const [selectedMenus, setSelectedMenus] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isMenuDropdownOpen, setIsMenuDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false)
  const availableMenus = menu ?? [];
  const hasMenus = availableMenus.length > 0;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setImageFiles([file]);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFiles([]);
    setImagePreview(null);
  };

  const toggleMenuSelection = (menuId: string) => {
    setSelectedMenus((prev) =>
      prev.includes(menuId)
        ? prev.filter((id) => id !== menuId)
        : [...prev, menuId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("cuisineType", formData.cuisineType);
    formDataToSend.append("deliveryTime", formData.deliveryTime);
    formDataToSend.append("menus", JSON.stringify(selectedMenus));

    if (imageFiles.length > 0) {
      formDataToSend.append("images", imageFiles[0]);
    }



    const data = await createRestaurent(formDataToSend);
    setIsSubmitting(false);
    onOpenChange(false);

    setFormData({ name: "", cuisineType: "", deliveryTime: "" });
    setSelectedMenus([]);
    setImageFiles([]);
    setImagePreview(null);
  };

  const selectedMenuNames = availableMenus
    .filter((menu: any) => selectedMenus.includes(menu._id))
    .map((menu: any) => menu.name);

  const handleDialogInteractOutside = (event: Event) => {
    event.preventDefault();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className="max-w-2xl max-h-[90vh] overflow-y-auto"
          onInteractOutside={handleDialogInteractOutside}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Create New Restaurant
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Fill in the details below to add a new restaurant to your
              platform.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            {/* Image Upload */}
            <div className="space-y-2">
              <Label
                htmlFor="images"
                className="text-sm font-semibold text-gray-700"
              >
                Restaurant Image
              </Label>
              {imagePreview ? (
                <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-gray-200">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Restaurant preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="images"
                  className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-600">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG or WEBP (MAX. 5MB)
                    </p>
                  </div>
                  <input
                    id="images"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-semibold text-gray-700"
              >
                Restaurant Name *
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Delicious Pizza Palace"
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="cuisineType"
                className="text-sm font-semibold text-gray-700"
              >
                Cuisine Type *
              </Label>
              <Input
                id="cuisineType"
                name="cuisineType"
                value={formData.cuisineType}
                onChange={handleInputChange}
                placeholder="e.g., Italian, Chinese, Mexican"
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="deliveryTime"
                className="text-sm font-semibold text-gray-700"
              >
                Estimated Delivery Time *
              </Label>
              <Input
                id="deliveryTime"
                name="deliveryTime"
                value={formData.deliveryTime}
                onChange={handleInputChange}
                placeholder="e.g., 30-45 mins"
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700">
                Select Menus {hasMenus && "*"}
              </Label>

              {!hasMenus ? (
                <div className="border-2 border-dashed border-amber-300 bg-amber-50 rounded-lg p-6 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                      <Plus className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        No Menus Available
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        You need to create at least one menu item before adding
                        a restaurant.
                      </p>
                    </div>
                    <Button
                      type="button"
                      className="bg-amber-500 hover:bg-amber-600 text-white"
                      onClick={() => setIsMenuModalOpen(true)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create Menu First
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setIsMenuDropdownOpen(!isMenuDropdownOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-indigo-300 transition-colors bg-white"
                  >
                    <span className="text-sm text-gray-600">
                      {selectedMenus.length === 0
                        ? "Select menu items..."
                        : `${selectedMenus.length} menu item${
                            selectedMenus.length > 1 ? "s" : ""
                          } selected`}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        isMenuDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isMenuDropdownOpen && (
                    <div className="border-2 border-gray-200 rounded-lg bg-white shadow-lg">
                      <ScrollArea className="h-64">
                        <div className="p-2 space-y-1">
                          {availableMenus.map((menu: any) => (
                            <label
                              key={menu._id}
                              className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-50 cursor-pointer transition-colors"
                            >
                              <Checkbox
                                checked={selectedMenus.includes(menu._id)}
                                onCheckedChange={() =>
                                  toggleMenuSelection(menu._id)
                                }
                              />
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-gray-900">
                                    {menu.name}
                                  </span>
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {/* {menu.category} */}
                                  </Badge>
                                </div>
                                <span className="text-sm text-gray-500">
                                  ${menu.price.toFixed(2)}
                                </span>
                              </div>
                            </label>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  )}

                  {selectedMenuNames.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {selectedMenuNames.map((name: string) => (
                        <Badge
                          key={name}
                          variant="default"
                          className="bg-indigo-100 text-indigo-700"
                        >
                          {name}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
                disabled={isSubmitting || !hasMenus}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Creating...
                  </>
                ) : (
                  "Create Restaurant"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <CreateMenuModal
      refetchMenu={refetch}
        open={isMenuModalOpen}
        onOpenChange={setIsMenuModalOpen}
      />
    </>
  );
}
