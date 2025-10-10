"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/Button"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useAppDispatch } from "@/lib/hook"
import { updateQuantity, removeFromCart } from "@/redux/slices/cartSlice"
import type { CartItem as CartItemType } from "@/redux/slices/cartSlice"

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const dispatch = useAppDispatch()

  const handleIncrease = () => {
    dispatch(updateQuantity({ id: item._id!, quantity: item.quantity + 1 }))
  }

  const handleDecrease = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item._id!, quantity: item.quantity - 1 }))
    }
  }

  const handleRemove = () => {
    dispatch(removeFromCart(item._id!))
  }

  const imageUrl =
    item.images[0] || `/placeholder.svg?height=100&width=100&query=${encodeURIComponent(item.name + " food")}`

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
            <img src={imageUrl || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg mb-1 truncate">{item.name}</h3>
            <p className="text-sm text-muted-foreground mb-2 line-clamp-1">{item.description}</p>
            <p className="text-lg font-bold text-primary">${item.price.toFixed(2)}</p>
          </div>

          <div className="flex flex-col items-end justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRemove}
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-2 border rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDecrease}
                className="h-8 w-8"
                disabled={item.quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              <Button variant="ghost" size="icon" onClick={handleIncrease} className="h-8 w-8">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
