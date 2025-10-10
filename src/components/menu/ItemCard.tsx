"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/Button"
import { Plus } from "lucide-react"
import { useAppDispatch } from "@/lib/hook"


import { IMenu } from "@/redux/api/restaurentApi"
import { addToCart } from "@/redux/slices/cartSlice"
import { toast } from "sonner"


interface MenuItemCardProps {
  item: IMenu
  restaurantId: string
  restaurantName: string
}

export function MenuItemCard({ item, restaurantId, restaurantName }: MenuItemCardProps) {
  const dispatch = useAppDispatch()


  const imageUrl =
    item.images[0] || `/placeholder.svg?height=200&width=200&query=${encodeURIComponent(item.name + " food")}`

  const handleAddToCart = () => {
    dispatch(addToCart({ item, restaurantId, restaurantName }))
    toast(`${item.name} has been added to your cart.`)
  }

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="flex gap-4 p-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1 text-balance">{item.name}</h3>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2 text-pretty">{item.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-primary">${item.price.toFixed(2)}</span>
              <Button onClick={handleAddToCart} size="sm" className="gap-1">
                <Plus className="h-4 w-4" />
                Add
              </Button>
            </div>
          </div>
          <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
            <img src={imageUrl || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
