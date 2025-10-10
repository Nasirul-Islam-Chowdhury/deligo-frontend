import { baseApi } from './baseApi';
import { tagTypes } from '../tag-types';


export interface IMenu {
  _id?: string;
  name: string;
  description?: string;
  price: number;
  images: string[];
  restaurants?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IRestaurent {
  _id?: string;
  name: string;
  cuisineType: string;
  images: string[];
  deliveryTime: string;
  menus: IMenu[]; // Array of menu items (dishes)
  createdAt?: Date;
  updatedAt?: Date;
}

export interface OrderItem {
  menuItem: string
  quantity: number
  price: number
}

export interface CreateOrderRequest {
  restaurant: string
  items: OrderItem[]
  totalAmount: number
  deliveryAddress: string
}



export const restaurentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createRestaurent: build.mutation<IRestaurent, FormData>({
      query: (formData) => ({
        url: '/restaurents/create-restaurent',
        method: 'POST',
        data: formData,
        contentType: 'multipart/form-data',
      }),
      invalidatesTags: [tagTypes.admin],
    }),
    
    getRestaurents: build.query<IRestaurent[], void>({
      query: () => ({
        url: '/restaurents',
        method: 'GET',
      }),
      providesTags: [tagTypes.admin],
    }),

    getSingleRestaurent: build.query<IRestaurent, string>({
      query: (id) => ({
        url: `/restaurents/${id}`,
        method: 'GET',
      }),
      providesTags: [tagTypes.admin],
    }),
    
    updateRestaurent: build.mutation<IRestaurent, { id: string; data: Partial<IRestaurent> }>({
      query: ({ id, data }) => ({
        url: `/restaurents/${id}`,
        method: 'PATCH',
        data,
      }),
      invalidatesTags: [tagTypes.admin],
    }),
    addMenuItem: build.mutation<IRestaurent, { id: string; item: IMenu }>({
      query: ({ id, item }) => ({
        url: `/restaurents/${id}/menu`,
        method: 'POST',
        data: item,
      }),
      invalidatesTags: [tagTypes.admin],
    }),
    updateMenuItem: build.mutation<IRestaurent, { id: string; itemId: string; item: Partial<IMenu> }>({
      query: ({ id, itemId, item }) => ({
        url: `/restaurents/${id}/menu/${itemId}`,
        method: 'PATCH',
        data: item,
      }),
      invalidatesTags: [tagTypes.admin],
    }),
    deleteMenuItem: build.mutation<IRestaurent, { id: string; itemId: string }>({
      query: ({ id, itemId }) => ({
        url: `/restaurents/${id}/menu/${itemId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.admin],
    }),


   
  }),
});

export const {  useCreateRestaurentMutation, useGetRestaurentsQuery, useGetSingleRestaurentQuery, useUpdateRestaurentMutation, useAddMenuItemMutation, useUpdateMenuItemMutation, useDeleteMenuItemMutation } = restaurentApi;


