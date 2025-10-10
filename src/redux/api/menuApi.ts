import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

export const menuAPi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllMenus: build.query({
      query: () => {
        return {
          url: "/menu",
          method: "GET",
        };
      },
      providesTags: [tagTypes.menu],
    }),

    createMenu: build.mutation({
      query: (data) => {
        return {
          url: "/menu/",
          method: "POST",
          data,
          contentType: "multipart/form-data",
        };
      },
      invalidatesTags: [tagTypes.menu],
    }),

    updateMenu: build.mutation({
      query: ({ id, data }) => {
        return {
          url: `/menu/${id}`,
          method: "PATCH",
          body: data,
          contentType: "multipart/form-data",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
      },
      invalidatesTags: [tagTypes.menu],
    }),
  }),
});

export const {
  useGetAllMenusQuery,
  useUpdateMenuMutation,
  useCreateMenuMutation,
} = menuAPi;
