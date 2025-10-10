import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

export interface IOrderItem {
  name: string;
  price: number;
  quantity: number;
}

export interface IOrder {
  _id?: string;
  orderId: string;
  userId: string;
  customerName: string;
  restaurantId:
    | string
    | {
        _id: string;
        name: string;
        address?: string;
      };
  items: IOrderItem[];
  totalAmount: number;
  estimatedDelivery: string;
  status: "pending" | "confirmed" | "preparing" | "delivered" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateOrderRequest {
  customerName: string;
  restaurantId: string;
  items: IOrderItem[];
  totalAmount: number;
  estimatedDelivery: string;
}

export interface GetMyOrdersResponse {
  success: boolean;
  message: string;
  data: IOrder[];
}

export interface GetOrderResponse {
  success: boolean;
  message: string;
  data: IOrder;
}

export interface CreateOrderResponse {
  success: boolean;
  message: string;
  data: IOrder;
}

export interface CancelOrderResponse {
  success: boolean;
  message: string;
  data: IOrder;
}

export const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Create a new order
    createOrder: build.mutation<CreateOrderResponse, CreateOrderRequest>({
      query: (orderData) => ({
        url: "/orders",
        method: "POST",
        data: orderData,
      }),
      invalidatesTags: [tagTypes.order],
      transformErrorResponse: (response: any) => {
        return {
          status: response.status,
          data: response.data,
          message: response.data?.message || "Failed to create order",
        };
      },
    }),

    // Get all orders for the logged-in user
    getMyOrders: build.query<IOrder[], void>({
      query: () => ({
        url: "/orders/my-orders",
        method: "GET",
      }),
      providesTags: [tagTypes.order],
    }),

    // Get a specific order by ID
    getOrderById: build.query<GetOrderResponse, string>({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: tagTypes.order, id }],
    }),

    // Cancel an order
    cancelOrder: build.mutation<CancelOrderResponse, string>({
      query: (id) => ({
        url: `/orders/${id}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, id) => [
        tagTypes.order,
        { type: tagTypes.order, id },
      ],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetOrderByIdQuery,
  useCancelOrderMutation,
  useLazyGetMyOrdersQuery,
  useLazyGetOrderByIdQuery,
} = orderApi;
