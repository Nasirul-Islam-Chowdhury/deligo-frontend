"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"
import Link from "next/link"
import { IRestaurent } from "@/redux/api/restaurentApi"



interface RestaurantCardProps {
  restaurant: IRestaurent
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const imageUrl =
    restaurant.images[0] ||
    `/placeholder.svg?height=200&width=400&query=${encodeURIComponent(restaurant.name + " restaurant")}`

  return (
    <Link href={`/restaurents/${restaurant._id}`}>
      <Card className="overflow-hidden p-0 hover:shadow-lg transition-shadow cursor-pointer group">
        <div className="relative h-52 ">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={restaurant.name}
            className="w-full  h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <Badge className="absolute top-3 right-3 bg-background/90 text-foreground border">
            {restaurant.cuisineType}
          </Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 text-balance">{restaurant.name}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{restaurant.deliveryTime}</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <p className="text-sm text-muted-foreground">{restaurant.menus?.length || 0} menus available</p>
        </CardFooter>
      </Card>
    </Link>
  )
}
