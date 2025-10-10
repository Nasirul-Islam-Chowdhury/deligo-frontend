"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useGetMyOrdersQuery, useCancelOrderMutation } from "@/redux/api/orderApi";
import { Loader2, Package, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function CustomerOrdersDashboardPage() {
  const { data: ordersData, isLoading, error } = useGetMyOrdersQuery();
  const [cancelOrder, { isLoading: isCancelling }] = useCancelOrderMutation();
  const [orderToCancel, setOrderToCancel] = useState<string | null>(null);




  const handleCancelOrder = async () => {
    if (!orderToCancel) return;

    try {
      await cancelOrder(orderToCancel).unwrap();
      toast.success("Order cancelled successfully");
      setOrderToCancel(null);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to cancel order");
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />;
      case "preparing":
        return <Package className="h-4 w-4" />;
      case "delivered":
        return <CheckCircle className="h-4 w-4" />;
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20";
      case "confirmed":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20";
      case "preparing":
        return "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20";
      case "delivered":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
      case "cancelled":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
    }
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <p className="text-lg font-medium">Failed to load orders</p>
        <p className="text-sm text-muted-foreground">Please try again later</p>
      </div>
    );
  }

  const orders = ordersData || [];

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Package className="h-16 w-16 text-muted-foreground" />
        <h3 className="text-xl font-semibold">No orders yet</h3>
        <p className="text-sm text-muted-foreground">
          When you place an order, it will appear here
        </p>
        <Button onClick={() => (window.location.href = "/")}>
          Start Ordering
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 my-7 px-10">
      <div>
        <h1 className="text-3xl font-bold">My Orders</h1>
        <p className="text-muted-foreground mt-2">
          Track and manage your orders
        </p>
      </div>

      <div className="grid gap-6">
        {orders.map((order: any) => {
          const restaurant = typeof order.restaurantId === "object" 
            ? order.restaurantId 
            : { name: "Restaurant", _id: order.restaurantId };

          const canCancel = order.status === "pending" || order.status === "confirmed";

          return (
            <Card key={order._id} className="overflow-hidden">
              <CardHeader className="bg-muted/50">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl">
                      Order #{order.orderId}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {restaurant.name}
                    </p>
                  </div>
                  <Badge
                    variant="secondary"
                    className={getStatusColor(order.status)}
                  >
                    <span className="flex items-center gap-1">
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-6 space-y-4">
                {/* Order Items */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Order Items</h4>
                  {order.items.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.quantity}x {item.name}
                      </span>
                      <span className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Order Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Order Date</p>
                    <p className="font-medium">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Estimated Delivery</p>
                    <p className="font-medium">
                      {formatDate(order.estimatedDelivery)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Customer Name</p>
                    <p className="font-medium">{order.customerName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total Amount</p>
                    <p className="font-medium text-lg text-primary">
                      ${order.totalAmount.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                {canCancel && (
                  <>
                    <Separator />
                    <div className="flex justify-end">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setOrderToCancel(order._id)}
                        disabled={isCancelling}
                      >
                        {isCancelling ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Cancelling...
                          </>
                        ) : (
                          "Cancel Order"
                        )}
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Cancel Confirmation Dialog */}
      <AlertDialog
        open={!!orderToCancel}
        onOpenChange={() => setOrderToCancel(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Order?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this order? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, keep order</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelOrder}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Yes, cancel order
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}