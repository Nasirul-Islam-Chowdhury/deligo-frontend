"use client";

import { useGetMyBookedRidesQuery } from "@/redux/api/rideApi";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Car, Bike, Bus, MapPin, Navigation, Calendar, DollarSign } from "lucide-react";

interface IRide {
  _id: string;
  customerId: string;
  customerName?: string;
  pickup: string;
  destination: string;
  vehicleType: "Car" | "Bike" | "Auto";
  driverName: string;
  fare: number;
  estimatedArrival: string;
  createdAt: string;
}

const vehicleIcons = {
  Car: Car,
  Bike: Bike,
  Auto: Bus,
};

const vehicleColors = {
  Car: "bg-blue-100 text-blue-800 border-blue-200",
  Bike: "bg-green-100 text-green-800 border-green-200",
  Auto: "bg-yellow-100 text-yellow-800 border-yellow-200",
};

export default function MyRidesPage() {
  const { data, isLoading, isError, error } = useGetMyBookedRidesQuery(undefined);

  const rides = data || [];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-3xl font-bold mb-8">My Booked Rides</h1>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-48" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-3xl font-bold mb-8">My Booked Rides</h1>
        <Alert variant="destructive">
          <AlertDescription>
            Failed to load your rides. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Booked Rides</h1>
        <p className="text-gray-600">View all your past and upcoming rides</p>
      </div>

      {rides.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Car className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold mb-2">No rides yet</h3>
            <p className="text-gray-600">Book your first ride to get started!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {rides.map((ride: IRide) => {
            const VehicleIcon = vehicleIcons[ride.vehicleType];
            const vehicleColorClass = vehicleColors[ride.vehicleType];

            return (
              <Card key={ride._id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className={vehicleColorClass}>
                          <VehicleIcon className="h-3.5 w-3.5 mr-1" />
                          {ride.vehicleType}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          Driver: <span className="font-medium text-gray-700">{ride.driverName}</span>
                        </span>
                      </div>
                      <CardDescription className="flex items-center gap-2 text-xs">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(ride.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-1 text-2xl font-bold text-gray-900">
                        <DollarSign className="h-5 w-5" />
                        {ride.fare}
                      </div>
                      <p className="text-xs text-gray-500">Fare</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        <MapPin className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 font-medium uppercase">Pickup</p>
                        <p className="text-sm font-medium text-gray-900">{ride.pickup}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        <Navigation className="h-5 w-5 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 font-medium uppercase">Destination</p>
                        <p className="text-sm font-medium text-gray-900">{ride.destination}</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Estimated Arrival:</span>
                        <span className="font-semibold text-gray-900">{ride.estimatedArrival}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}