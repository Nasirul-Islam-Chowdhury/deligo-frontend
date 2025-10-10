"use client";

import { RestaurantCard } from "@/components/restaurants/RestaurentCard";
import { RestaurantCardSkeleton } from "@/components/restaurants/Skeleton";
import { Header } from "@/components/menu/Header2";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { useGetRestaurentsQuery } from "@/redux/api/restaurentApi";

export default function Restaurents() {
  const { data: restaurants, isLoading, error } = useGetRestaurentsQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState<string>("all");

  const filteredRestaurants = restaurants?.filter((restaurant) => {
    const matchesSearch = restaurant.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCuisine =
      selectedCuisine === "all" || restaurant.cuisineType === selectedCuisine;
    return matchesSearch && matchesCuisine;
  });

  const cuisineTypes = [
    "all",
    ...Array.from(new Set(restaurants?.map((r) => r.cuisineType) || [])),
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            Discover Delicious Food Near You
          </h1>
          <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
            Order from your favorite restaurants and get it delivered fresh to
            your doorstep
          </p>
        </div>

        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search restaurants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {cuisineTypes.map((cuisine) => (
              <Button
                key={cuisine}
                variant={selectedCuisine === cuisine ? "default" : "outline"}
                onClick={() => setSelectedCuisine(cuisine)}
                className="capitalize whitespace-nowrap"
              >
                {cuisine}
              </Button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <RestaurantCardSkeleton key={i} />
            ))}
          </div>
        ) : null}

        {typeof error === "string" && (
          <div className="text-center py-12">
            <p className="text-destructive text-lg">
              Failed to load restaurants. Please try again later.
            </p>
          </div>
        )}

        {!isLoading && filteredRestaurants && filteredRestaurants.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No restaurants found matching your criteria.
            </p>
          </div>
        )}
      
        {!isLoading && filteredRestaurants && filteredRestaurants.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant._id} restaurant={restaurant!} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}