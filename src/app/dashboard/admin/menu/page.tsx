"use client"

import { useState } from "react"
import { useGetAllMenusQuery } from "@/redux/api/menuApi"
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Edit, Loader2 } from "lucide-react"
import { CreateMenuModal } from "@/components/menu/CreateMenu"
import { EditMenuModal } from "@/components/menu/EditMenu"


interface Menu {
  _id: string
  name: string
  price: number
  images?: string[]
  description?: string
}

export default function MenuPage() {
  const { data: menus, isLoading, error } = useGetAllMenusQuery({})
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null)

  const handleEditClick = (menu: Menu) => {
    setSelectedMenu(menu)
    setIsEditModalOpen(true)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
          <p className="text-gray-600 font-medium">Loading menus...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold text-lg">Failed to load menus</p>
          <p className="text-gray-600 mt-2">Please try again later</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Menu Management</h1>
            <p className="text-gray-600">Manage your restaurant menu items</p>
          </div>
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Menu
          </Button>
        </div>

        {menus && menus.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {menus.map((menu: Menu) => (
              <Card key={menu._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 bg-gray-200">
                  {menu.images && menu.images.length > 0 ? (
                    <img
                      src={menu.images[0] || "/placeholder.svg"}
                      alt={menu.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                      <span className="text-gray-400 text-4xl">🍽️</span>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-1 truncate">{menu.name}</h3>
                  {menu.description && <p className="text-sm text-gray-600 mb-3 line-clamp-2">{menu.description}</p>}
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-indigo-600">${menu.price}</span>
                    {/* <Button onClick={() => handleEditClick(menu)} variant="outline" size="sm" className="gap-2">
                      <Edit className="w-4 h-4" />
                      Edit
                    </Button> */}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
              <span className="text-4xl">🍽️</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No menus available</h3>
            <p className="text-gray-600 mb-6">Get started by creating your first menu item</p>
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Your First Menu
            </Button>
          </div>
        )}
      </div>

      <CreateMenuModal open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} />
      {selectedMenu && <EditMenuModal open={isEditModalOpen} onOpenChange={setIsEditModalOpen} menu={selectedMenu} />}
    </div>
  )
}
