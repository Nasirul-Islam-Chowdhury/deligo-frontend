import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const rideApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    bookRide: build.mutation({
      query: (data) => {
        return {
          url: "/rides",
          method: "POST",
          data: data,
        };
      },
      invalidatesTags: [tagTypes.rides],
    }),
    
    getMyBookedRides: build.query({
      query: () => ({
        url: "/rides/my-rides",
        method: "GET",
      }),
      providesTags: [tagTypes.rides],
    }),
  }),
});

export const { useBookRideMutation, useGetMyBookedRidesQuery } = rideApi;