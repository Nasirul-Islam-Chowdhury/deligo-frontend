"use client";

import { useForm } from "react-hook-form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
import { useBookRideMutation } from "@/redux/api/rideApi";
import { getUserInfo } from "@/services/auth.services";
import { Header } from "@/components/menu/Header2";
import HomeHeader from "@/components/home/header";

interface RideFormValues {
  customerId?: string;
  pickup: string;
  destination: string;
  vehicleType: "Car" | "Bike" | "Auto";
}

export default function BookRide() {
  const { register, handleSubmit, reset, setValue } = useForm<RideFormValues>();
  const [bookRide, { isLoading }] = useBookRideMutation();
  const [confirmation, setConfirmation] = useState<any>(null);
  const user = getUserInfo();

  const onSubmit = async (data: RideFormValues) => {
    const payload = { ...data, customerId: user?.userId };

    try {
      const res = await bookRide(payload).unwrap();
      console.log("Mutation response:", res);
      setConfirmation(res);
      reset();
    } catch (error) {
      console.error("Booking failed:", error);
    }
  };

  if (confirmation) {
    return (
      <div className="flex justify-center mt-10">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle>Ride Confirmed 🚖</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              <strong>Driver:</strong> {confirmation.driverName}
            </p>
            <p>
              <strong>Estimated Fare:</strong> ${confirmation.fare}
            </p>
            <p>
              <strong>Arrival:</strong> {confirmation.estimatedArrival}
            </p>
            <Button
              className="w-full mt-4"
              onClick={() => setConfirmation(null)}
            >
              Book Another Ride
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <HomeHeader />
      <div className="flex justify-center mt-10">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle>Book a Ride 🚘</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Pickup Location</label>
                <Input
                  placeholder="Enter pickup location"
                  {...register("pickup", { required: true })}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Destination</label>
                <Input
                  placeholder="Enter destination"
                  {...register("destination", { required: true })}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Estimated Fare</label>
                <Input
                  placeholder="Fare"
                
                />
              </div>

              <div className="w-full">
                <label className="text-sm font-medium">Vehicle Type</label>
                <Select
                
                  onValueChange={(val) => setValue("vehicleType", val as any)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select vehicle" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    <SelectItem value="Car">Car</SelectItem>
                    <SelectItem value="Bike">Bike</SelectItem>
                    <SelectItem value="Auto">Auto</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Booking..." : "Book Ride"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
