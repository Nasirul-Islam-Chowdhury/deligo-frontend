"use client";

import { IRestaurent, useGetRestaurentsQuery } from '@/redux/api/restaurentApi';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreateRestaurantModal } from '@/components/restaurants/CreateRestaurents';

export default function AdminDashboardPage() {
  return <AdminRestaurants />;
}

function AdminRestaurants() {
  const { data, isLoading, isError } = useGetRestaurentsQuery();

  const [createOpen, setCreateOpen] = useState(false); 
  const router = useRouter();

  if (isLoading) return <div className="p-8 text-center text-lg font-medium text-gray-700">Loading restaurants... 🍽️</div>;
  if (isError) return <div className="p-8 text-center text-lg font-medium text-red-600">Failed to load restaurants 😥</div>;

  const isEmpty = !data || data.length === 0;

  return (
    <div className="p-6 md:p-10 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
          Restaurant Management 
        </h1>
        <button 
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-[1.02]" 
          onClick={() => setCreateOpen(true)}
          aria-label="Create new restaurant"
        >
          ➕ Create New Restaurant
        </button>
      </div>

      {/* Restaurant Grid or No Restaurant Message */}
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] mt-10">
          <div className="text-5xl mb-4">🍽️</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">No restaurants found</h2>
          <p className="text-gray-500 mb-4">You haven't added any restaurants yet.</p>
       
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {data.map((r: IRestaurent) => (
            <div
              key={r._id || r.name}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out overflow-hidden flex flex-col"
            >
              {r.images && r.images.length > 0 && r.images[0] ? (
                <img 
                  src={r.images[0].trim()} 
                  alt={r.name} 
                  className="w-full h-48 object-cover transition duration-500 ease-in-out hover:opacity-90" 
                />
              ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500 font-medium">No Image Available</div>
              )}

              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-800 mb-1 leading-snug">
                  {r.name.trim()} 
                </h3>

                <div className="space-y-1 mt-2 text-gray-600 flex-grow">
                  <div className="flex items-center text-sm">
                    <span className="font-semibold text-indigo-500 mr-2">Cuisine:</span> 
                    {r.cuisineType.trim()}
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="font-semibold text-indigo-500 mr-2">Est. Delivery:</span> 
                    {r.deliveryTime.trim()}
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="font-semibold text-indigo-500 mr-2">Menu Items:</span> 
                    {r?.menus?.length || 0}
                  </div>
                </div>

                <button 
                  className="mt-4 w-full bg-indigo-500 text-white font-medium py-2 rounded-lg hover:bg-indigo-600 transition duration-300 ease-in-out shadow-md" 
                  onClick={() => router.push(`/dashboard/admin/restaurents/${r._id}`)}
                >
                  Manage Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <CreateRestaurantModal open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  );
}