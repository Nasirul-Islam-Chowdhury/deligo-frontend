"use client"

import { MenuItemCard } from "@/components/menu/ItemCard"
import { IMenu } from "@/redux/api/restaurentApi"

interface MenuSectionProps {
  menu: IMenu
  restaurantId: string
  restaurantName: string
}

export function MenuSection({ menu, restaurantId, restaurantName }: MenuSectionProps) {


  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-balance">{menu.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
   
          <MenuItemCard key={menu._id} item={menu} restaurantId={restaurantId} restaurantName={restaurantName} />
      
      </div>
    </section>
  )
}
