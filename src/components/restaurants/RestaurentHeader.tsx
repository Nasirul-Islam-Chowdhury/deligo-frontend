"use client"

import { Badge } from "@/components/ui/badge"
import { IRestaurent } from "@/redux/api/restaurentApi"
import { Clock, Star } from "lucide-react"

interface RestaurantHeaderProps {
  restaurant: IRestaurent
}

export function RestaurantHeader({ restaurant }: RestaurantHeaderProps) {
  const imageUrl =
    restaurant.images[0] ||
    `/placeholder.svg?height=400&width=1200&query=${encodeURIComponent(restaurant.name + " restaurant interior")}`

  return (
    <div className="relative">
      {/* Hero Image */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src={imageUrl || "/placeholder.svg"} alt={restaurant.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </div>

      {/* Restaurant Info */}
      <div className="container mx-auto px-4">
        <div className="relative -mt-16 bg-card rounded-lg shadow-lg p-6 border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-balance">{restaurant.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <Badge variant="secondary" className="text-sm">
                  {restaurant.cuisineType}
                </Badge>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{restaurant.deliveryTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="text-sm font-medium text-foreground">4.5</span>
                  <span className="text-sm">(200+ ratings)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
