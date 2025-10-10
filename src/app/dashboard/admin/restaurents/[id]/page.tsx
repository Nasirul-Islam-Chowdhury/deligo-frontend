"use client";

import { useParams } from 'next/navigation';
import { IMenu, IRestaurent, useAddMenuItemMutation, useDeleteMenuItemMutation, useGetSingleRestaurentQuery, useUpdateMenuItemMutation, useUpdateRestaurentMutation } from '@/redux/api/restaurentApi';

import { useState, useEffect } from 'react';
import { Upload, Trash2, Plus, Save, Clock, Tag, UtensilsCrossed, ImageIcon } from 'lucide-react';

export default function AdminEditRestaurentPage() {
  const params = useParams();
  const id = params?.id as string;
  const { data, isLoading, isError } = useGetSingleRestaurentQuery(id, { skip: !id });

  const [updateRestaurant] = useUpdateRestaurentMutation();
  const [addMenuItem] = useAddMenuItemMutation();
  const [updateMenuItem] = useUpdateMenuItemMutation();
  const [deleteMenuItem] = useDeleteMenuItemMutation();

  const [restaurant, setRestaurant] = useState<Partial<IRestaurent>>({});
  const [menu, setMenu] = useState<IMenu[]>([]);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  useEffect(() => {
    if (data) {
      setRestaurant({
        name: data.name,
        cuisineType: data.cuisineType,
        deliveryTime: data.deliveryTime,
        images: data.images,
      });
      setMenu(data.menus || []);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading restaurant...</p>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Failed to Load</h2>
          <p className="text-slate-600">Unable to load restaurant data. Please try again.</p>
        </div>
      </div>
    );
  }

  const saveRestaurant = async () => {
    setSaveStatus('saving');
    try {
      await updateRestaurant({ id, data: restaurant }).unwrap();
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      setSaveStatus('idle');
    }
  };

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        

        {/* Restaurant Details */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <UtensilsCrossed className="w-7 h-7" />
              Restaurant Details
            </h2>
          </div>


          <div className="mt-8 space-y-4 md:col-span-2">
                <label className="text-lg font-bold text-slate-800 flex items-center gap-2 px-8">
                  <ImageIcon className="w-5 h-5 text-emerald-600" />
                  Restaurant Images ({restaurant.images?.length || 0})
                </label>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-8">
                  
                  {restaurant.images?.map((image, index) => (
                    <div key={index} className="relative group aspect-video rounded-xl overflow-hidden shadow-md">
                      <img 
                        src={image} 
                        alt={`Restaurant Image ${index + 1}`} 
                        className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80"
                     
                      />
                      <button
                       
                        className="absolute top-2 right-2 p-2 bg-red-600/80 hover:bg-red-700 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform hover:scale-110 shadow-lg"
                        title="Delete Image"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}     
            </div>
            </div>
          
          <div className="p-8 text-black">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-emerald-600" />
                  Restaurant Name
                </label>
                <input 
                  className="w-full border-2  text-black border-slate-200 rounded-xl px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none" 
                  placeholder="Enter restaurant name" 
                  value={restaurant.name || ''} 
                  onChange={(e) => setRestaurant({ ...restaurant, name: e.target.value })} 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <UtensilsCrossed className="w-4 h-4 text-emerald-600" />
                  Cuisine Type
                </label>
                <input 
                  className="w-fulltext-black border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none" 
                  placeholder="e.g., Italian, Chinese, Indian" 
                  value={restaurant.cuisineType || ''} 
                  onChange={(e) => setRestaurant({ ...restaurant, cuisineType: e.target.value })} 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  Delivery Time
                </label>
                <input 
                  className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none" 
                  placeholder="e.g., 30-40 mins" 
                  value={restaurant.deliveryTime || ''} 
                  onChange={(e) => setRestaurant({ ...restaurant, deliveryTime: e.target.value })} 
                />
              </div>

          
            </div>

            <button 
              className="mt-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5" 
              onClick={saveRestaurant}
            >
              <Save className="w-5 h-5" />
              Save Restaurant Details
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <UtensilsCrossed className="w-7 h-7" />
                Menu Items ({menu.length})
              </h2>
              <button 
                className="bg-white hover:bg-slate-50 text-violet-600 font-semibold px-4 py-2 rounded-xl flex items-center gap-2 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5" 
                onClick={() => setMenu((prev) => [...prev, { name: '', price: 0, images: [] }])}
              >
                <Plus className="w-5 h-5" />
                Add Item
              </button>
            </div>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menu.map((item, index) => (
                <div key={item._id || index} className="bg-slate-50 rounded-xl border-2 border-slate-200 overflow-hidden hover:border-violet-300 transition-all group">
                  {/* Image Preview */}
                  <div className="relative h-48 bg-slate-200 overflow-hidden">
                    {item.images ? (
                      <img 
                        src={item.images[0]} 
                        alt={item.name || 'Menu item'} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-16 h-16 text-slate-400" />
                      </div>
                    )}
                    <button 
                      className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-all shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0" 
                      onClick={() => setMenu((prev) => prev.filter((_, i) => i !== index))}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Item Details */}
                  <div className="p-4 space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Item Name</label>
                      <input 
                        className="w-full border-2 text-black border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all outline-none" 
                        placeholder="Delicious item name" 
                        value={item.name} 
                        onChange={(e) => setMenu((prev) => { 
                          const next = [...prev]; 
                          next[index] = { ...next[index], name: e.target.value }; 
                          return next; 
                        })} 
                      />
                    </div>

                    <div className="space-y-1 text-black">
                      <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Price</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">$</span>
                        <input 
                          className="w-full border-2  border-slate-200 rounded-lg pl-7 pr-3 py-2 text-sm focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all outline-none" 
                          placeholder="0.00" 
                          type="number" 
                          step="0.01"
                          value={item.price} 
                          onChange={(e) => setMenu((prev) => { 
                            const next = [...prev]; 
                            next[index] = { ...next[index], price: Number(e.target.value) }; 
                            return next; 
                          })} 
                        />
                      </div>
                    </div>

                    <button
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold px-3 py-2 rounded-lg flex items-center justify-center gap-2 transition-all text-sm"
                      onClick={() => {
                        const url = prompt('Enter image URL:', item.images[0] || '');
                        if (url !== null) {
                          setMenu((prev) => { 
                            const next = [...prev]; 
                            next[index] = { ...next[index], images: [url] }; 
                            return next; 
                          });
                        }
                      }}
                    >
                      <Upload className="w-4 h-4" />
                      {item.images ? 'Change Image' : 'Add Image'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {menu.length === 0 && (
              <div className="text-center py-16">
                <UtensilsCrossed className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 font-medium">No menu items yet</p>
                <p className="text-slate-400 text-sm">Click "Add Item" to create your first menu item</p>
              </div>
            )}

            {menu.length > 0 && (
              <button 
                className="mt-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mx-auto" 
            
              >
                <Save className="w-5 h-5" />
                Save All Menu Changes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}