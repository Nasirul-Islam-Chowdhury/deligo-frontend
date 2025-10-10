"use client";

import {Button} from "@/components/ui/Button";
import { IMenu, IRestaurent } from "@/redux/api/restaurentApi";
import { useState } from "react";

type Props = {
  open: boolean;
  title: string;
  initial: Partial<IRestaurent> & { menu?: IMenu[] };
  onClose: () => void;
  onSubmit: (payload: { restaurant: Partial<IRestaurent>; menu: IMenu[]; restaurantImageFile?: File; menuImageFiles?: (File | undefined)[] }) => void;
  submitText?: string;
};

export function RestaurantModal({ open, title, initial, onClose, onSubmit, submitText = "Save" }: Props) {
  const [restaurant, setRestaurant] = useState<Partial<IRestaurent>>({
    name: initial?.name || "",
    cuisineType: initial?.cuisineType || "",
    deliveryTime: initial?.deliveryTime || "",
    images: initial?.images || [],
  });
  const [menu, setMenu] = useState<IMenu[]>(initial?.menu || []);
  const [restaurantImageFile, setRestaurantImageFile] = useState<File | undefined>(undefined);
  const [menuImageFiles, setMenuImageFiles] = useState<(File | undefined)[]>([]);

  if (!open) return null;

  const updateField = (field: keyof IRestaurent, value: string) => {
    setRestaurant((prev) => ({ ...prev, [field]: value }));
  };

  const updateMenuItem = (index: number, field: keyof IMenu, value: string | number) => {
    setMenu((prev) => {
      const next = [...prev];
      // @ts-ignore
      next[index] = { ...next[index], [field]: value } as IMenuItem;
      return next;
    });
  };

  const addMenuItem = () => setMenu((prev) => [...prev, { name: "", price: 0, images: [""] }]);
  const removeMenuItem = (index: number) => setMenu((prev) => prev.filter((_, i) => i !== index));

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-black w-full max-w-2xl rounded-lg p-5">
        <h3 className="text-lg font-medium mb-4">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input className="border rounded px-3 py-2 w-full" placeholder="Name" value={restaurant.name as string} onChange={(e) => updateField("name", e.target.value)} />
          <input className="border rounded px-3 py-2 w-full" placeholder="Cuisine" value={restaurant.cuisineType as string} onChange={(e) => updateField("cuisineType", e.target.value)} />
          <input className="border rounded px-3 py-2 w-full" placeholder="Delivery Time" value={restaurant.deliveryTime as string} onChange={(e) => updateField("deliveryTime", e.target.value)} />
          <input className="border rounded px-3 py-2 w-full" placeholder="Image URL" value={restaurant?.images![0] as string} onChange={(e) => updateField("images", e.target.value)} />
          <input className="border rounded px-3 py-2 w-full" type="file" accept="image/*" onChange={(e) => setRestaurantImageFile(e.target.files?.[0])} />
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Menu Items</h4>
            <Button onClick={addMenuItem}>Add Item</Button>
          </div>
          <div className="space-y-3 max-h-80 overflow-auto pr-2">
            {menu.map((item, index) => (
              <div key={item._id || index} className="grid grid-cols-12 gap-2 items-center">
                <input className="border rounded px-2 py-2 col-span-4" placeholder="Item name" value={item.name} onChange={(e) => updateMenuItem(index, "name", e.target.value)} />
                <input className="border rounded px-2 py-2 col-span-3" placeholder="Price" type="number" value={item.price} onChange={(e) => updateMenuItem(index, "price", Number(e.target.value))} />
                <input className="border rounded px-2 py-2 col-span-4" placeholder="Image URL" value={item.images} onChange={(e) => updateMenuItem(index, "images", e.target.value)} />
                <input className="border rounded px-2 py-2 col-span-4" type="file" accept="image/*" onChange={(e) => setMenuImageFiles((prev) => {
                  const next = [...prev];
                  next[index] = e.target.files?.[0];
                  return next;
                })} />
                <Button onClick={() => removeMenuItem(index)}>Remove</Button>
              </div>
            ))}
            {menu.length === 0 ? <div className="text-sm text-gray-500">No menu items. Click "Add Item".</div> : null}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={() => onSubmit({ restaurant, menu, restaurantImageFile, menuImageFiles })}>{submitText}</Button>
        </div>
      </div>
    </div>
  );
}
