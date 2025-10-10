"use client"

import { Header } from "@/components/menu/Header2"
import { MenuSection } from "@/components/menu/Section"
import { RestaurantHeader } from "@/components/restaurants/RestaurentHeader"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetSingleRestaurentQuery } from "@/redux/api/restaurentApi"
import { useParams } from "next/navigation"

export default function RestaurantPage() {
  const params = useParams()
  const id = params.id as string
  const { data: restaurant, isLoading, error } = useGetSingleRestaurentQuery(id)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-64 w-full mb-8" />
          <Skeleton className="h-12 w-1/2 mb-4" />
          <Skeleton className="h-6 w-1/3 mb-8" />
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i}>
                <Skeleton className="h-8 w-1/4 mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[...Array(4)].map((_, j) => (
                    <Skeleton key={j} className="h-32" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error || !restaurant) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-destructive text-lg">Failed to load restaurant details. Please try again later.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <RestaurantHeader restaurant={restaurant} />

      <main className="container mx-auto px-4 py-8">
        {restaurant.menus && restaurant.menus.length > 0 ? (
          <div className="space-y-12">
            {restaurant.menus.map((menu) => (
              <MenuSection key={menu._id} menu={menu} restaurantId={restaurant._id!} restaurantName={restaurant.name} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No menu items available at the moment.</p>
          </div>
        )}
      </main>
    </div>
  )
}
